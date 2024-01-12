import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environments';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  constructor(private httpClient: HttpClient) {}

  private baseUrl: string = environments.BASE_URL;

  handleGetHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  /* se regresará un observable que emita algo de tipo Hero o undefined, y se coloca el undefined porque puede ser que el usuario escribió directo en la url un id que no existe y eso me ayudará para hacer alguna validación para salirme de la pantalla e ir a otra, regresar algún error, etc */
  handleGetHeroById(idHero: string): Observable<Hero | undefined> {
    /* aquí si el idHero viene undefined entonces nos dará un 404 Not Found y por eso se manejará el error */
    return this.httpClient
      .get<Hero>(`${this.baseUrl}/heroes/${idHero}`)
      .pipe(catchError(() => of(undefined)));
  }
}
