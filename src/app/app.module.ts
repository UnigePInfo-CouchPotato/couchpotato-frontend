import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MovieDisplayComponent } from './components/room/movie-display/movie-display.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { HomeComponent } from './components/home/home.component';
import { MainBodyComponent } from './components/common/main-body/main-body.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/common/header/header.component';
import { ProfileComponent } from './components/home/profile/profile.component';
import { AuthenticationService } from './services/authentication/authentication.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { RoomComponent } from './components/room/room.component';
import { HorizontalSpinnerComponent } from './components/common/horizontal-spinner/horizontal-spinner.component';

import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { environment as env } from 'src/environments/environment';
import { RoomJoinCreateChoiceComponent } from './components/room/room-join-create-choice/room-join-create-choice.component';
import { RoomMainComponent } from './components/room/room-main/room-main.component';
import { StageDisplayComponent } from './components/room/stage-display/stage-display.component';
import { RoomWaitingRoomComponent } from './components/room/room-waiting-room/room-waiting-room.component';
import { RoomResultsBufferComponent } from './components/room/room-results-buffer/room-results-buffer.component';
import { MovieVoteComponent } from './components/room/movie-vote/movie-vote.component';
import { MovieFinalBufferComponent } from './components/room/movie-final-buffer/movie-final-buffer.component';
import { MovieFinalViewComponent } from './components/room/movie-final-view/movie-final-view.component';
@NgModule({
  declarations: [
    AppComponent,
    MovieDisplayComponent,
    AuthenticationComponent,
    HomeComponent,
    MainBodyComponent,
    HeaderComponent,
    ProfileComponent,
    RoomComponent,
    HorizontalSpinnerComponent,
    RoomJoinCreateChoiceComponent,
    RoomMainComponent,
    StageDisplayComponent,
    RoomWaitingRoomComponent,
    RoomResultsBufferComponent,
    MovieVoteComponent,
    MovieFinalBufferComponent,
    MovieFinalViewComponent
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
      ...env.auth0,
      httpInterceptor: {
        ...env.httpInterceptor,
      },
    })
  ],
  providers: [
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
