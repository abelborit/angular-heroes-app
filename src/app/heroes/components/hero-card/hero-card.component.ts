import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css'],
})
export class HeroCardComponent implements OnInit {
  /* Las dos líneas de código son formas de inicializar una propiedad heroInfo en TypeScript, pero difieren en cómo TypeScript maneja la verificación de nulidad o asignación antes de su uso. */
  @Input()
  /* Forma 1 decirle a un objeto que se comporte como Hero */
  /* En esta línea, se está inicializando heroInfo como un objeto vacío {} y luego se está utilizando el operador "as" para indicar al compilador que este objeto vacío debe ser tratado como una instancia de Hero. Esto evita los errores de compilación relacionados con la incompatibilidad de tipos, pero no garantiza que heroInfo no sea nulo o indefinido en tiempo de ejecución. */
  public heroInfo: Hero = {} as Hero;

  /* Forma 2 decirle a typescript que sí o sí vendrá heroInfo */
  /* En esta línea, se está utilizando el modificador ! (también conocido como "postfix assertion") para indicar al compilador que se está asumiendo que heroInfo no será nulo o indefinido en tiempo de ejecución. Esencialmente, le estás diciendo al compilador que confíe en ti y que no realice verificaciones de nulidad para esta propiedad. Esto puede conducir a errores en tiempo de ejecución si heroInfo es nulo o indefinido cuando intentas acceder a sus propiedades. */
  // public heroInfo!: Hero;

  ngOnInit(): void {
    /* hacer una validación por si acaso no llega la información de heroInfo */
    if (!this.heroInfo) {
      console.log('Hero property is required');
      throw new Error('Hero property is required');
    }
  }
}
