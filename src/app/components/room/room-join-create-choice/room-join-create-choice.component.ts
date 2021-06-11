import { Component, Input } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { RoomManagementService } from 'src/app/services/room-management/room-management.service';
import { HttpStatusCode } from 'src/app/interfaces/http-status-code';
import { CreateRoomResponse, JoinRoomResponse } from 'src/app/interfaces/api-responses/responses';

@Component({
  selector: 'app-room-join-create-choice',
  templateUrl: './room-join-create-choice.component.html',
  styleUrls: ['./room-join-create-choice.component.scss']
})
export class RoomJoinCreateChoiceComponent {
  @Input() stage$: BehaviorSubject<number>;

  formControl = {
    roomId: ''
  };

  showError: boolean = false;
  showLoading: boolean = false;
  errorText: string = '';

  constructor(private roomService: RoomManagementService) { }

  async createRoom() {
    const response: [HttpStatusCode, CreateRoomResponse] = await this.roomService.createRoom();
    if (response[0].value != 201) {
      this.showError = true;
      this.errorText = response[1].error;
    } else {
      this.showLoading = true;
      timer(3000).toPromise().then(_ => this.stage$.next(1));
    }
  }

  async joinRoom() {
    if (this.formControl.roomId.length > 0) {
      const response: [HttpStatusCode, JoinRoomResponse] = await this.roomService.joinRoom(this.formControl.roomId);
      if (response[0].value != 201) {
        this.showError = true;
        this.errorText = response[1].error;
      } else {
        this.showLoading = true;
        timer(3000).toPromise().then(_ => this.stage$.next(1));
      }
    }
  }
}
