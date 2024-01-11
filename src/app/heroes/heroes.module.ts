import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { LayoutPageComponent } from './layout/layout-page/layout-page.component';
import { NewHeroPageComponent } from './pages/new-hero-page/new-hero-page.component';
import { ListHeroPageComponent } from './pages/list-hero-page/list-hero-page.component';
import { SearchHeroPageComponent } from './pages/search-hero-page/search-hero-page.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { HeroImagePipe } from './pipes/hero-image.pipe';

@NgModule({
  declarations: [
    /* Pages */
    HeroPageComponent,
    LayoutPageComponent,
    NewHeroPageComponent,
    ListHeroPageComponent,
    SearchHeroPageComponent,

    /* Components */
    HeroCardComponent,

    /* Pipes */
    HeroImagePipe,
  ],
  imports: [CommonModule, HeroesRoutingModule, MaterialModule],
})
export class HeroesModule {}
