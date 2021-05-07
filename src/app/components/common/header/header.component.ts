import { Router, Event, RouterEvent } from '@angular/router';
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
  /** What page is currently loaded, used to highlight the navbar. */
  currentPath: string = '/home';

  authenticated: boolean = false;

  /**
   * Creates an instance of HeaderComponent.
   *
   * @param router The Router to observe the url path from.
   */
  constructor(private router: Router, private auth: AuthenticationService) { }

  /** Initialises the component. */
  ngOnInit(): void {
    this.authenticated = this.auth.isAuthenticated;
    this.auth.userAuthenticated.subscribe({
      next: (v: boolean) => this.authenticated = v
    });
    this.router.events.subscribe((event: Event) => {
      if (event instanceof RouterEvent) {
        this.currentPath = event.url;
      }
    });
  }

  // TODO Remove
  toggleAuthDebug() {
    this.auth.toggleLoggedInDebugFn();
  }

  logout() {
    this.auth.attemptLogout();
  }
}
