import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  loginSelected: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  set selected(isLogin: boolean) {
    this.loginSelected = isLogin;
  }
}
