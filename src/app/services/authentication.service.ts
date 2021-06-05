import { HttpClient } from '@angular/common/http';
import { Injectable, AfterViewInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { AuthService } from '@auth0/auth0-angular';

/** Service used to authenticate users. */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  /** Whether the user is authenticated. */
  private isUserAuthenticated: boolean = false;

  isUserAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(this.isUserAuthenticated);

  /** Creates an instance of AuthenticationService.
   *
   * @param http The HTTP client to make requests.
   */
  constructor(private http: HttpClient, private spinnerService: SpinnerService, private authNulService: AuthService) {
    /*this.authNulService.getAccessTokenSilently().subscribe(
      console.log
    );*/
    this.authNulService.isAuthenticated$.subscribe(
      x => { this.isUserAuthenticated$.next(x); }
    );
    this.isUserAuthenticated$.subscribe(x => {
      this.isUserAuthenticated = x;
      console.log(this.isUserAuthenticated);
    });
  }

  /** Retrieve whether the user is authenticated. */
  get isAuthenticated(): boolean {
    return this.isUserAuthenticated;
  }

  /** Attempts to register a new user. */
  attemptRegistration(username: string, email: string, password: string) {
    console.log(`Registration start with username (${username}) and password (${password}) and email (${email})`);
    // this.http.post

    return;
  }

  /** Attempts to login a user. */
  attemptLogin(): void {
    // TODO Does not work
    this.authNulService.loginWithPopup({ screen_hint: 'signup' });
    // this.http.get(``);

    return;
  }

  async attemptLogout(): Promise<void> {
    this.spinnerService.startSpinning();
    this.authNulService.logout();
    this.spinnerService.stopSpinning();
  }

  // TODO Remove
  toggleLoggedInDebugFn() {
    this.authNulService.user$.subscribe(x => console.dir(x));
    this.authNulService.idTokenClaims$.subscribe(x => console.dir(x));

  }

  printVal() {
    console.log(this.isUserAuthenticated);
    console.log(localStorage.getItem('token'));
  }
}
