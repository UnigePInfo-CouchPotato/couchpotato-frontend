import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFinalBufferComponent } from './movie-final-buffer.component';

describe('MovieFinalBufferComponent', () => {
  let component: MovieFinalBufferComponent;
  let fixture: ComponentFixture<MovieFinalBufferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieFinalBufferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieFinalBufferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
