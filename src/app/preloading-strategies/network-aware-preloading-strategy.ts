/* ESTRATEGIA: network aware (comprobar la conexión a internet del usuario) */
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';

/* se está colocando de tipo "any" para que no de warnings y evitar errores de escritura */
export declare var navigator: any;

/* está proveído en el root entonces no es necesario colocarlo en el "providers: [...]" del "app.module.ts" */
@Injectable({
  providedIn: 'root',
})
export class NetworkAwarePreloadStrategy implements PreloadingStrategy {
  /* el método preload es el encargado de recibir la ruta y ver si la cargará o no la cargará */
  /**
   *
   * @param route ruta recibida que debería cargar el módulo
   * @param load callback que cargará el módulo
   * @returns retorna la ejecución del callback || retorna un observable que emite un valor null
   */
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // console.log({ route });
    // console.log({ load });

    /* comprueba si el usuario tiene buena conexión a internet y si es así entonces realiza la precarga del módulo de la ruta y si no entonces nos dará un EMPTY (es un observable simple que no emite nada, solo emite inmediatamente un "complete". Solo emite "complete" y nada más) */
    return this.hasGoodConnection() ? load() : EMPTY;
  }

  /* función que decide si se carga un módulo o no que depende de la comprobación de si el usuario tiene buena conexión a internet */
  hasGoodConnection(): boolean {
    // console.log({ navigator });

    /* obtener la conexión a internet */
    const conn = navigator.connection;
    // console.log({ conn });

    /* comprobar si hay o no hay conexión a internet */
    if (conn) {
      /* comprobar si el usuario tiene habilitado la reserva de datos en celular (conn.saveData) y si no lo tiene habilitado entonces no cargamos el módulo */
      if (conn.saveData) {
        return false; // save data mode is enabled, so don't preload
      }

      /* lista de conexiones no válidas para precargar un módulo, se pueden colocar más opciones */
      const avoidTheseConnections = ['slow-2g', '2g' /* , '3g', '4g' */];

      /* obtener el tipo de conexión que tiene el usuario */
      const effectiveType = conn.effectiveType || '';

      /* comprobar si la conexión del usuario está en la lista de conexiones a evitar y si está en la lista entonces no cargamos el módulo */
      if (avoidTheseConnections.includes(effectiveType)) {
        return false;
      }
    }

    /* si la conexión es estable y buena entonces se precarga el módulo */
    return true;
  }
}
