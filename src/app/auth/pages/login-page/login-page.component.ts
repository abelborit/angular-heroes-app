import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PreloadingService } from '../../../services/preloading.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private _preloadingService: PreloadingService
  ) {}

  preloadModule(route: string) {
    this._preloadingService.startPreloading(route);
  }

  preloadAllModules() {
    /* con el '*' cargarán todas las rutas */
    this._preloadingService.startPreloading('*');
  }

  /* en handleLogin('correo@correo.com', '123456') del servicio se le están pasando dos parámetros de ejemplo porque la función pide esos parámetros (se pueden enviar otros datos pero al final solo traerá los datos de db-hero.json) porque se tendría que enviar al backend mediante una solicitud post pero la función realiza una solicitud get para traer los datos hardcodeado desde db-hero.json */
  handleLogin(): void {
    this.authService
      .handleLogin('correo@correo.com', '123456')
      .subscribe((response) => {
        console.log({ response });
        this.router.navigate(['/heroes/list']); // también se podría colocar ['/'] para que navegue el root path y como en el routing (heroes-routing.module.ts y app-routing.module.ts) ya está hecha la redirección entoces solo la redirige a ...../heroes/list
      });
  }
}
