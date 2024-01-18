import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  /* se coloca como private porque no se quiere que de alguna forma desde el exterior o fuera de este servicio se puedan manipular estas propiedades, cualquier modificación o manipulación se hará solo desde el servicio, es decir, componentes externos no podrán modificar estas propiedades */
  private _baseUrl = environments.BASE_URL;
  /* se coloca _user como opcional porque en algún momento en el tiempo este usuario puede ser nulo, es decir, la primera vez que carga la aplicación puede ser que haya un usuario o que no haya un usuario */
  private _user?: User;

  constructor(private httpClient: HttpClient) {}

  /* como arriba se dice que las propiedades private no se podrán manipular directamente desde componentes exteriores, entonces se crearán getters para exponer las propiedades private para que otros componentes recién las puedan utilizar */
  /* puede ser undefined o se podría reemplazar por un null */
  get getCurrentUser(): User | undefined {
    if (!this._user) return undefined;

    /* si se retorna de esta forma "return this._user;" entonces se estaría retornando la propiedad original y eso es lo que no se quiere porque entonces se estaría dando de cierta forma acceso a esta propiedad u objeto al llamar al servicio y como se sabe los objetos se pasan por referencia entonces sería lo mismo que nada porque es el mismo objeto original */
    // return this._user;

    /* para evitar lo anterior y romper la referencia se podría aplicar el spread operator de esta forma "return { ...this._user };" */
    // return { ...this._user };

    /* otra opción más reciente es hacerlo con el structuredClone y hacerlo de esta forma "return structuredClone(this._user);" y este structuredClone() es básicamente la solución que tiene ahora JavaScript para realizar un clon profundo (deep clone) y no importa cuantos objetos y propiedades tenga el _user el structuredClone() hará un deep clone */
    return structuredClone(this._user);

    /* otra opción para dejar todo en una sola línea podría ser haciendo un operador ternario */
    // return !this._user ? undefined : structuredClone(this._user);
  }

  handleLogin(email: string, password: string): Observable<User> {
    /* en un proyecto real lo que se haría es una petición post para enviar el email y password al backend y que haga la autenticación "this.httpClient.post('login', { email, password });", pero en este caso se hará solo mediante una petición get para traer el usuario que se tiene en db-hero.json */

    /* lo que se recomienda es que cada tap o efecto secundario realice una sola acción o una cantidad mínima de acciones, entonces en este caso lo trabajaremos usando una acción por tap() lo cual facilita la lectura y es más facil de mantener */
    // return this.httpClient.get<User>(`${this._baseUrl}/users/1`).pipe(
    //   tap((response) => {
    //     this._user = response;
    //     localStorage.setItem('authToken', response.id.toString());
    //   })
    // );

    return this.httpClient.get<User>(`${this._baseUrl}/users/1`).pipe(
      tap((response) => (this._user = response)),
      tap((response) =>
        localStorage.setItem(
          'authToken',
          `${response.email}.${response.id.toString()}`
        )
      )
    );
  }

  checkAuthentication(): Observable<boolean> | boolean {
    /* si no hay authToken en el localStorage entonces retorna un false porque la función checkAuthentication me pide que retorne un Observable que emite un valor boolean o sino que retorne un boolean */
    if (!localStorage.getItem('authToken')) return false; // aquí retorna solo un false porque no es un observable porque si lo fuera entonces se tendría que colocar of(false) ya que el of(argumentos ) devuelve una instancia observable que entrega sincrónicamente un valor o valores que indica como argumentos

    const authToken = localStorage.getItem('authToken');

    return this.httpClient.get<User>(`${this._baseUrl}/users/1`).pipe(
      tap((response) => (this._user = response)), // efecto secundario
      map((response) => !!response), // transformar la data de response a un boolean porque la función checkAuthentication me pide que retorne un Observable que emite un valor boolean o sino que retorne un boolean porque si no se usa el map() entonces no cambia la data y estaría regresando un observable de tipo User. Recordar que el httpClient.get() ya retorna un observable entonces por eso en !!response no es necesario colocar el of()
      catchError(() => of(false)) // por si hay un error retorna un Observable que emite un valor boolean
    );
  }

  handleLogout(): void {
    this._user = undefined;
    localStorage.removeItem('authToken');
    // localStorage.clear(); // para eliminar todo lo que tenga localStorage de esta aplicación
  }
}

/* ******************************************************************************************************************* */
/* ¿Cuál es la necesidad de hacer el get del getCurrentUser con un clon? ¿Por qué no podriamos traer el mismo objeto? ¿En que ayuda o afecta? */
/*
Si haces uso del mismo objeto no es como que obtengas el objeto en un variable, es la referencia a dicho objeto (el espacio en memoria donde esta definido dicho objeto) por lo que si en otra parte del codigo haces uso de esta referencia y si modificas algún valor modificarás la data del servicio lo cual puede tener efectos no esperados.

Al hacer el structuredClone tienes un nuevo objeto que tiene la mismas propiedades y valores (similar a trabajar con el operador spread). De esta manera si se llega a mutar la data de dicho objeto clonado esto no afectará a nuestro objeto original.
*/
