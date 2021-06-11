import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { RoomManagementService } from 'src/app/services/room-management/room-management.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnDestroy {
  stage$: BehaviorSubject<number> = new BehaviorSubject(0);
  stage: number = 0;
  roomId: string;
  isAdmin: boolean;

  private stageSubscription: Subscription;
  private adminSubscription: Subscription;
  private roomIdSubscription: Subscription;

  constructor(private roomService: RoomManagementService,
              private ref: ChangeDetectorRef) {
    this.stageSubscription = this.stage$.subscribe({
      next: (value: number) => {
        this.stage = value;
        this.ref.markForCheck();
      }
    });

    this.isAdmin = this.roomService.isRoomAdmin;
    this.adminSubscription = this.roomService.isRoomAdminObs$.subscribe({
      next: (v: boolean) => { this.isAdmin = v; this.ref.markForCheck(); }
    });

    this.roomIdSubscription = this.roomService.roomIdObs$.subscribe({
      next: (roomId: string) => { this.roomId = roomId; this.ref.markForCheck(); }
    });
  }

  ngOnDestroy(): void {
    this.stageSubscription.unsubscribe();
    this.adminSubscription.unsubscribe();
    this.roomIdSubscription.unsubscribe();
  }
}
