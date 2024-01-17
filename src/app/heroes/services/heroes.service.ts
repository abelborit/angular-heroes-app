import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environments';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl: string = environments.BASE_URL;

  handleGetHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  /* se regresará un observable que emita algo de tipo Hero o undefined, y se coloca el undefined porque puede ser que el usuario escribió directo en la url un id que no existe y eso me ayudará para hacer alguna validación para salirme de la pantalla e ir a otra, regresar algún error, etc */
  handleGetHeroById(idHero: string): Observable<Hero | undefined> {
    /* aquí si el idHero viene undefined entonces nos dará un 404 Not Found y por eso se manejará el error */
    return this.httpClient
      .get<Hero>(`${this.baseUrl}/heroes/${idHero}`)
      .pipe(catchError(() => of(undefined)));
  }

  handleGetSuggestions(query: string): Observable<Hero[]> {
    /* aquí puede regresar un array de Hero o un array vacío si se coloca algún query de búsqueda que no exista */
    /* como se está usando json-server entonces tiene varios parámetros para usar: https://www.npmjs.com/package/json-server#routes */
    return this.httpClient.get<Hero[]>(
      `${this.baseUrl}/heroes?q=${query}&_limit=6`
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.httpClient.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    /* es importante tener la validación en el backend pero siempre es recomendable hacer las validaciones tanto del lado del backend como del lado del frontend. Así evitaremos que la aplicación se rompa */
    if (!hero.id) throw new Error('Hero id is required');

    /* para actualizar parte del registro del héroe entonces se hará con un patch pero si se quiere modificar todo el registro del héroe entonces se hará con un put */
    return this.httpClient.patch<Hero>(
      `${this.baseUrl}/heroes/${hero.id}`,
      hero
    );
  }

  /* cuando se elimina el héroe la primera vez nos da un status 200 de que se eliminó correctamente pero si se quiere eliminar de nuevo nos aparece un status 404 de not found porque ya se eliminó y no existe, entonces sería bueno que si se llama este deleteHeroById tener un valor boolean indicando si se eliminó o no correctamente */
  deleteHeroById(id: string): Observable<boolean> {
    /* aquí el delete emitirá un objeto vació entonces se puede quitar su tipado o sino puede emitir un error (en caso no exista lo que se quiere eliminar) el cual será manejado por el pipe catchError(). Para los pipe de catchError se puede usar una forma corta ya que no estamos usando el error: catchError(() => of(false)), y para el map también tiene su forma corta ya que no estamos usando el response: map(() => true) */
    return this.httpClient.delete(`${this.baseUrl}/heroes/${id}`).pipe(
      catchError((error) => {
        console.log(error);
        /* false para indicar que no se borró entonces eso indica que hubo algún error ya sea de que no se encontró lo que se quería eliminar o hubo un problema de conexión */
        return of(false);
      }),
      map((response) => {
        /* con el map no importa la respuesta que se tenga, este map sirve para transformar la respuesta. Entonces si es una solicitud exitosa, es decir, no pasó por el catchError() quiere decir que todo bien y nos dará un response pero ese response en este caso no nos importa que sea ya que con el map retornaremos un true. Con eso ya tenemos el tipado de regresar un observable de tipo boolean */
        console.log(response);
        return true;
      })
    );
  }
}

/* ******************************************************************************************************************* */
/* Diferencias al enviar datos. Al enviar datos por post por ejemplo, se puede enviar por raw json o por form data, la pregunta es: ¿Alguna es mas recomendable que otra? ¿Más rápida? ¿Alguna ventaja o desventaja? o  entonces ¿Queda a decisión de cómo el backend hizo el servicio web?

La elección entre enviar datos por JSON raw o por form data depende del contexto y las necesidades del servicio. En general, enviar JSON raw es más común y flexible, especialmente para aplicaciones web modernas y APIs RESTful, ya que permite estructurar datos complejos y es más eficiente en términos de tamaño de datos, el form data es útil para enviar archivos y es más compatible con navegadores más antiguos. La elección puede depender de cómo el backend maneja las solicitudes, pero JSON raw es preferido en muchas situaciones debido a su versatilidad y eficiencia. */
