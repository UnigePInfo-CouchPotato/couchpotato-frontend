import { WindowScrollService } from './../../services/window-scroll.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

/** Component used to create rooms or join them. */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', './home.animations.scss']
})
export class HomeComponent implements OnInit {
  userAuthenticated: boolean;
  showButton: boolean = false;

  /** Creates an instance of HomeComponent. */
  constructor(private authService: AuthenticationService, private scrollService: WindowScrollService) { }

  /** On instance. */
  ngOnInit(): void {
    this.userAuthenticated = this.authService.isAuthenticated;
    this.authService.isUserAuthenticated$.subscribe((auth: boolean) => this.userAuthenticated = auth);
    this.scrollService.scrollY$.subscribe((newY: number) => this.showButton = newY > 50);
  }

  scrollToTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
