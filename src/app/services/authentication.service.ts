import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '../interfaces/user';
import { HttpHeaders } from '@angular/common/http';

/*
CAPTAIN'S LOG:
- Attempt to auto-login. Not an option because considered a "single-page app" and endpoint is default.
*/

/** Service used to authenticate users. */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isUserAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private user$: BehaviorSubject<User> = new BehaviorSubject(null);
  private token$: BehaviorSubject<string> = new BehaviorSubject(null);
  authorizationHeader$: BehaviorSubject<HttpHeaders> = new BehaviorSubject(new HttpHeaders());

  /** Creates an instance of AuthenticationService.
   *
   * @param http The HTTP client to make requests.
   */
  constructor(private spinnerService: SpinnerService, private authNulService: AuthService) {
    this.authNulService.isAuthenticated$.subscribe(
      x => {
        this.isUserAuthenticated$.next(x);
        if (x) {
          this.retrieveUserData();
          this.retrieveToken();
        }
      }
    );

    this.user$.subscribe(
      x => console.dir(x)
    );

    this.token$.subscribe(
      t => this.authorizationHeader$.next(
        new HttpHeaders({
          Authorization: 'Bearer ' + t
        })
      )
    );
  }

  get isUserAuthenticatedObs$(): Observable<boolean> {
    return this.isUserAuthenticated$.asObservable();
  }

  /** Retrieve whether the user is authenticated. */
  get isAuthenticated(): boolean {
    return this.isUserAuthenticated$.value;
  }

  retrieveUserData(): void {
    this.spinnerService.startSpinning();
    this.authNulService.idTokenClaims$.subscribe((u) => {
      if (u != null) {
        this.user$.next(u as unknown as User);
      }
    });
    this.spinnerService.stopSpinning();
  }

  /** Attempts to login a user. */
  attemptLogin(): void {
    this.spinnerService.startSpinning();
    this.authNulService.loginWithPopup({ screen_hint: 'signup' });
    this.spinnerService.stopSpinning();
  }

  retrieveToken(): void {
    this.spinnerService.startSpinning();
    this.authNulService.getAccessTokenSilently().subscribe(
      token => this.token$.next(token)
    );
    this.spinnerService.stopSpinning();
  }

  get authorizationHttpHeader(): HttpHeaders {
    if (this.user$.value != null && this.token$.value != null) {
      return new HttpHeaders({
        Authorization: 'Bearer ' + this.token$.value
      });
    } else {
      return null;
    }
  }

  async attemptLogout(): Promise<void> {
    this.spinnerService.startSpinning();
    this.authNulService.logout();
    this.spinnerService.stopSpinning();
  }
}
