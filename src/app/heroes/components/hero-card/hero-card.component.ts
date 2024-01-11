import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css'],
})
export class HeroCardComponent implements OnInit {
  @Input()
  public heroInfo?: Hero;

  ngOnInit(): void {
    /* hacer una validación por si acaso no llega la información de heroInfo */
    if (!this.heroInfo) {
      console.log('Hero property is required');
      throw new Error('Hero property is required');
    }
  }
}
