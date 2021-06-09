import { mockRoomIds } from './../data/mock-roomids';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PrestoreRoomInfo } from '../interfaces/prestore-room-info';

@Injectable({
  providedIn: 'root'
})
export class RoomManagementService {
  roomIds: string[] = mockRoomIds;

  isRoomOwner: boolean;

  currentRoomId: string;

  currentRoomInfo: PrestoreRoomInfo = null;
  currentRoomObservable: BehaviorSubject<PrestoreRoomInfo> = new BehaviorSubject(null);

  constructor() {
    this.currentRoomInfo = JSON.parse(localStorage.getItem('roomInfo'));
    console.log(this.currentRoomInfo);
    if (this.currentRoomInfo != null) {
      this.currentRoomId = this.currentRoomInfo.roomId;
      this.isRoomOwner = this.currentRoomInfo.isRoomOwner;
      this.currentRoomObservable.next(this.currentRoomInfo);
    }

  }

  createRoom() {
    this.currentRoomId = this.roomIds[Math.floor(Math.random() * this.roomIds.length)];
    this.isRoomOwner = true;
    this.currentRoomInfo = {isRoomOwner: this.isRoomOwner, roomId: this.currentRoomId};
    this.currentRoomObservable.next(this.currentRoomInfo);
    // TODO Service!
    localStorage.setItem('roomInfo', JSON.stringify(this.currentRoomInfo));
  }

  get roomId() { return this.currentRoomId; }

  joinRoom(token: string) {
    this.currentRoomId = token;
    this.isRoomOwner = false;
    this.currentRoomInfo = {isRoomOwner: this.isRoomOwner, roomId: this.currentRoomId};
    this.currentRoomObservable.next(this.currentRoomInfo);

    localStorage.setItem('roomInfo', JSON.stringify(this.currentRoomInfo));
  }

  exitRoom() {
    this.currentRoomId = '';
    this.currentRoomInfo = null;
    this.currentRoomObservable.next(null);
  }
}
