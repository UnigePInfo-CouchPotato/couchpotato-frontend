import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomWaitingRoomComponent } from './room-waiting-room.component';

describe('RoomWaitingRoomComponent', () => {
  let component: RoomWaitingRoomComponent;
  let fixture: ComponentFixture<RoomWaitingRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomWaitingRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomWaitingRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
