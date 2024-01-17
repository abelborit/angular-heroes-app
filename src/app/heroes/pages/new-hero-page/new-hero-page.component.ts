import { Component } from '@angular/core';

@Component({
  selector: 'app-new-hero-page',
  templateUrl: './new-hero-page.component.html',
  styleUrls: ['./new-hero-page.component.css'],
})
export class NewHeroPageComponent {
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
