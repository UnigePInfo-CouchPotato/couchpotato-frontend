import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieDisplayComponent } from './components/movie-display/movie-display.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MainBodyComponent } from './components/common/main-body/main-body.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/common/header/header.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthenticationService } from './services/authentication.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { RoomComponent } from './components/room/room.component';
import { HorizontalSpinnerComponent } from './components/common/horizontal-spinner/horizontal-spinner.component';

import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from 'src/environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    MovieDisplayComponent,
    AuthenticationComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MainBodyComponent,
    HeaderComponent,
    ProfileComponent,
    RoomComponent,
    HorizontalSpinnerComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'couchpotato-frontend' }),
    HttpClientModule,
    AppRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AnimateOnScrollModule.forRoot(),
    AuthModule.forRoot({
      ...env.auth0
    })
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    console.log(env.production);
  }
}
