import { CanJoinResponse, CanVoteResponse, EndJoinResponse, EndVoteResponse, GetRoomAdminResponse, GetRoomFinalMovieResponse, GetRoomMoviesResponse, GetRoomResponse, GetRoomUsersResponse, RoomExistsResponse, StartVoteResponse, VoteResponse } from '../../interfaces/api-responses/responses';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Endpoints } from '../../data/endpoints';
import { MovieGenre, MovieGenreResponse } from '../../interfaces/movie-genre';
import { HttpHeaders } from 'src/app/interfaces/http-headers';
import { HttpStatusCode, HttpStatusCodes } from 'src/app/interfaces/http-status-code';
import { CloseRoomResponse, DeleteRoomResponse, JoinRoomResponse, IsRoomAdminResponse, CreateRoomResponse } from 'src/app/interfaces/api-responses/responses';
import { VoteChoices } from 'src/app/interfaces/api-responses/types/vote-choice';
import { SpinnerService } from '../ui-services/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class ApiGatewayService {
  private genres: BehaviorSubject<MovieGenre[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient,
              private auth: AuthenticationService,
              private spinner: SpinnerService) {
    this.spinner.startSpinning();
    this.auth.isUserAuthenticatedObs$.subscribe(
      (status: boolean) => {
        if (status) {
          this.http.get(
            Endpoints.RECOMMENDATION_GENRES(),
            {
              headers: this.auth.authorizationHttpHeader,
            }
          ).subscribe({
            next: (m: MovieGenreResponse) => { this.genres.next(m.genres); this.spinner.stopSpinning(); }
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
      this.spinner.startSpinning();
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
      ).toPromise()
      .then(response => { this.spinner.stopSpinning(); return response.status == 200; });
    } else {
      return false;
    }
  }

  private async getResponse<T>(resource: string): Promise<[HttpStatusCode, T]> {
    this.spinner.startSpinning();
    const header: HttpHeaders = this.auth.authorizationHttpHeader;

    const response: HttpResponse<object> = await this.http.get(
      resource,
      {
        headers: header,
        observe: 'response'
      }
    ).toPromise()
    .then(
      (value: HttpResponse<object>) => value,
      (e: HttpResponse<object>) => { console.log(e); return e; }
    );

    let result: T;
    if (response.status == 401) {
      result = { error: 'User is not authorized to perform this action' } as unknown as T;
    } else if (response.status < 200 || response.status >= 300) {
      result = { error: response['error'].error } as unknown as T;
    } else {
      result = response.body as unknown as T;
    }

    console.dir(result);
    this.spinner.stopSpinning();
    return [{ name: HttpStatusCodes.rget(response.status), value: response.status }, result];
  }

  /** 01 */
  async createRoom(): Promise<[HttpStatusCode, CreateRoomResponse]> {
    return this.getResponse<CreateRoomResponse>(Endpoints.ROOM_CREATE());
  }

  /** 02 */
  async joinRoom(roomId: string): Promise<[HttpStatusCode, JoinRoomResponse]> {
    return this.getResponse<JoinRoomResponse>(Endpoints.ROOM_JOIN(roomId));
  }

  /** 03 */
  async closeRoom(roomId: string): Promise<[HttpStatusCode, CloseRoomResponse]> {
    return this.getResponse<CloseRoomResponse>(Endpoints.ROOM_CLOSE(roomId));
  }

  /** 04 */
  async deleteRoom(roomId: string): Promise<[HttpStatusCode, DeleteRoomResponse]> {
    return this.getResponse<DeleteRoomResponse>(Endpoints.ROOM_DELETE(roomId));
  }

  /** 05 */
  async getIsRoomAdmin(roomId: string): Promise<[HttpStatusCode, IsRoomAdminResponse]> {
    return this.getResponse<IsRoomAdminResponse>(Endpoints.ROOM_IS_USER_ADMIN(roomId));
  }

  /** 06 */
  async getRoomExists(roomId: string): Promise<[HttpStatusCode, RoomExistsResponse]> {
    return this.getResponse<RoomExistsResponse>(Endpoints.ROOM_EXISTS(roomId));
  }

  /** 07 */
  async getRoom(roomId: string): Promise<[HttpStatusCode, GetRoomResponse]> {
    return this.getResponse<GetRoomResponse>(Endpoints.ROOM_GET(roomId));
  }

  /** 08 */
  async getRoomUsers(roomId: string): Promise<[HttpStatusCode, GetRoomUsersResponse]> {
    return this.getResponse<GetRoomUsersResponse>(Endpoints.ROOM_GET_USERS(roomId));
  }

  /** 09 */
  async getRoomAdmin(roomId: string): Promise<[HttpStatusCode, GetRoomAdminResponse]> {
    return this.getResponse<GetRoomAdminResponse>(Endpoints.ROOM_GET_ADMIN(roomId));
  }

  /** 10 */
  async getRoomMovies(roomId: string): Promise<[HttpStatusCode, GetRoomMoviesResponse]> {
    return this.getResponse<GetRoomMoviesResponse>(Endpoints.ROOM_GET_RESULTS(roomId));
  }

  /** 11 Vote */
  async postVotes(roomId: string, choice: VoteChoices): Promise<[HttpStatusCode, VoteResponse]> {
    this.spinner.startSpinning();
    const header: HttpHeaders = this.auth.authorizationHttpHeader;
    header['Content-Type'] = 'application/json';
    const response: HttpResponse<object> = await this.http.post(
      Endpoints.ROOM_POST_VOTE(),
      {
        roomId,
        choice
      },
      {
        headers: header,
        observe: 'response'
      }
    ).toPromise();

    let result: VoteResponse;
    if (response.status == 401) {
      result = { error: 'User is not authorized to perform this action' } as unknown as VoteResponse;
    } else if (response.status < 200 || response.status >= 300) {
      result = { error: (response as unknown as HttpErrorResponse).error.error } as unknown as VoteResponse;
    } else {
      result = response.body as unknown as VoteResponse;
    }

    console.dir(result);
    this.spinner.stopSpinning();
    return [{ name: HttpStatusCodes.rget(response.status), value: response.status }, result];
  }

  /** 12 */
  async getRoomFinalMovie(roomId: string): Promise<[HttpStatusCode, GetRoomFinalMovieResponse]> {
    return this.getResponse<GetRoomFinalMovieResponse>(Endpoints.ROOM_GET_FINAL(roomId));
  }

  /** 13 */
  async setEndVote(roomId: string): Promise<[HttpStatusCode, EndVoteResponse]> {
    return this.getResponse<EndVoteResponse>(Endpoints.ROOM_END_VOTE(roomId));
  }

  /** 14 */
  async setEndJoin(roomId: string): Promise<[HttpStatusCode, EndJoinResponse]> {
    return this.getResponse<EndJoinResponse>(Endpoints.ROOM_END_JOIN(roomId));
  }

  /** 15 */
  async getCanVote(roomId: string): Promise<[HttpStatusCode, CanVoteResponse]> {
    return this.getResponse<CanVoteResponse>(Endpoints.ROOM_CAN_VOTE(roomId));
  }

  /** 16 */
  async getCanJoin(roomId: string): Promise<[HttpStatusCode, CanJoinResponse]> {
    return this.getResponse<CanJoinResponse>(Endpoints.ROOM_CAN_JOIN(roomId));
  }

  /** 17 */
  async setStartVote(roomId: string): Promise<[HttpStatusCode, StartVoteResponse]> {
    return this.getResponse<StartVoteResponse>(Endpoints.ROOM_START_VOTE(roomId));
  }
}
