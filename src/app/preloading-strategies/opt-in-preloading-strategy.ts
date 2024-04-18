/* ESTRATEGIA: option in (nuestras rutas tienen una opción para que precargue o no precargue el módulo) */
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

/* está proveído en el root entonces no es necesario colocarlo en el "providers: [...]" del "app.module.ts" */
@Injectable({
  providedIn: 'root',
})
export class OptInPreloadingStrategy implements PreloadingStrategy {
  /* el método preload es el encargado de recibir la ruta y ver si la cargará o no la cargará */
  /**
   *
   * @param route ruta recibida que debería cargar el módulo
   * @param load callback que cargará el módulo
   * @returns retorna la ejecución del callback || retorna un observable que emite un valor null
   */
  preload(route: Route, load: Function): Observable<any> {
    // console.log({ route });
    // console.log({ load });

    return route.data && route.data['preload'] ? load() : of(null);
  }
}
