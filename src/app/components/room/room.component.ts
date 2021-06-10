import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { RoomManagementService } from 'src/app/services/room-management/room-management.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  stage$: BehaviorSubject<number> = new BehaviorSubject(0);
  stage: number = 0;
  roomId: string;

  /** The form data */
  formDataRoomId: FormGroup;

  constructor(private roomService: RoomManagementService,
              private formBuilder: FormBuilder,
              private ref: ChangeDetectorRef) {
    this.stage$.subscribe({
      next: (value: number) => {
        this.stage = value;
        this.ref.markForCheck();
      }
    });
  }

  ngOnInit(): void {
    this.formDataRoomId = this.formBuilder.group({
      roomId: new FormControl('', [
        Validators.required,
        Validators.maxLength(5),
        Validators.minLength(5),
        Validators.pattern(/^[0-9A-Z]*$/)
      ])
    });
  }

  onFormRoomIdSubmit() {
    if (this.formDataRoomId.valid) {
      this.roomId = this.formDataRoomId.get('roomId').value;
      this.setStage(3);
    }
  }

  setStage(stageNumber: number) {
    this.stage = stageNumber;
    if (this.stage == 1) {
      this.roomService.createRoom();
      this.roomId = this.roomService.roomId;
    }
  }

  get isRoomOwner() {
    return this.roomService.isRoomAdmin;
  }
}
