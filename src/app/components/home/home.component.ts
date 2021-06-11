import { WindowScrollService } from '../../services/ui-services/window-scroll.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

/** Component used to create rooms or join them. */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userAuthenticated: boolean = false;

  showButton: boolean = false;

  showError: boolean = false;

  info: BehaviorSubject<object> = new BehaviorSubject(null);

  /** Creates an instance of HomeComponent. */
  constructor(private authService: AuthenticationService,
              private scrollService: WindowScrollService,
              private ref: ChangeDetectorRef,
              private router: Router) { }

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

  goToRooms(): void {
    if (this.authService.preferences.length == 0) {
      this.showError = true;
    } else {
      this.router.navigateByUrl('/room');
    }
  }

  goToLogin(): void {
    this.router.navigateByUrl('/authentication?action=login');
  }

  goToRegister(): void {
    this.router.navigateByUrl('/authentication?action=register');
  }
}
