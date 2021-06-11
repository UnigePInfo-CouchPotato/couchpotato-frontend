import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, timer, interval, Subscription } from 'rxjs';
import { CanVoteResponse, GetRoomMoviesResponse, StartVoteResponse } from 'src/app/interfaces/api-responses/responses';
import { HttpStatusCode } from 'src/app/interfaces/http-status-code';
import { RoomManagementService } from 'src/app/services/room-management/room-management.service';

@Component({
  selector: 'app-room-results-buffer',
  templateUrl: './room-results-buffer.component.html',
  styleUrls: ['./room-results-buffer.component.scss']
})
export class RoomResultsBufferComponent implements OnInit, OnDestroy {
  @Input() isAdmin: boolean = false;
  @Input() roomId: string = '';
  @Input() stage$: BehaviorSubject<number>;

  showError: boolean = false;
  showLoading: boolean = false;
  errorText: string = '';

  refreshInterval: Subscription;

  constructor(private roomService: RoomManagementService) { }

  ngOnInit(): void {
    this.refreshInterval = interval(10000).subscribe({
      next: _ => { if (!this.isAdmin) { this.canVote(); } }
    });

    if (this.isAdmin) {
      this.getResults();
    }
  }

  async canVote(): Promise<void> {
    const response: [HttpStatusCode, CanVoteResponse] = await this.roomService.canVote(this.roomId);
    if (response[0].value != 200) {
      this.showError = true;
      this.errorText = response[1].error;
    } else {
      if (!this.isAdmin && response[1].data.usersCanVote) {
        this.showLoading = true;
        timer(3000).toPromise().then(_ => this.stage$.next(3));
      }
    }
  }

  async startVote(): Promise<void> {
    const response: [HttpStatusCode, StartVoteResponse] = await this.roomService.startVote(this.roomId);
    if (response[0].value != 200) {
      this.showError = true;
      this.errorText = response[1].error;
    } else {
      this.showLoading = true;
      timer(3000).toPromise().then(_ => this.stage$.next(3));
    }
  }

  async getResults(): Promise<void> {
    const response: [HttpStatusCode, GetRoomMoviesResponse] = await this.roomService.getResults(this.roomId);
    if (response[0].value != 200) {
      this.showError = true;
      this.errorText = response[1].error;
    } else {
      this.showLoading = true;
      timer(6000).toPromise().then(_ => this.startVote());
    }
  }

  ngOnDestroy(): void {
    this.refreshInterval.unsubscribe();
  }
}
