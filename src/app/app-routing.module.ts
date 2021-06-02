import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthenticationGuardService as AuthenticationGuard } from './services/authentication-guard.service';
import { ReverseAuthenticationGuard } from './services/reverse-authentication-guard.service';
import { RoomComponent } from './components/room/room.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';

/** List of routes for the application. */
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'room',
    component: RoomComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'authentication',
    component: AuthenticationComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ReverseAuthenticationGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [ReverseAuthenticationGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
