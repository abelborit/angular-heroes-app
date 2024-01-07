import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHeroPageComponent } from './search-hero-page.component';

describe('SearchHeroPageComponent', () => {
  let component: SearchHeroPageComponent;
  let fixture: ComponentFixture<SearchHeroPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchHeroPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchHeroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
