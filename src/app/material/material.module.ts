import { NgModule } from '@angular/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
  ],
})
export class MaterialModule {}

/*
La forma como Angular maneja los módulos es bastante eficiente, una vez el módulo es cargado en memoria por el cliente, todos los otros módulos que lo requieran, simplemente lo usaran de nuevo (no lo carga de nuevo) pero si es cierto, que si sólo necesitas uno o dos componentes de Material, terminas cargando varios innecesarios.

Se puede dividir en módulos pequeños también, por ejemplo un módulo que tenga todos los componentes relacionados a formularios que usa la aplicación, otro con las tablas y así con los demás con el objetivo de facilitar la lectura y reducir las importaciones en nuestros componentes.

Ahora, hay que tener en cuenta que los paquetes cambian, se está a favor de que la aplicación no sea 100% eficiente con los imports granulares y optar por una solución más fácil de mantener y tolerante a cambios.

Esto se refiere a ¿Qué pasará cuando Material UI cambie la forma como está estructurado su paquete? (que ya ha pasado) y diga, "ahora este componente ya no estará en este path, estará en otro..." o ¿Qué pasaría si un componente pasa a ser obsoleto y ahora se recomienda usar otro pero ese que está obsoleto se usa mucho en la aplicación?

Si lo tenemos la dependencia en cada parte de la aplicación puede llevar horas hacer ese cambio, y si lo tuviéramos centralizado, sólo lo tenemos que actualizar en un lugar. (igual tomaría tiempo, pero no tanto)

Muchas veces se prefiere tener un mejor performance (que en la mayoría de los casos es imperceptible) a tener un código limpio que es fácil de leer y mantener.
*/
