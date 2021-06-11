import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieVoteComponent } from './movie-vote.component';

describe('MovieVoteComponent', () => {
  let component: MovieVoteComponent;
  let fixture: ComponentFixture<MovieVoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieVoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
