import { mockRoomIds } from '../../data/mock-roomids';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PrestoreRoomInfo } from '../../interfaces/prestore-room-info';
import { AuthenticationService } from '../authentication/authentication.service';
import { ApiGatewayService } from '../api-gateway/api-gateway.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoomManagementService {
  roomIds: string[] = mockRoomIds;

  isRoomAdmin: boolean;

  currentRoomId: string;

  currentRoomInfo: PrestoreRoomInfo = null;

  currentRoomObservable: BehaviorSubject<PrestoreRoomInfo> = new BehaviorSubject(null);

  constructor(private auth: AuthenticationService,
              private apiGateway: ApiGatewayService,
              private router: Router) {
    if (!this.auth.isAuthenticated) {
      this.router.navigateByUrl('/');
    }
  }

  async createRoom() {
    //this.currentRoomId = await this.apiGateway.createRoom();

    console.log(this.currentRoomId);
    this.isRoomAdmin = true;
    this.currentRoomInfo = {isRoomOwner: this.isRoomAdmin, roomId: this.currentRoomId};
    this.currentRoomObservable.next(this.currentRoomInfo);
    // TODO Service!
    localStorage.setItem('roomInfo', JSON.stringify(this.currentRoomInfo));
  }

  get roomId() { return this.currentRoomId; }

  joinRoom(token: string) {
    this.currentRoomId = token;
    this.isRoomAdmin = false;
    this.currentRoomInfo = {isRoomOwner: this.isRoomAdmin, roomId: this.currentRoomId};
    this.currentRoomObservable.next(this.currentRoomInfo);

    localStorage.setItem('roomInfo', JSON.stringify(this.currentRoomInfo));
  }

  exitRoom() {
    this.currentRoomId = '';
    this.currentRoomInfo = null;
    this.currentRoomObservable.next(null);
  }
}
