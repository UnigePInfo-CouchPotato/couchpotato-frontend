import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { ApiGatewayService } from 'src/app/services/api-gateway/api-gateway.service';

@Component({
  selector: 'app-room-join-create-choice',
  templateUrl: './room-join-create-choice.component.html',
  styleUrls: ['./room-join-create-choice.component.scss']
})
export class RoomJoinCreateChoiceComponent implements OnInit {
  @Input() stage$: BehaviorSubject<number>;

  constructor(private apiGateway: ApiGatewayService) {
    // timer(5000).toPromise().then(_ => this.stage$.next(1));
  }

  ngOnInit(): void {
  }

  createRoom() {
    this.apiGateway.createRoom();
  }
}
