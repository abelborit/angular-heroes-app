import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImage',
})
export class HeroImagePipe implements PipeTransform {
  transform(hero: Hero): string {
    if (!hero.id && !hero.alternative_img) return 'assets/no-image.png';
    if (hero.alternative_img) return hero.alternative_img;
    // return `assets/heroes/${hero.id}.jpg`;

    return this.handleUrlExists(`assets/heroes/${hero.id}.jpg`)
      ? `assets/heroes/${hero.id}.jpg`
      : 'assets/no-image.png';
  }

  handleUrlExists(url: string) {
    /* Se crea una nueva instancia del objeto XMLHttpRequest, que es un objeto proporcionado por los navegadores para realizar solicitudes HTTP desde el navegador. En este caso, se utiliza para hacer una solicitud HEAD para obtener solo la información de encabezado sin descargar el cuerpo de la respuesta. */
    let httpUrl = new XMLHttpRequest();

    /* Se configura la solicitud HTTP. Se utiliza el método open para especificar el tipo de solicitud (en este caso, HEAD), la URL objetivo (url), y se establece el tercer parámetro en false para indicar que la solicitud es síncrona. Esto significa que el código se bloqueará hasta que la solicitud se complete. */
    httpUrl.open('HEAD', url, false);

    /* Se envía la solicitud HTTP al servidor. */
    httpUrl.send();

    if (httpUrl.status != 404) return true;
    else return false;

    /*  Es importante tener en cuenta que esta implementación bloquea la ejecución del código hasta que la solicitud se complete, lo cual no es recomendado en aplicaciones web modernas debido a que puede hacer que la interfaz de usuario se congele mientras espera la respuesta del servidor. */
  }
}
