/* ESTRATEGIA: on demand (hacer un servicio que se encargue de precargar módulos y que se active a través de eventos dentro de la vista/pantalla, por ejemplo, al hacer un hover a un button que se cargue un módulo, etc) */
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, EMPTY, mergeMap } from 'rxjs';
import {
  PreloadingOptions,
  PreloadingService,
} from '../services/preloading.service';

/* está proveído en el root entonces no es necesario colocarlo en el "providers: [...]" del "app.module.ts" */
@Injectable({
  providedIn: 'root',
})
export class OnDemandPreloadingStrategy implements PreloadingStrategy {
  private _preloadOnDemandOptions$: Observable<PreloadingOptions>;

  constructor(private _preloadingService: PreloadingService) {
    /* inicializamos las opciones desde el observable del servicio PreloadingService */
    this._preloadOnDemandOptions$ = this._preloadingService.options$;
  }

  /* método que decide si precarga o no la ruta y por ende el módulo */
  private decidedToPreload(
    route: Route,
    preloadingOptions: PreloadingOptions
  ): boolean {
    /* condiciones para que retorne un true o un false:
      1. la ruta tiene una propiedad llamada "data"
      2. la ruta tiene dentro de "data" una key llamada "preload" en true
      3. las opciones incluyen una ruta que está incluída en una lista de rutas que queremos precargar
      4. las opciones tienen "preload" en true
      5. aquí podríamos poner más condiciones personalizadas si son necesarias.....
      6. aquí podríamos poner más condiciones personalizadas si son necesarias.....
    */
    return (
      route.data &&
      route.data['preload'] &&
      [route.path, '*'].includes(preloadingOptions.routePath) && // arreglo con las rutas que se le pasen y también todas las rutas en general usando "*". También se pueden colocar las rutas específicas que queremos pero ya con esto estamos colocando de forma general
      preloadingOptions.preload /* true (default) */
    );
  }

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // console.log({ route });
    // console.log({ load });

    /* escuchar a los valores de opciones de precarga emitidos por el .next() del servicio */
    return this._preloadOnDemandOptions$.pipe(
      /* iterar sobre las opciones que vamos recibiendo del servicio usando el .next() */
      mergeMap((preloadingOptions: PreloadingOptions) => {
        /* comprobar si se debe cargar o no esa ruta bajo esas opciones  */
        const preload: boolean = this.decidedToPreload(
          route,
          preloadingOptions
        );

        /* mostrar en consola si se precarga o no el módulo */
        console.log(
          `${preload ? 'SI' : 'NO'} se precarga el módulo de la ruta ${
            route.path
          }`
        );

        /* retornar la ejecución del callback load() o sino un EMPTY */
        return preload ? load() : EMPTY;
      })
    );
  }
}
