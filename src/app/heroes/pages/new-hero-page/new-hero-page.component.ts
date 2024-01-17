import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styleUrls: ['./new-hero-page.component.css'],
})
export class NewHeroPageComponent implements OnInit {
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
  public showLoadingWhenCreateHero?: boolean;
  public showLoadingWhenUpdateHero?: boolean;

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

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    /* si no incluye edit en la url entonces que no haga nada porque se creará un heroe */
    if (!this.router.url.includes('edit')) {
      this.showLoadingWhenCreateHero = true;
      this.showLoadingWhenUpdateHero = false;
      return;
    }

    this.activatedRoute.params
      .pipe(
        delay(1000),
        switchMap(({ id }) => this.heroesService.handleGetHeroById(id)),
        tap(() => {
          this.showLoadingWhenCreateHero = false;
          this.showLoadingWhenUpdateHero = true;
        })
      )
      .subscribe((response) => {
        if (!response) return this.router.navigateByUrl('/');

        /* el reset hace dos funciones:
        1. Regresa el formulario a su valor original
        2. Si le mandamos un argumento entonces automáticamente establece los campos cuyos nombres coincidan con los de mi formulario */
        this.heroForm.reset(response);
        return;
      });
  }

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

    /* ACTUALIZAR HERO */
    /* se puede utilizar el this.getCurrentHero.id o this.heroForm.value.id ya que prácticamente están conectados */
    if (this.getCurrentHero.id) {
      /* se manda el this.getCurrentHero como una propiedad y NO como función ya que es un getter */
      /* este updateHero es un observable y nos tenemos que suscribir para que se dispare ese observable */
      this.heroesService
        .updateHero(this.getCurrentHero)
        .pipe(
          tap(() => {
            this.showLoadingWhenCreateHero = false;
            this.showLoadingWhenUpdateHero = true;
          })
        )
        .subscribe((response) => {
          console.log(response);
          this.handleShowMatSnackBar(`${response.superhero} updated!`);
        });
      /* se manda el return para salir del scope de esta validación y también de la función handleSubmit y ya no realice nada más */
      return;
    }

    /* CREAR HERO */
    /* al crear el hero el id lo genera automáticamente el json-server, nosotros solo nos encargamos enviarle la data: https://stackoverflow.com/questions/53086951/json-server-strange-autoincrement-id */
    this.heroesService
      .addHero(this.getCurrentHero)
      .pipe(
        tap(() => {
          this.showLoadingWhenCreateHero = true;
          this.showLoadingWhenUpdateHero = false;
        })
      )
      .subscribe((response) => {
        console.log(response);
        /* al crear el hero entonces me navegará al fomrulario de edición de ese hero creado */
        this.router.navigate(['/heroes/edit', response.id]);
        this.handleShowMatSnackBar(`${response.superhero} created!`);
      });
  }

  handleDeleteHero() {
    if (!this.getCurrentHero.id) throw new Error('Hero id is required');

    /* aquí se está enviando una data que tendrá los valores del heroForm */
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value,
    });

    /* FORMA 1: subscribe() dentro de otro subscribe() */
    // /* aquí se está subscribiendo y este afterClosed solo emite una vez cuando el formulario se cierra y por eso no hay un ngOnDestroy para hacer la limpieza porque internamente este afterClosed tiene como un operador take one (recibe un elemento y se cierra) y por eso podemos hacerlo de esta manera */
    // dialogRef.afterClosed().subscribe((result) => {
    //   /* este result es el resultado del diálogo */
    //   // console.log('The dialog was closed');
    //   // console.log({ result });

    //   /* si el result es undefined (cuando se hace click afuera del diálogo) o false (cuando se cancela el diálogo) entonces que no haga nada */
    //   if (!result) return;

    //   this.heroesService
    //     .deleteHeroById(this.getCurrentHero.id)
    //     .subscribe((response) => {
    //       /* el response de deleteHeroById es un true cuando SI fue eliminado o false cuando NO fue eliminado */
    //       if (response) {
    //         this.router.navigate(['/heroes/list']);
    //       }
    //     });
    // });

    /* FORMA 2: sintaxis mejorada usando pipes de RxJS */
    /*
    .pipe()
      1. Filtramos el resultado positivo -> filter()
      2. Si es positivo disparamos la eliminación del héroe -> switchMap()
      3. Efecto secundario para saber cómo va el result de la eliminación anterior hecha con el switchMap() -> tap()
      4. Si se elimina entonces sería que todo está bien y es un true y lo dejamos pasar en el filtrado -> filter()
    .subscribe()
      5. Al final si todo está bien entonces nos da un true y eso quiere decir que pasará el filter() y luego se suscribe al observable y realizará la navegación a la ruta /heroes/list
    */
    dialogRef
      .afterClosed()
      .pipe(
        /* el filter es para filtrar y si la condición se cumple entonces lo deja pasar y si no cumple entonces lo bloquea. El result viene cuando se realiza alguna interacción con el modal de diálogo (cuando se hace click afuera del diálogo, cuando se hace click en cancelar el diálogo o cuando se confirma el diálogo) */
        filter((result: boolean) => result),
        switchMap(() =>
          /* Llamar un servicio utilizando switchMap en RxJS es una práctica común y eficaz, especialmente cuando se trata de gestionar flujos de datos asincrónicos. El switchMap está diseñado para manejar las solicitudes HTTP u otras operaciones asincrónicas, y es útil para cancelar solicitudes pendientes y emitir solo los resultados de la solicitud más reciente, lo que puede evitar resultados inesperados debido a solicitudes fuera de orden. En este caso, utilizamos switchMap para obtener un héroe por su ID, lo que es una práctica sólida */
          this.heroesService.deleteHeroById(this.getCurrentHero.id)
        ),
        tap((result) => console.log({ result })),
        filter((wasDeleted: boolean) => wasDeleted) // wasDeleted es para saber más explícitamente qué se está realizando pero se puede colocar también como result o cualquier otro nombre a nuestra preferencia
      )
      .subscribe((result) => {
        console.log({ result });
        this.router.navigate(['/heroes/list']);
        this.handleShowMatSnackBar(`${this.getCurrentHero.superhero} deleted!`);
      });
  }

  handleShowMatSnackBar(message: string): void {
    this.matSnackBar.open(message, 'okey', { duration: 2500 });
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
