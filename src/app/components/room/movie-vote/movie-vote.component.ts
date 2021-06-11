import { VoteChoices } from './../../../interfaces/api-responses/types/vote-choice';
import { BehaviorSubject, Subscription, timer } from 'rxjs';
import { Component, Input, ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { RoomManagementService } from 'src/app/services/room-management/room-management.service';
import { Movie } from 'src/app/interfaces/api-responses/types/movie';
import { HttpStatusCode } from 'src/app/interfaces/http-status-code';
import { GetRoomMoviesResponse, VoteResponse } from 'src/app/interfaces/api-responses/responses';

@Component({
  selector: 'app-movie-vote',
  templateUrl: './movie-vote.component.html',
  styleUrls: ['./movie-vote.component.scss']
})
export class MovieVoteComponent implements OnInit, OnDestroy {
  @Input() isAdmin: boolean = false;
  @Input() roomId: string = '';
  @Input() stage$: BehaviorSubject<number>;

  showError: boolean = false;
  showLoading: boolean = false;
  errorText: string = '';

  movies: Movie[] = [];
  moviesSubscription: Subscription;

  choices: VoteChoices = {};

  constructor(private roomService: RoomManagementService, private ref: ChangeDetectorRef) {

  }
  ngOnInit(): void {
    this.moviesSubscription = this.roomService.resultsObs$.subscribe({
      next: (v: Movie[]) => {
        this.movies = v.map(a => ({...a}));
        this.movies.forEach(m => {
          this.choices['' + m.id] = 0;
        });
        this.ref.markForCheck();
      }
    });

    if (!this.isAdmin) {
      this.getResults();
    }
  }

  ngOnDestroy(): void {
    this.moviesSubscription.unsubscribe();
  }

  async getResults(): Promise<void> {
    const response: [HttpStatusCode, GetRoomMoviesResponse] = await this.roomService.getResults(this.roomId);
    if (response[0].value != 200) {
      this.showError = true;
      this.errorText = response[1].error;
    }
  }

  setVote(i: number, movieId: number, value: number) {
  this.choices['' + movieId] = value;
    document.getElementById('right-' + i).classList.remove(value == 1 ? 'red' : 'grey');
    document.getElementById('right-' + i).classList.add(value == 1 ? 'grey' : 'red');
    document.getElementById('left-' + i).classList.remove(value == 1 ? 'grey' : 'red');
    document.getElementById('left-' + i).classList.add(value == 1 ? 'red' : 'grey');
  }

  async postVotes(): Promise<void> {
    const response: [HttpStatusCode, VoteResponse] = await this.roomService.postVote(this.roomId, this.choices);
    if (response[0].value != 200) {
      this.showError = true;
      this.errorText = response[1].error;
    } else {
      this.showLoading = true;
      timer(3000).toPromise().then(_ => this.stage$.next(4));
    }
  }
}
