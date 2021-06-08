import { HttpClient } from '@angular/common/http';
import { WindowScrollService } from './../../services/window-scroll.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BehaviorSubject } from 'rxjs';

/** Component used to create rooms or join them. */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userAuthenticated: boolean = false;
  showButton: boolean = false;

  info: BehaviorSubject<object> = new BehaviorSubject(null);

  /** Creates an instance of HomeComponent. */
  constructor(private authService: AuthenticationService,
              private scrollService: WindowScrollService,
              private http: HttpClient) { }

  /** On instance. */
  ngOnInit(): void {
    this.authService.isUserAuthenticatedObs$.subscribe(
      (auth: boolean) => { console.log('Home alerted' + auth); this.userAuthenticated = auth; }
    );
    this.scrollService.scrollY$.subscribe((newY: number) => this.showButton = newY > 50);
  }

  // TODO remove
  getUserInfo(): void {
    this.http.get(
      'https://couchpotato.eu.auth0.com/v2/userinfo',
      {
        headers: this.authService.authorizationHttpHeader
      }
    ).subscribe(x => console.log(x));
  }

  /** Force the page to scroll back to the top. */
  scrollToTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
