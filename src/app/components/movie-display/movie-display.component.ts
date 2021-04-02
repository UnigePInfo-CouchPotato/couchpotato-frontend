import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Languages } from 'src/app/interfaces/languages';
import { ImdbQueryService } from 'src/app/services/imdb-query.service';

@Component({
  selector: 'app-movie-display',
  templateUrl: './movie-display.component.html',
  styleUrls: ['./movie-display.component.scss']
})
export class MovieDisplayComponent implements OnInit {

  randomNumber: number = 42;

  shouldDisplay: boolean = false;

  numbers: number[] = [42, 69, 420, 1337];

  languages: Languages[] = [];

  constructor(private imbdQuery: ImdbQueryService) { }

  ngOnInit(): void {
    this.imbdQuery.queryRandomAPI().then((value: Languages[]) => this.languages = value);
  }

}
