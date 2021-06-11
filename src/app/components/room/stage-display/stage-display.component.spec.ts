import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageDisplayComponent } from './stage-display.component';

describe('StageDisplayComponent', () => {
  let component: StageDisplayComponent;
  let fixture: ComponentFixture<StageDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StageDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StageDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
