import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [
  /* path base auth/.... y que de ahí se carguen sus rutas aplicando lazyload */
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((module) => module.AuthModule),
  },

  /* path base heroes/.... y que de ahí se carguen sus rutas aplicando lazyload */
  {
    path: 'heroes',
    loadChildren: () =>
      import('./heroes/heroes.module').then((module) => module.HeroesModule),
  },

  {
    path: '404',
    component: Error404PageComponent,
  },

  /* para que el path sea exacto y que tal cual esté entonces se muestre el componente porque si no se coloca entonces al ser un path que es un string vacío entonces se interpreta que está adelante del path heroes o auth y puede causar problemas al entrar a alguna URL */
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full',
  },

  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  /* para que no se tenga problemas al hacer algún deploy, por ejemplo, en GitHub Pages en este caso, porque la primera vez que se entra a la página desplegada que nos da GitHub Pages carga todo normal pero cuando se refresca entonces aparece un 404 Not Found propio de Git Hub Pages */
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule {}

/* ******************************************************************************************************************* */
/*
PREGUNTA: ¿Porque loadchildren debe importar un módulo como AuthModule que no es de rutas hijas como lo indica la documentación de angular, en lugar de importar directamente AuthRoutingModule, la cual la usan en algunos casos como en https://javascript.plainenglish.io/angular-router-children-or-loadchildren-a74a9593af07 pues se observa que el Routing Module también importa componentes que requiere para las rutas?

RESPUESTA: Porque lo que se quiere es que el AuthModule se pueda parar o funcionar por sí solo y no tener dependencias. La idea es idealmente que cuando se importe el módulo de Auth (AuthModule), importe la definición de sus rutas sin tener que editarlo en el AppRoutingModule. Hay muchas formas de hacer las cosas, pero si lo definimos en el AppRoutingModule, creamos una dependencia entre los dos manejadores de rutas que a la vez tiene pro y contras:
  - Pro de definirlo en el AppRoutingModule: Se sabe cuales son las rutas asignadas.
  - Contra de definirlo en el AppRoutingModule: En proyectos con varios módulos crece mucho las importaciones y se hace realmente no se crea la separación de módulos y los módulos no son 100% autosuficientes.
*/
