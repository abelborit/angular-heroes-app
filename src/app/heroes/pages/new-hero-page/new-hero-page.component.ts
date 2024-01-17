import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styleUrls: ['./new-hero-page.component.css'],
})
export class NewHeroPageComponent {
  /* una consideración a tener en cuenta es que cuando se trabajen con formularios reactivos es necesario que cada elemento de nuestro formulario tiene que estar adentro de un elemento HTML padre, es decir, si se coloca el id, superhero, publisher dentro del formulario entonces deben de tener un elemento HTML padre que los envuelva, por ejemplo, un div, form, etc... pero debe tener un elemento HTML padre donde en este caso usaremos una etiqueta <form></form> */
  /* aquí se podrían ir creando todas los inputs que voy a necesitar para el formulario y que sean un new FormControl() y asignarle un valor por defecto como por ejemplo public id = new FormControl(''); luego tener un public name = new FormControl(''); pero al hacerlo así no sería un formulario reactivo, serían solo propiedades reactivas que tenemos en nuestro componente, es decir, pequeñas piezas de controles que tenemos aquí en nuestro componente */
  /* pero para que sea un formulario reactivo crearemos una propiedad general que sea un FormGroup() y que tenga todos los inputs del formulario que serán FormControl(). Para las propiedades se están colocando el valor inicial como un string vacío entonces cada propiedad puede ser bien un string o null (ver eso si se presiona la tecla ctrl o control y luego se pasa el mouse por encima de la propiedad por ejemplo del id o superhero, etc...) pero en el caso del publisher no podría ser string o null ya que siempre tendría que venir, entonces vemor que el FormControl es un genérico donde se le puede colocar el tipo de dato que va a fluir dentro de él */
  public heroForm = new FormGroup({
    id: new FormControl(''), // que TypeScript infiera el tipo de dato
    superhero: new FormControl<string>('', { nonNullable: true }), // decirle a TypeScript explícitamente el tipo de dato y que no puede ser null
    publisher: new FormControl<Publisher>(Publisher.DCComics), // decirle a TypeScript explícitamente el tipo de dato usando una interface o enum o type creado
    alter_ego: new FormControl<string>(''), // decirle a TypeScript explícitamente el tipo de dato
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alternative_img: new FormControl(''),
  });

  public publishers = [
    {
      id: 'DC Comics',
      value: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      value: 'Marvel - Comics',
    },
  ];

  constructor(private heroesService: HeroesService) {}

  /* hacer que un objeto luzca como si fuera un Hero y con esto evitar el problema de abajo. También al hacerlo de esta forma y tener el objeto como si fuera un tipo Hero ya se puede utilizar en el HTML por ejemplo para colocar la imagen. También tenemos ya los datos de forma centralizada */
  get getCurrentHero(): Hero {
    /* si se coloca "const hero = this.heroForm.value;" entonces nos aparece el mismo problema de que se espera recibir algo X y se manda algo Y pero que se ve como si fuera algo X, entonces para eso diremos que se comporte como un Hero, es decir, colocar ".... as Hero" */
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  handleSubmit(): void {
    // console.log({
    //   formIsValid: this.heroForm.valid,
    //   value: this.heroForm.value,
    // });

    if (this.heroForm.invalid) return;

    /* si se manda de esta forma "this.heroesService.updateHero(this.heroForm.value);" no son tipos compatibles, es decir, lo que se manda del formulario con lo que updateHero espera recibir técnicamente son lo mismo hasta cierto punto pero a la largo no lo son, por ejemplo, se espera recibir algo X y se manda algo Y pero que se ve como si fuera algo X, entonces técnicamente son lo mismo hasta cierto punto pero al final no lo son. En este aspecto TypeScript es bien restringido y aunque este formulario cumple la interface correctamente no se podría mandar de esa forma */
    /* para solucionar lo anterior se utilizarán los getters dentro del componente que es la función que creamos getCurrentHero() y ahora ver si se hace la creación o actualización de un héroe */
  }
}

/* ******************************************************************************************************************* */
/*
Aquí se crea un objeto con los publicadores (publishers), pero en la carpeta de interfaces del módulo se tiene un enum con estos. Se puede hacer uso de este para cargar los valores del select de la siguiente manera:

1. se importa el enum en el archivo new-hero-page.component.ts
    import { Publisher } from '../../interfaces/hero.interface';

2. se crea el objeto utilizando el tipo
    public publishers: typeof Publisher = Publisher;

3. en el html el *ngFor debe pasar el objeto por el pipe de 'keyvalues' y mostrar el value
    <mat-select required>
         <mat-option *ngFor="let publisher of publishers | keyvalue" [value]="publisher.value">
            {{ publisher.value }}
         </mat-option>
    </mat-select>
*/

/* ******************************************************************************************************************* */
/* siempre es mejor trabajar con formularios reactivos a menos que sean formularios muy pero muy simples entonces se podría trabajar con formularios con aproximación por template o trabajar con los [(ngModel)]="" que viene en FormsModule pero aunque funcione bien formularios por template o formularios con [(ngModel)]="" es mejor trabajarlos con formularios reactivos.

- Con el [(ngModel)]="" en general va a enlazar el valor pero nosotros queremos trabajar con el formulario que va más allá de manejar el valor del input porque necesitamos por ejemplo un estado completo del input, por ejemplo, tiene una etiqueta required (el input tiene que venir con un valor sí o sí), también se le puede colocar que cumpla una expresión regular, etc.

- Con formularios por template como su nombre lo dice, en el HTML se va a construir la mayor parte de la lógica lo cual puede ser contraproducente ya que lo que queremos es que los archivos HTML sean tal cual etiquetas HTML en su mayoría y no tenga tanta lógica para que sean fáciles de leer y fáciles de mantener.

- Con formularios reactivos quiere decir que vamos a tener la mayor parte de la lógica en el componente de TypeScript (.ts) ya que con esto hay mayor control, mayor facilidad de uso, los datos que vamos a utilizar estarán en el lado del componente de TypeScript (.ts) my fácilmente.
*/
