import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomResultsBufferComponent } from './room-results-buffer.component';

describe('RoomResultsBufferComponent', () => {
  let component: RoomResultsBufferComponent;
  let fixture: ComponentFixture<RoomResultsBufferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomResultsBufferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomResultsBufferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
