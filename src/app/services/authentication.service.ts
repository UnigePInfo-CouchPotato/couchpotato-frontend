import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userAuthenticated: boolean = false;
  constructor(private http: HttpClient) { }

  get isAuthenticated(): boolean {
    return this.userAuthenticated;
  }

  attemptRegistration(username: string, email: string, password: string) {
    console.log(`Registration start with username (${username}) and password (${password}) and email (${email})`);
    // this.http.post

    return;
  }

  attemptLogin(username: string, password: string) {
    console.log(`Login start with username (${username}) and password (${password})`);
    // this.http.get(``);

    return;
  }
}
