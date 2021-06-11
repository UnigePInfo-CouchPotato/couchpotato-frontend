import { Router } from '@angular/router';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, interval, Subscription, timer } from 'rxjs';
import { CanVoteResponse, EndVoteResponse } from 'src/app/interfaces/api-responses/responses';
import { HttpStatusCode } from 'src/app/interfaces/http-status-code';
import { RoomManagementService } from 'src/app/services/room-management/room-management.service';

@Component({
  selector: 'app-movie-final-buffer',
  templateUrl: './movie-final-buffer.component.html',
  styleUrls: ['./movie-final-buffer.component.scss']
})
export class MovieFinalBufferComponent implements OnInit, OnDestroy {
  @Input() isAdmin: boolean = false;
  @Input() roomId: string = '';
  @Input() stage$: BehaviorSubject<number>;

  showError: boolean = false;
  showLoading: boolean = false;
  errorText: string = '';
  refreshInterval: Subscription;

  constructor(private roomService: RoomManagementService, private router: Router) {
  }

  async canVote(): Promise<void> {
    const response: [HttpStatusCode, CanVoteResponse] = await this.roomService.canVote(this.roomId);
    if (response[0].value != 200) {
      this.showError = true;
      this.errorText = response[1].error;
    } else {
      if (!this.isAdmin && !response[1].data.usersCanVote) {
        this.showLoading = true;
        timer(3000).toPromise().then(_ => this.stage$.next(5));
      }
    }
  }

  async endVote(): Promise<void> {
    const response: [HttpStatusCode, EndVoteResponse] = await this.roomService.endVote(this.roomId);
    if (response[0].value != 200) {
      this.showError = true;
      this.errorText = response[1].error;
    } else {
      this.showLoading = true;
      timer(3000).toPromise().then(_ => this.stage$.next(5));
    }
  }
  ngOnInit(): void {

    this.refreshInterval = interval(10000).subscribe({
      next: _ => { if (!this.isAdmin) { this.canVote(); } }
    });
  }

  ngOnDestroy(): void {
    this.refreshInterval.unsubscribe();
  }

  goToHome(): void {
    this.router.navigateByUrl('/');
  }
}
