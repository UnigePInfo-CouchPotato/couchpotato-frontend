import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Endpoints } from '../../data/endpoints';
import { MovieGenre, MovieGenreResponse } from '../../interfaces/movie-genre';
import { HttpHeaders } from 'src/app/interfaces/http-headers';
import { CreateRoomResponse } from 'src/app/interfaces/api-responses/create-room-response';
import { HttpStatusCode, httpStatusCodeFromValue } from 'src/app/interfaces/http-status-code.enum';
import { CloseRoomResponse, DeleteRoomResponse, JoinRoomResponse, IsRoomAdminResponse } from 'src/app/interfaces/api-responses/message-error-responses';

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

  private async getResponse<T>(resource: string): Promise<[HttpStatusCode, T]> {
    const header: HttpHeaders = this.auth.authorizationHttpHeader;
    const response: HttpResponse<object> = await this.http.get(
      resource,
      {
        headers: header,
        observe: 'response'
      }
    ).toPromise();

    const result: T = (response.status == 401 ? { error: 'User is not authorized to perform this action'} : response.body) as unknown as T;

    return [httpStatusCodeFromValue(response.status), result];
  }

  async createRoom(): Promise<[HttpStatusCode, CreateRoomResponse]> {
    return this.getResponse<CreateRoomResponse>(Endpoints.ROOM_CREATE());
  }

  async joinRoom(roomId: string): Promise<[HttpStatusCode, JoinRoomResponse]> {
    return this.getResponse<JoinRoomResponse>(Endpoints.ROOM_GET(roomId));
  }

  async closeRoom(roomId: string): Promise<[HttpStatusCode, CloseRoomResponse]> {
    return this.getResponse<CloseRoomResponse>(Endpoints.ROOM_CLOSE(roomId));
  }

  async deleteRoom(roomId: string): Promise<[HttpStatusCode, DeleteRoomResponse]> {
    return this.getResponse<DeleteRoomResponse>(Endpoints.ROOM_DELETE(roomId));
  }

  async getIsRoomAdmin(roomId: string): Promise<[HttpStatusCode, IsRoomAdminResponse]> {
    return this.getResponse<IsRoomAdminResponse>(Endpoints.ROOM_IS_USER_ADMIN(roomId));
  }

  async getRooms(): Promise<string> {
    const header: HttpHeaders = await this.auth.authorizationHttpHeader;
    const response: HttpResponse<object> = await this.http.get(
      Endpoints.ROOM_ALL(),
      {
        headers: header,
        observe: 'response'
      }
    ).toPromise();

    console.log(response);
    return '';
  }
}
