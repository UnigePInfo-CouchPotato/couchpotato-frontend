import { WindowScrollService } from './../../services/window-scroll.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
              private ref: ChangeDetectorRef) { }

  /** On instantiation. */
  ngOnInit(): void {
    this.authService.isUserAuthenticatedObs$.subscribe({
      next: (auth: boolean) => {
        this.userAuthenticated = auth;
        if (auth) {
          this.ref.markForCheck();
        }
      }
    });
    this.scrollService.scrollY$.subscribe({
      next: (newY: number) => this.showButton = newY > 50
    });
  }

  /** Force the page to scroll back to the top. */
  scrollToTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
