import { Component, ChangeDetectorRef } from '@angular/core';
import { SpinnerService } from 'src/app/services/ui-services/spinner.service';

@Component({
  selector: 'app-horizontal-spinner',
  templateUrl: './horizontal-spinner.component.html',
  styleUrls: ['./horizontal-spinner.component.scss']
})
export class HorizontalSpinnerComponent {
  showSpinner: boolean = false;

  constructor(private spinnerService: SpinnerService, private ref: ChangeDetectorRef) {
    this.spinnerService.spinningListener.subscribe({
      next: (value: boolean) => { this.showSpinner = value; this.ref.markForCheck(); }
    });
  }
}
