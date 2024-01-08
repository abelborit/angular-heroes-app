import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './layout/layout-page/layout-page.component';
import { NewHeroPageComponent } from './pages/new-hero-page/new-hero-page.component';
import { SearchHeroPageComponent } from './pages/search-hero-page/search-hero-page.component';
import { ListHeroPageComponent } from './pages/list-hero-page/list-hero-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'new-hero', component: NewHeroPageComponent },
      { path: 'search', component: SearchHeroPageComponent },
      { path: 'edit/:id', component: NewHeroPageComponent },
      { path: 'list', component: ListHeroPageComponent },
      /* al trabajar de esta forma, es decir, utilizar un comodín para que, por ejemplo, en este caso se use de forma dinámica el id para mostrar una página, entonces debería ir al último o después de los otros path porque por ejemplo si se coloca al principio o al centro o X posición entonces los path que vengan después no ingresarán nunca a sus path propiamente porque todas esas rutas van a coincidir con ese comodín pero con su path, es decir, el id podría ser new-hero, luego el id podría ser searh y así sucesivamente lo cual por eso jamás entrarían a sus propios path */
      /* también surge la duda de que en qué momento entrará a este /:id, entrará la primera vez que entremos al componente con el path: '' y al no existir entonces irá al comodín de path: '**' lo cual va a redirigir al path: 'list' */
      // { path: ':id', component: HeroPageComponent },

      /* entonces también se puede colocar de esta forma por ejemplo: http://localhost:4200/#/heroes/id/48368 */
      { path: 'id/:id', component: HeroPageComponent },
      { path: '**', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
