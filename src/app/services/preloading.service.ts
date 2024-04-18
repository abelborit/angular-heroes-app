/* este será un servicio que se encargará de precargar o no un módulo de las diferentes rutas que haya en el módulo del enrutamiento y que estén especificadas como lazy loading */
/* la idea es que a través de un evento del usuario en el DOM (click, hover, ....) se inice una precarga o no de los módulos con lo que conseguiríamos adelantarnos al usuario precargando módulos que estamos prediciendo que va a necesitar. POR EJEMPLO si el usuario pasa el cursor por un elemento de un menú entonces vamos a precargar en segundo plano para que la navegación sea más fluída mejorando la experiencia de usuario y reducir tiempos de carga */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/* creación de una clase para las opciones de precarga para definir las opciones que debe de tener una ruta para precargar o no un módulo */
export class PreloadingOptions {
  constructor(public routePath: string, public preload: boolean = true) {}
}

@Injectable({
  providedIn: 'root',
})
export class PreloadingService {
  private _subject = new Subject<PreloadingOptions>();

  /* cualquie subject puede ser tratado como un observable y vamos a ofrecer las opciones de la ruta que desea ser cargada como un observable */
  public options$ = this._subject.asObservable();

  constructor() {}

  /* método encargado de iniciar una evaluación de precarga */
  startPreloading(routePath: string) {
    /* opciones de precarga */
    const preloadingOptions: PreloadingOptions = new PreloadingOptions(
      routePath,
      true
    );

    /* emitir las opciones que desean ser precargadas. Esta información la escuchará la estrategia de precarga "OnDemandPreloadingStrategy" para así evaluar si debe o no cargar la ruta y por ende su módulo */
    this._subject.next(preloadingOptions);
  }
}
