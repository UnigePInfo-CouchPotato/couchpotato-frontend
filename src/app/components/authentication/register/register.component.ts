import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { passwordValidator } from 'src/app/utils/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ])
    });
  }
  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authenticationService.attemptRegistration(this.formData.get('username')?.value,
          this.formData.get('email')?.value,
          this.formData.get('password')?.value);
  }

}
