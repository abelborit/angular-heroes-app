import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHeroPageComponent } from './list-hero-page.component';

describe('ListHeroPageComponent', () => {
  let component: ListHeroPageComponent;
  let fixture: ComponentFixture<ListHeroPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListHeroPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListHeroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
