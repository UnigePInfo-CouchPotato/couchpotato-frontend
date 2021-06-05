import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '../interfaces/user';

/*
CAPTAIN'S LOG:
- Attempt to auto-login. Not an option because considered a "single-page app" and endpoint is default.
*/

/** Service used to authenticate users. */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  /** Whether the user is authenticated. */
  private isUserAuthenticated: boolean = false;

  isUserAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(this.isUserAuthenticated);
  user$: BehaviorSubject<User> = new BehaviorSubject(null);

  /** Creates an instance of AuthenticationService.
   *
   * @param http The HTTP client to make requests.
   */
  constructor(private spinnerService: SpinnerService, private authNulService: AuthService) {

    this.authNulService.isAuthenticated$.subscribe(
      x => {
        this.isUserAuthenticated$.next(x);
        this.isUserAuthenticated = x;
      }
    );

    this.user$.subscribe(
      x => console.dir(x)
    );
  }

  /** Retrieve whether the user is authenticated. */
  get isAuthenticated(): boolean {
    return this.isUserAuthenticated;
  }

  retrieveUserData(): void {
    this.authNulService.idTokenClaims$.subscribe((u) => {
      if (u != null) {
        this.user$.next(u as unknown as User);
      }
    });
  }

  /** Attempts to login a user. */
  attemptLogin(): void {
    this.spinnerService.startSpinning();
    this.authNulService.loginWithRedirect({ screen_hint: 'signup' });
    this.retrieveUserData();
    this.spinnerService.stopSpinning();
  }

  async attemptLogout(): Promise<void> {
    this.spinnerService.startSpinning();
    this.authNulService.logout();
    this.spinnerService.stopSpinning();
  }
}
