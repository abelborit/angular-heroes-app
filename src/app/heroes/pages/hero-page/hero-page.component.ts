import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.css'],
})
export class HeroPageComponent implements OnInit {
  /* para leer la url se usará el servicio propio en el router que es ActivatedRoute */
  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  /* se coloca como opcional porque cuando el componente se monta en un determinado punto en el tiempo no tenemos ningún valor y es null en ese momento */
  public heroInfo?: Hero;

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        delay(1500),
        switchMap(({ id }) => this.heroesService.handleGetHeroById(id))
      )
      .subscribe((response) => {
        // console.log({ response });

        if (!response) return this.router.navigate(['/heroes/list']);
        this.heroInfo = response;
        return;
      });
  }

  handleGoBack(): void {
    this.router.navigateByUrl('/heroes/list');
  }
}
