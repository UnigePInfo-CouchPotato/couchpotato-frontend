import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { AuthenticationService } from './services/authentication/authentication.service';
import { WindowScrollService } from './services/ui-services/window-scroll.service';

/** The root of the application. */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  @HostListener('window:scroll', ['$event'])
  onScroll($event: Event): void {
    this.windowScrollService.updateScrollY(this.getYPosition($event));
  }

  constructor(private windowScrollService: WindowScrollService, private authenticationService: AuthenticationService) { }

  getYPosition(e: Event): number {
    // tslint:disable-next-line: no-string-literal
    return (e.target as Element)['scrollingElement'].scrollTop;
  }
}
