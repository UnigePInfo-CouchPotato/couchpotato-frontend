import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, timer, interval, Subscription } from 'rxjs';
import { CanJoinResponse, EndJoinResponse } from 'src/app/interfaces/api-responses/responses';
import { HttpStatusCode } from 'src/app/interfaces/http-status-code';
import { RoomManagementService } from 'src/app/services/room-management/room-management.service';

@Component({
  selector: 'app-room-waiting-room',
  templateUrl: './room-waiting-room.component.html',
  styleUrls: ['./room-waiting-room.component.scss']
})
export class RoomWaitingRoomComponent implements OnInit, OnDestroy {
  @Input() isAdmin: boolean = false;
  @Input() roomId: string = '';
  @Input() stage$: BehaviorSubject<number>;

  showError: boolean = false;
  showLoading: boolean = false;
  errorText: string = '';

  users: string[] = [];

  refreshInterval: Subscription;

  constructor(private roomService: RoomManagementService) { }

  ngOnInit(): void {
    this.refreshInterval = interval(10000).subscribe({
      next: _ => { if (!this.isAdmin) { this.canJoin(); } }
    });
  }

  async canJoin(): Promise<void> {
    const response: [HttpStatusCode, CanJoinResponse] = await this.roomService.canJoin(this.roomId);
    if (response[0].value != 200) {
      this.showError = true;
      this.errorText = response[1].error;
    } else {
      if (!response[1].data.usersCanJoin) {
        this.showLoading = true;
        timer(3000).toPromise().then(_ => this.stage$.next(2));
      }
    }
  }

  ngOnDestroy(): void {
    this.refreshInterval.unsubscribe();
  }

  async endJoin(): Promise<void> {
    const response: [HttpStatusCode, EndJoinResponse] = await this.roomService.endJoin(this.roomId);
    if (response[0].value != 200) {
      this.showError = true;
      this.errorText = response[1].error;
    } else {
      this.showLoading = true;
      timer(3000).toPromise().then(_ => this.stage$.next(2));
    }
  }
}
