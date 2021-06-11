import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SpinnerService } from '../ui-services/spinner.service';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0User } from '../../interfaces/auth0/auth0-user';
import { HttpHeaders } from '../../interfaces/http-headers';
import { Auth0AccessToken } from '../../interfaces/auth0/auth0-access-token';
import { HttpClient } from '@angular/common/http';
import { Endpoints } from '../../data/endpoints';

import { environment as env } from 'src/environments/environment';
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
  private user$: BehaviorSubject<Auth0User> = new BehaviorSubject(null);

  private accessToken$: BehaviorSubject<Auth0AccessToken> = new BehaviorSubject(null);
  private accessTokenAcquisitionTime: number;

  private token$: BehaviorSubject<string> = new BehaviorSubject(null);

  /** Creates an instance of AuthenticationService.
   *
   * @param http The HTTP client to make requests.
   */
  constructor(private http: HttpClient,
              private spinnerService: SpinnerService,
              private authNulService: AuthService) {
    this.authNulService.isAuthenticated$.subscribe({
      next: x => {
        this.isUserAuthenticated$.next(x);
        if (x) {
          this.retrieveUserData();
          this.retrieveToken();
        } else {
          this.user$.next(null);
          this.token$.next(null);
        }
      }
    });
  }

  get isUserAuthenticatedObs$(): Observable<boolean> {
    return this.isUserAuthenticated$.asObservable();
  }

  get userObs$(): Observable<Auth0User> {
    return this.user$.asObservable();
  }

  get user(): Auth0User {
    return this.user$.value;
  }

  /** Retrieve whether the user is authenticated. */
  get isAuthenticated(): boolean {
    return this.isUserAuthenticated$.value;
  }

  retrieveUserData(): void {
    this.spinnerService.startSpinning();
    this.authNulService.idTokenClaims$.subscribe({
      next: u => {
        if (u != null) {
          this.user$.next(u as unknown as Auth0User);
        }
      }
    });
    this.spinnerService.stopSpinning();
  }

  /** Attempts to login a user. */
  attemptLogin(): void {
    this.spinnerService.startSpinning();
    this.authNulService.loginWithPopup({ prompt: 'login' });
    this.spinnerService.stopSpinning();
  }

  /** Attempts to register a user. */
  attemptSignup(): void {
    this.spinnerService.startSpinning();
    this.authNulService.loginWithPopup({ screen_hint: 'signup' });
    this.spinnerService.stopSpinning();
  }

  private retrieveToken(): void {
    this.spinnerService.startSpinning();
    this.authNulService.getAccessTokenSilently().subscribe({
      next: token => this.token$.next(token)
    });
    this.spinnerService.stopSpinning();
  }

  get authorizationHttpHeader(): HttpHeaders {
    if (this.user$.value != null && this.token$.value != null) {
      return {
        Authorization: 'Bearer ' + this.token$.value
      };
    } else {
      return null;
    }
  }

  async attemptLogout(): Promise<void> {
    this.spinnerService.startSpinning();
    this.authNulService.logout();
    this.spinnerService.stopSpinning();
  }

  get preferences(): number[] {
    return this.user$.value?.['https://pinfo2.unige.ch/metadata']?.preferences ?? [];
  }

  async retrieveAccessToken(): Promise<Auth0AccessToken> {
    // Hard block on authentication failure.
    if (this.isAuthenticated) {
      // If the token has not been acquired or has expired.
      if (this.accessToken$.value == null ||
          (this.accessTokenAcquisitionTime != null &&
            this.accessTokenAcquisitionTime + (this.accessToken$.value?.expires_in ?? 0) < (Date.now() / 1000))) {
        // Acquire the token from the "middleware".
        const accessToken: Auth0AccessToken = await this.http.post(
          Endpoints.AUTH0_GET_MGMT_TOKEN(),
          {
            audience: env.auth0Mgmt.middlewareAudience,
            client_id: env.auth0Mgmt.middlewareClientId,
            client_secret: env.auth0Mgmt.middlewareCS,
            grant_type: env.auth0Mgmt.middlewareGT
          },
          {
            headers: this.authorizationHttpHeader
          }
        ).toPromise().then((a: Auth0AccessToken) => a);

        this.accessToken$.next(accessToken);
        this.accessTokenAcquisitionTime = Date.now() / 1000;
        return accessToken;
      // If the token has previously been acquired but has not expired, return the unexpired one
      // (avoids unnecessary calls, and limits rate-limiting!)
      } else if (this.accessTokenAcquisitionTime != null &&
        this.accessTokenAcquisitionTime + this.accessToken$.value?.expires_in > (Date.now() / 1000)) {
        return this.accessToken$.value;
      }
    }
    // If the function hasn't exited then return null.
    return null;
  }
}
