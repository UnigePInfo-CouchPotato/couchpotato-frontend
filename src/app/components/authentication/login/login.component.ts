import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { passwordValidator } from 'src/app/utils/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formData: FormGroup;

  constructor(private authenticationService: AuthenticationService) {
    this.formData = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        passwordValidator()
      ])
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    this.authenticationService.attemptLogin(this.formData.get('username')?.value, this.formData.get('password')?.value);
  }
}
