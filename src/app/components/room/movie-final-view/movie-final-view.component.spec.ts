import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFinalViewComponent } from './movie-final-view.component';

describe('MovieFinalViewComponent', () => {
  let component: MovieFinalViewComponent;
  let fixture: ComponentFixture<MovieFinalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieFinalViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieFinalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
