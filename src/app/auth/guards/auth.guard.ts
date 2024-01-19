/* con los guard, como su nombre lo indica, son como guardias de seguridad, entonces si la persona quiere entrar a una ruta X pero no cumple cierta condición entonces el guard hará que no pueda entrar y adicionalmente puede ser que ni si quiera pueda cargar el módulo en general porque nosotros queremos que eso no pueda hacer si la persona no está autenticada. Estos guard son servicios solo que en vez de inyectarlo de manera tradicional en los constructores lo vamos a colocar en un lugar especial en nuestro router */

/* para hacer un guard entonces debe implementar una interfaz por lo menos, es decir, se tiene que implementar técnicamente una interfaz y esta interfaz va a depender de dónde queramos colocar este guard, por ejemplo, si queremos validar entonces el usuario cada vez que navegue por la aplicación (cada que vez entre a una página o ruta) entonces sería necesario hacer esta validación o si entra a una ruta padre entonces ya no hacerla, entre otros ejemplos */

/* ******************** USANDO NUEVA IMPLEMENTACIÓN FUNCIONAL (CanMatchFn - CanActivateFn) ******************** */
/* antes del CanMatchFn era el CanMatch y antes de este era el canLoad donde los 3 son parecidos pero no son iguales. CanMatchFn hace referencia a que se pueda entrar a una ruta que haga cierto match de la url, es decir, este activará la ruta si en la lógica devuelve true, y sino buscará si puede entrar a la siguiente ruta con el mismo path, entrará al primer path que haga match, y si fuera false, seguiría al siguiente path que haga match, y así. (https://angular.io/api/router/CanMatchFn) */
/* antes del CanActivateFn era el CanActivate los cuales son parecidos pero no son iguales. CanActivateFn para activar esa ruta en particular o la ruta en la cual colocamos este guard, es decir, decide si se acepta o se deniega el acceso a una ruta basándose en la lógica que se le especifique al propio guard, validaría si puede entrar a la ruta que haga match y listo, pueda entrar o no. (https://angular.io/api/router/CanActivateFn) */

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
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

/* en este caso canMatchAuthGuard y canActivateAuthGuard estarán haciendo lo mismo entonces se hará una funcion que usarán tanto canMatchAuthGuard y canActivateAuthGuard con la finalidad de centralizar la lógica en un solo punto porque el código sería idéntico en ambos lugares aunque no siempre será así */
/* aquí también se podría colocar para que pueda regresar un Promise<boolean> aunque solo se está trabajando con observables */
const checkAuthStatus = (): Observable<boolean> | boolean => {
  /* se inyectan el AuthService y el Router */
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  /* authService.checkAuthentication() al retornar solo un observable y ya no un observable o un boolean entonces se pueden usar los pipes de RxJS */
  /* el guard no se subscribe en el observable para que se pueda ejecutar porque internamente todos los guard pueden recibir directamente observables booleanos para su funcionamiento, por lo tanto, no es necesario realizar el subscribe y se está usando solo el pipe() */
  return authService.checkAuthentication().pipe(
    tap((response) => {
      if (!response) {
        /* si se cumple todo entonces aparecerán un true y si no se cumple entonces un false. Probar cuando NO se está autenticado ir a la ruta http://localhost:4200/#/heroes/list porque nos devolverá un false y probar cuando SI se esté autenticado ir a la ruta http://localhost:4200/#/auth/login porque nos devolverá un true */
        console.log({ response });
        router.navigate(['./auth/login']);
      }
    })
  );
};

/* canMatchAuthGuard recibe cual es la ruta que quiere y los segmentos de url que también está solicitando y retornará algo de tipo CanMatchFn que es un type que tiene una función la cual retorna un Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree y al ser un boolean entonces puede recibir un true o un false y si es true entonces dejará pasar a la persona y si es false entonces el guard bloqueará o cancelará la petición haciendo que no pase la persona */
export const canMatchAuthGuard: CanMatchFn = (
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

  return checkAuthStatus();
};

/* canActivateAuthGuard recibe cual es la ruta que quiere y el state que vendría a ser como el snapshot o fotografía de cómo está el router (argumentos, query parameters, la ruta, etc...) y retornará algo de tipo CanActivateFn que es un type que tiene una función la cual retorna un Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree y al ser un boolean entonces puede recibir un true o un false y si es true entonces dejará pasar a la persona y si es false entonces el guard bloqueará o cancelará la petición haciendo que no pase la persona */
export const canActivateAuthGuard: CanActivateFn = (
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
/* EJEMPLO DE USO */
/*
  {
    path: 'dashboard',
    canMatch: [() => canMatch(['ADMIN'])],
    loadComponent: () => import('./dashboard/admin.component'),
  },
  {
    path: 'dashboard',
    canMatch: [() => canMatch(['MANAGER'])],
    loadComponent: () => import('./dashboard/manager.component'),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/everyone.component'),
  }

- Si usáramos canActivate, validaría si puede entrar a la ruta que haga match y listo, pueda entrar o no.
- Con el canMatch, entrará al primer path que haga match, y si fuera false, seguiría al siguiente path que haga match, y así.

De esta forma tenemos un mismo path con diferentes posibilidades, en este caso dependiendo del rol.
*/
