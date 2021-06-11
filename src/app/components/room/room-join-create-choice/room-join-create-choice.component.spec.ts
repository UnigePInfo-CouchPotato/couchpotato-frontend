import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomJoinCreateChoiceComponent } from './room-join-create-choice.component';

describe('RoomJoinCreateChoiceComponent', () => {
  let component: RoomJoinCreateChoiceComponent;
  let fixture: ComponentFixture<RoomJoinCreateChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomJoinCreateChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomJoinCreateChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
