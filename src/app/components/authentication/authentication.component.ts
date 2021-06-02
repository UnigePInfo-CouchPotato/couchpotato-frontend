import { Component } from '@angular/core';
import { ActivatedRoute, NavigationBehaviorOptions, NavigationExtras, Router } from '@angular/router';
import { RouterForwarding } from 'src/app/interfaces/router-forwarding';
import { AuthenticationService } from 'src/app/services/authentication.service';

enum DISPLAY {
  LOGIN,
  BOTH,
  REGISTER
}

/** Component used to display anything from login to registration forms. */
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {
  display: DISPLAY = DISPLAY.BOTH;

  constructor(private router: Router, private authService: AuthenticationService) {
    const navData: { [k: string]: any; } = router.getCurrentNavigation().extras.state;
    if (navData != undefined && navData.next != undefined) {
      console.log(navData);
      switch (navData.next) {
        case 'logout':
          // TODO Maybe show a toast ?
          this.authService.attemptLogout().then(
            () => this.router.navigate(['/'])
          );
          break;
        case 'login':
          this.display = DISPLAY.LOGIN;
          this.authService.attemptLogin();
          break;
        case 'register':
          this.display = DISPLAY.REGISTER;
          break;
        default:
          this.display = DISPLAY.BOTH;
      }
    }
    console.log(this.display);
  }
}
