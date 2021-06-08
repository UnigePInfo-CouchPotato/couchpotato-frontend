import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Endpoints } from '../data/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ApiGatewayService {
  private genres: BehaviorSubject<string> = new BehaviorSubject('');

  get amendedAuthorizationHttpHeaders(): HttpHeaders {
    return this.auth.authorizationHttpHeader.append('Access-Control-Allow-Origin', '*');
  }

  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.auth.isUserAuthenticatedObs$.subscribe(
      (status: boolean) => {
        if (status) {
          this.http.get(
            Endpoints.RECOMMENDATION_GENRES,
            //{ headers: new HttpHeaders }
          ).subscribe(x => { console.log('Genres'); console.dir(x); });
        } else { }
      }
    )
  }
}
