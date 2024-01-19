/* se podría pensar que usando el getCurrentUser de auth.service.ts que retorna un User o undefined donde si es undefined no está autenticado porque no hay usuario, y , técnicamente esto es correcto y se podría determinar si estamos logueados o no, pero no es del todo cierto porque el acceso a ese getter es síncrono y al tratar de consumirlo o consultar su información siendo un proceso síncrono puede ser que el checkAuthentication aún no se haya disparado y para tener esa seguridad entonces solo usaremos el checkAuthentication para saber si hay o no algún usuario */

/* ******************** USANDO NUEVA IMPLEMENTACIÓN FUNCIONAL (CanMatchFn - CanActivateFn) ******************** */
import { inject } from '@angular/core'; // se importa esta libreria para poder inyectar dependencias sin constructor de clase
import {
  CanMatchFn,
  Route,
  Router,
  UrlSegment,
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

/* aquí también se podría colocar para que pueda regresar un Promise<boolean> aunque solo se está trabajando con observables */
const checkAuthStatus = (): Observable<boolean> | boolean => {
  /* se inyectan el AuthService y el Router */
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication().pipe(
    tap((response) => {
      /* tener en cuenta que en este caso response está regresando un valor false al hacer logout porque el método del servicio authService.checkAuthentication devuelve false ya que logout ha limpiado el localStorage y eso hace que no esté nadie autenticado y por eso nos está sacando de la aplicación pero eso trae un error el cual es que NO dejará pasar a la aplicación ni ver su contenido y en este caso ni si quiera se podrá ver el login porque estamos intentando cargar una ruta que está protegida y tampoco la puede activar y eso hace que no exista y por eso nos llevará a la ruta 404 que creamos pero técnicamente no debería llevarnos a la ruta 404 sino a la ruta del login ya que si el usuario no está autenticado nos debería llevar ahí y para eso usaremos el pipe map() para transformar la data porque para que en app-routing.module canActivate, canMatch PERMITA la entrada a las path deben recibir TRUE. (True permite entrar en las rutas, False no lo permite) */
      if (response) {
        /* si se cumple todo entonces aparecerán un true y si no se cumple entonces un false. Probar cuando NO se está autenticado ir a la ruta http://localhost:4200/#/heroes/list porque nos devolverá un false y probar cuando SI se esté autenticado ir a la ruta http://localhost:4200/#/auth/login porque nos devolverá un true */
        console.log({ response });
        router.navigate(['./']); // si está autenticado entonces que me lleve al root del router de los heroes que sería /heroes y este me redirigirá a /heroes/list (también se podría colocar directamente ./heroes/list)
      }
    }),
    map((response) => !response) // aquí se está usando el map() para cambiar el valor de la response anterior y de ser un valor false (el cual nos prohíbe entrar a la aplicación y cualquier ruta) de la respuesta del pipe tap() para devolver un valor true donde ya nos dejaría poder ver algunas rutas que en este caso sería solo las rutas de autenticación porque las rutas de heroes están protegidas
  );
};

export const canMatchPublicGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  /* PRIMERA FUNCIONALIDAD PARA PROBAR EL USO DE LOS GUARDS */
  // console.log('CanMatchFn');
  // console.log({ route, segments });
  /* SI dejará pasar a la aplicación y ver su contenido */
  // return true;
  /* NO dejará pasar a la aplicación ni ver su contenido porque estamos intentando cargar una ruta que está protegida y tampoco la puede activar y eso hace que no exista y por eso nos llevará a la ruta 404 que creamos pero técnicamente no debería llevarnos a la ruta 404 sino a la ruta del login ya que si el usuario no está autenticado nos debería llevar ahí */
  // return false;

  /* como checkAuthStatus retorna un un observable que emite un boolean o retorna un boolean, entonces no sería adecuado negar su valor, es decir, colocarlo como return !checkAuthStatus(); para que de cierta forma nos retorne directamente un boolean porque aunque no da error ya que es un código válido entre comillas, estamos convirtiendo lo que le pasemos, es decir, el checkAuthStatus() a un valor booleano, por lo que ya no tendríamos un observable como tal y estaríamos perdiendo su funcionalidad. Cuando nosotros al canMatchPublicGuard o canActivatePublicGuard le pasamos el return this.checkAuthStatus(); se ejecutará el checkAuthStatus y en X tiempo (usualmente milisegundos) se resolverá con un true/false. Pero si hacemos !this.checkAuthStatus(); estamos rompiendo ese proceso del observable, no es que estemos haciendo la negación (!) al resultado de this.checkAuthStatus(), sino que al Observable que hay en ese momento lo convertimos, por lo que ya nunca se resolverá y se estaría manipulando el valor del proceso intermedio, que es el observable aun sin resolver mas no el resultado del observable, por eso es que no funcionaría correctamente y para solucionarlo se esté modificando el valor dentro del propio proceso del observable con el map() ya que una vez se han resuelto todos los procesos anteriores y sabemos que ya tenemos un valor real para enviar */
  return checkAuthStatus();
};

export const canActivatePublicGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  // console.log('CanActivateFn');
  // console.log({ route, state });
  // return true;
  // return false;

  return checkAuthStatus();
};

/* ******************************************************************************************************************* */
/* Explicación sobre el uso del map en map((response) => !response) */
/*
Esto es debido a que aquí estamos trabajando en el public guard, es decir, queremos que pueda acceder cuando NO esté autenticado, ya que si está autenticado queremos mandarlo a la aplicación, y que NO pueda acceder al registro/login.

Nuestro checkAuthStatus() del servicio devuelve un valor true si efectivamente el usuario está autenticado, y false si no lo está. Ahora, el guard funciona dejando acceder si recibe un true, y NO deja pasar si recibe un false.

En nuestra lógica del public guard, nosotros queremos que pase cuando NO esté autenticado, es decir, cuando NO exista usuario tenemos que pasarle true al guard, y cuando exista usuario tenemos que pasar false para que no le deje pasar.

Es justo lo contrario que nos devuelve checkAuthStatus(), ya que si existe usuario, devolverá true por lo que dejaría pasar el guard, y cuando NO existe usuario, NO dejaría pasar. Este es justo el comportamiento que queremos en el auth guard, queriendo conseguir justo lo contrario en el public guard.

Para conseguir esto, simplemente vamos a invertir el valor de checkAuthStatus, para que cuando exista usuario devuelva false, y cuando no exista devuelva true. Esto es lo que hacemos con el map((response) => !response), estamos transformando el valor, ya que con !response en concreto esa exclamación ! delante lo que hace es invertir el valor.

Es decir, si response tiene en este momento un valor true, cuando lo pasemos por !response devolverá un valor false, y viceversa. Únicamente estamos invirtiendo el valor para que el PublicGuard funcione justo al reves que el auth guard.
*/
