import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-list-hero-page',
  templateUrl: './list-hero-page.component.html',
  styleUrls: ['./list-hero-page.component.css'],
})
export class ListHeroPageComponent implements OnInit {
  constructor(private heroesService: HeroesService) {}

  public heroesData: Hero[] = [];

  /* las peticiones http que se quieran hacer usualmente se harán cuando se monta un componente como en este caso que se necesita la lista de héroes al cargar este componente, entonces esa funcionalidad se hace en el ngOnInit() que se dispara cuando se monta el componente */
  ngOnInit(): void {
    this.heroesService
      .handleGetHeroes()
      .subscribe((response) => (this.heroesData = response));
  }
}

/* ******************************************************************************************************************* */
/* ¿Cuál seráa la diferencia entre estos dos bloques de código */
/*
1.  ngOnInit(): void {
        this.heroesService.handleGetHeroes().subscribe({
          next: (response) => (this.heroesData = response),
          error: (error) => console.log(error),
        });
    }

2.  ngOnInit(): void {
        this.heroesService.handleGetHeroes().subscribe((response) => (this.heroesData = response));
    }
*/
/* Ambos bloques de código realizan la misma acción: llaman al servicio "heroesService" y su función "handleGetHeroes" y asignan el resultado a la variable "heroesData". Sin embargo, existe una diferencia clave entre ellos: en el primer bloque de código, el manejo de errores se realiza dentro de la función de devolución de llamada (callback) de subscribe(), mientras que en el segundo bloque de código, el manejo de errores NO se realiza explícitamente.

Cuando ocurre un error en el primer bloque de código, el callback de error se ejecuta e imprime el error en la consola. Por otro lado, en el segundo bloque de código, si ocurre un error, el error simplemente se descarta, ya que no se ha proporcionado ningun callback de error. */
