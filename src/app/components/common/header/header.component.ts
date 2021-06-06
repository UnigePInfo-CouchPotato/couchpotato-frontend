import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
  constructor(private router: Router, private auth: AuthenticationService) { }

  /** Initialises the component. */
  ngOnInit(): void {
    this.auth.isUserAuthenticatedObs$.subscribe({
      next: (v: boolean) => this.authenticated = v
    });
  }

  get profileButtonWidth() {
    return document.getElementById('profileButton').getBoundingClientRect().width;
  }

  get profileButtonVerticalOffset() {
    const dimensions: DOMRect = document.getElementById('profileButton').getBoundingClientRect();
    return dimensions.top + dimensions.height;
  }

  goToLoginRegister(): void {
    this.router.navigateByUrl('/authentication?action=login');
  }

  goToLogout(): void {
    this.router.navigateByUrl('/authentication?action=logout');
  }

  setProfileInfoShown(value: boolean) {
    this.profileInfoShown = value;
  }
}
