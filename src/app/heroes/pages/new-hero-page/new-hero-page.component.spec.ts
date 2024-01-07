import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHeroPageComponent } from './new-hero-page.component';

describe('NewHeroPageComponent', () => {
  let component: NewHeroPageComponent;
  let fixture: ComponentFixture<NewHeroPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewHeroPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewHeroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
