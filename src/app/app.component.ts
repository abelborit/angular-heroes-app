import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

/* FORMA INCORRECTA CON EL OnInit Y ngOnInit */
/* como primer punto, aquí se está usando el subscribe en checkAuthentication que viene del servicio pero este checkAuthentication regresa un observable que emite un valor boolean o regresa un boolean entonces ahí surge un primer problema porque checkAuthentication solo tendría que regresar un observable para usar el subscribe */
/* como segundo punto, al realizarlo de esta forma con el OnInit Y ngOnInit pareciera que todo está bien porque carga todo y funciona correctamente pero el aplicar el OnInit y ngOnInit es muy tarde para nuestro caso entonces estaría mal aplicarlo de esta manera porque para el momento en que este ngOnInit se dispara posiblemente nosotros no queremos que nada de la pantalla de /heroes/list se muestre y lo que uno pensaría es que cuando termine de dispararse la autenticación entonces se redirecciona a otra pantalla pero al ser un proceso asíncrono entonces puede ser que un usuario X ya haya visto alguna información que no debería ver entonces al disparar el ngOnInit de repente ya es muy tarde para disparase el proceso de autenticación */
/* entonces para solucionar eso usaremos los GUARDS para que la personas que no esté autenticada no pueda ver información que no le corresponda, también que no se va a construir el elemento y tampoco cargará ningún módulo */
// export class AppComponent implements OnInit {
//   title = 'angular-heroes-app';

//   constructor(private authService: AuthService) {}
//   ngOnInit(): void {
//     this.authService
//       .checkAuthentication()
//       .subscribe((response) =>
//         console.log('checkAuthentication finished!', { response })
//       );
//   }
// }
export class AppComponent {
  title = 'angular-heroes-app';
}
