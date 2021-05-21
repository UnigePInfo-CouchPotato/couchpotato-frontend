import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-horizontal-spinner',
  templateUrl: './horizontal-spinner.component.html',
  styleUrls: ['./horizontal-spinner.component.scss']
})
export class HorizontalSpinnerComponent {
  showSpinner: boolean = false;

  constructor(private spinnerService: SpinnerService) {
    this.spinnerService.spinningListener.subscribe((value: boolean) => this.showSpinner = value);
  }
}
