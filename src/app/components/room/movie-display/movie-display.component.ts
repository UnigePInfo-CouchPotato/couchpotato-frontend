import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/interfaces/api-responses/types/movie';

/** Displays a movie element */
@Component({
  selector: 'app-movie-display',
  templateUrl: './movie-display.component.html',
  styleUrls: ['./movie-display.component.scss']
})
export class MovieDisplayComponent {
  @Input() movie: Movie;

  /** Creates an instance of MovieDisplayComponent. */
  constructor() { }
}
