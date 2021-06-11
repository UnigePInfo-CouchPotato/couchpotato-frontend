import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/home/profile/profile.component';
import { AuthenticationGuardService as AuthenticationGuard } from './services/authentication/authentication-guard.service';
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
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
