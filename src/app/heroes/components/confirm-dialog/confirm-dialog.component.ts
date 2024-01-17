import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent {
  constructor(
    /* en el MatDialogRef se colocará el nombre de este componente */
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,

    /* aquí se está haciendo la inyección manual de un servicio. El MAT_DIALOG_DATA es como el token para que sepa cual es el servicio que estamos inyectando manualmente. @Inject()es un mecanismo manual para que Angular sepa que se debe inyectar un parámetro. Básicamente, es otra forma de obtener una dependencia que no sea usar la inyección del constructor. Cuando usamos @Inject, estamos solicitando a Angular que proporcione una instancia de una dependencia registrada en el contenedor de inyección de dependencias. Por lo tanto, nos permite obtener instancias de servicios o dependencias sin tener que crear manualmente sus instancias usando el operador new. */
    @Inject(MAT_DIALOG_DATA) public data: Hero
  ) {
    console.log({ data });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
