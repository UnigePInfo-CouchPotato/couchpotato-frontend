import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalSpinnerComponent } from './horizontal-spinner.component';

describe('HorizontalSpinnerComponent', () => {
  let component: HorizontalSpinnerComponent;
  let fixture: ComponentFixture<HorizontalSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
