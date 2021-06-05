import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

/** Component used to display anything from login to registration forms. */
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {
  constructor(private router: Router, private authService: AuthenticationService, private route: ActivatedRoute) {

    console.log(this.route.snapshot.queryParams);
    const initialAction = this.route.snapshot.queryParamMap.get('action');
    if (initialAction == null) {
      this.router.navigate(['/']);
    }
    console.log(initialAction);
    switch (initialAction) {
      case 'login':
        this.authService.attemptLogin();
        this.router.navigate(['/']);
        break;
      case 'logout':
        this.authService.attemptLogout();
        this.router.navigate(['/']);
        break;
    }
  }
}
