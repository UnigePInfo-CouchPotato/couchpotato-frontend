import { Router, Event, RouterEvent } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SpinnerService } from 'src/app/services/spinner.service';

/**
 * The header element of the page.
 *
 * @export
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  profileButton: HTMLElement;

  authenticated: boolean = false;

  profileInfoShown: boolean = false;

  // TODO Remove
  private spin = false;

  /**
   * Creates an instance of HeaderComponent.
   *
   * @param router The Router to observe the url path from.
   */
  constructor(private router: Router, private auth: AuthenticationService, private spinner: SpinnerService) { }

  /** Initialises the component. */
  ngOnInit(): void {
    this.authenticated = this.auth.isAuthenticated;
    this.auth.isUserAuthenticated$.subscribe({
      next: (v: boolean) => this.authenticated = v
    });
  }

  // TODO Remove
  toggleAuthDebug() {
    this.auth.toggleLoggedInDebugFn();
  }

  get profileButtonWidth() {
    return document.getElementById('profileButton').getBoundingClientRect().width;
  }

  get profileButtonVerticalOffset() {
    const dimensions: DOMRect = document.getElementById('profileButton').getBoundingClientRect();
    return dimensions.top + dimensions.height;
  }

  // TODO Remove
  toggleAnim() {
    if (!this.spin) {
      this.spinner.startSpinning();
      this.spin = !this.spin;
    } else {
      this.spinner.stopSpinning();
      this.spin = !this.spin;

    }
  }

  logout() {
    this.auth.attemptLogout();
  }

  goToLoginRegister(): void {
    this.router.navigate(['authentication'], { state: { next: 'login' } });
  }

  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  goToLogout(): void {
    this.router.navigate(['authentication'], { state: { next: 'logout' } });
  }

  setProfileInfoShown(value: boolean) {
    this.profileInfoShown = value;
  }
}
