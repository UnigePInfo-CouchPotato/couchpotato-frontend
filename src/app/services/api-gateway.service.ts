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

  /** Update a user's preferences. Returns whether or not the update was successful.
   *
   * @param preferences The current of genre id's set as "preferences" by the user.
   */
  async updateUserPreferences(preferences: MovieGenre[]): Promise<boolean> {
    if (this.auth.isAuthenticated) {
      const accessToken = await this.auth.retrieveAccessToken();
      return this.http.patch(
        Endpoints.AUTH0_MANAGE_METADATA(this.auth.user.sub),
        {
          user_metadata: {
            preferences: preferences.map(x => x.id)
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken.access_token}`
          },
          observe: 'response'
        }
      ).toPromise().then(response => response.status == 200);
    } else {
      return false;
    }
  }
}
