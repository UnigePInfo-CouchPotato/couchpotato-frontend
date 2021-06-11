import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GetRoomFinalMovieResponse } from 'src/app/interfaces/api-responses/responses';
import { Movie } from 'src/app/interfaces/api-responses/types/movie';
import { HttpStatusCode } from 'src/app/interfaces/http-status-code';
import { RoomManagementService } from 'src/app/services/room-management/room-management.service';

@Component({
  selector: 'app-movie-final-view',
  templateUrl: './movie-final-view.component.html',
  styleUrls: ['./movie-final-view.component.scss']
})
export class MovieFinalViewComponent implements OnInit {
  @Input() isAdmin: boolean = false;
  @Input() roomId: string = '';
  @Input() stage$: BehaviorSubject<number>;

  showError: boolean = false;
  showLoading: boolean = false;
  errorText: string = '';

  movie: Movie;

  constructor(private roomService: RoomManagementService) { }

  ngOnInit(): void {
    this.getFinalMovie();
  }

  async getFinalMovie(): Promise<void> {
    const response: [HttpStatusCode, GetRoomFinalMovieResponse] = await this.roomService.getFinalMovie(this.roomId);
    if (response[0].value != 200) {
      this.showError = true;
      this.errorText = response[1].error;
    } else {
      this.movie = response[1].data;
    }
  }

}
