import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-hero-page',
  templateUrl: './search-hero-page.component.html',
  styleUrls: ['./search-hero-page.component.css'],
})
export class SearchHeroPageComponent {
  /* para querer usar la instancia de FormControl en este archivo y luego utilizarla para enlazarla al HTML como en este caso por ejemplo de [formControl]="searchInput" en la etiqueta input HTML, entonces tenemos que importar un módulo que es el ReactiveFormsModule que es para trabajar los formularios de forma reactiva y ese módulo se importará en heroes.module.ts en este caso ya que solo este componente lo está utilizando, pero también se puede colocar en los módulos donde se necesite o si toda la aplicación trabaja con formularios entonces se podría colocar este ReactiveFormsModule en el módulo padre de toda la aplicación el cual en este caso sería el app.module.ts */
  /* al trabajar con formularios reactivos tenemos mucho control sobre el formulario lo cual resulta más cómodo y facil trabajarlos */
  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor(private heroesService: HeroesService) {}

  handleSearchHero(): void {
    /* se coloca como || "" porque el value puede ser null en alguna parte del tiempo porque la persona no lo tocó, o no está inicializado, etc */
    const value: string = this.searchInput.value || '';
    // console.log({ value });

    this.heroesService
      .handleGetSuggestions(value)
      .subscribe((response) => (this.heroes = response));
  }

  handleSelectedOption(event: MatAutocompleteSelectedEvent): void {
    // console.log({ event });
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }

    const heroToSelect: Hero = event.option.value;
    this.searchInput.setValue(heroToSelect.superhero);
    this.selectedHero = heroToSelect;
  }
}

/* ******************************************************************************************************************* */
/* En este caso no utilizamos el two-way data binding en el form control porque no hay una vinculación bidireccional entre el input del formulario y la propiedad searchInput del componente. El two-way data binding utiliza la sintaxis [(ngModel)] para lograr una vinculación bidireccional, pero en este caso, solo se está utilizando la sintaxis [formControl]="searchInput" para realizar una vinculación unidireccional.

El searchInput es una instancia de FormControl que está vinculada a la etiqueta <input> mediante la propiedad [formControl]="searchInput". Esto establece una vinculación unidireccional, lo que significa que cuando el valor del campo de entrada cambia, se actualiza la propiedad searchInput en el componente. Sin embargo, si se actualiza la propiedad searchInput en el componente, no cambiará automáticamente el valor del campo de entrada.

La forma adecuada para obtener y establecer el valor del campo de entrada searchInput es a través de los métodos proporcionados por el objeto FormControl, como se hace en este caso:
  - Para obtener el valor del campo de entrada, se utiliza this.searchInput.value en la función handleSearchHero().
  - Para establecer el valor del campo de entrada, se utiliza this.searchInput.setValue(hero.superhero) en la función handleSelectedOption().

También se puede ver la documentación que nos proporciona Angular acerca de los Reactive Forms: https://angular.io/guide/reactive-forms */
