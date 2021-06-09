import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { Endpoints } from '../data/endpoints';
import { MovieGenre, MovieGenreResponse } from '../interfaces/movie-genre';

@Injectable({
  providedIn: 'root'
})
export class ApiGatewayService {
  private genres: BehaviorSubject<MovieGenre[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.auth.isUserAuthenticatedObs$.subscribe(
      (status: boolean) => {
        if (status) {
          this.http.get(
            Endpoints.RECOMMENDATION_GENRES(),
            {
              headers: this.auth.authorizationHttpHeader,
            }
          ).subscribe({
            next: (m: MovieGenreResponse) => this.genres.next(m.genres)
          });
        }
      }
    );
  }

  get movieGenres(): MovieGenre[] {
    return this.genres.value;
  }

  async updateUserPreferences(preferences: MovieGenre[]): Promise<boolean> {
    if (this.auth.isAuthenticated) {
      const accessToken = await this.auth.retrieveAccessToken();
      console.log(accessToken);
      this.http.get(
        Endpoints.AUTH0_MANAGE_METADATA(this.auth.user.sub),
        {
          headers: {
            Authorization: `Bearer ${accessToken.access_token}`
          }
        }
      ).subscribe({
        next: x => console.dir(x)
      });
      return true;
    } else {
      return false;
    }
  }
}
