import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieDisplayComponent } from './components/movie-display/movie-display.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieDisplayComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'couchpotato-frontend' }),
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
