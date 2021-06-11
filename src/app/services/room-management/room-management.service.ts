import { GetRoomFinalMovieResponse, StartVoteResponse, VoteResponse } from './../../interfaces/api-responses/responses';
import { CanJoinResponse, CanVoteResponse, CreateRoomResponse, EndJoinResponse, EndVoteResponse, GetRoomMoviesResponse, GetRoomResponse, GetRoomUsersResponse, JoinRoomResponse } from 'src/app/interfaces/api-responses/responses';
import { HttpStatusCode } from 'src/app/interfaces/http-status-code';
import { mockRoomIds } from '../../data/mock-roomids';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { ApiGatewayService } from '../api-gateway/api-gateway.service';
import { Router } from '@angular/router';
import { Room } from 'src/app/interfaces/api-responses/types/room';
import { Movie } from 'src/app/interfaces/api-responses/types/movie';
import { VoteChoices } from 'src/app/interfaces/api-responses/types/vote-choice';

@Injectable({
  providedIn: 'root'
})
export class RoomManagementService {
  roomIds: string[] = mockRoomIds;

  private roomId$: BehaviorSubject<string> = new BehaviorSubject(null);

  roomIdObs$: Observable<string>;

  private isRoomAdmin$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  isRoomAdminObs$: Observable<boolean>;

  private room$: BehaviorSubject<Room> = new BehaviorSubject(null);

  users: string[];
  private results$: BehaviorSubject<Movie[]> = new BehaviorSubject([]);

  resultsObs$: Observable<Movie[]>;

  constructor(private auth: AuthenticationService,
              private apiGateway: ApiGatewayService,
              private router: Router) {
    if (!this.auth.isAuthenticated) {
      this.router.navigateByUrl('/');
    }

    this.roomIdObs$ = this.roomId$.asObservable();
    this.isRoomAdminObs$ = this.isRoomAdmin$.asObservable();
    this.resultsObs$ = this.results$.asObservable();
  }

  async createRoom(): Promise<[HttpStatusCode, CreateRoomResponse]> {
    const response: [HttpStatusCode, CreateRoomResponse] = await this.apiGateway.createRoom();

    if (response[0].value == 201) {
      this.isRoomAdmin$.next(true);
      this.roomId$.next(response[1].data.roomId);

      const responseRoom: Room = await this.getRoom(response[1].data.roomId);

      if (responseRoom != null) {
        this.room$.next(responseRoom);
      }

    }

    return response;
  }

  async joinRoom(roomId: string): Promise<[HttpStatusCode, JoinRoomResponse]> {
    const response: [HttpStatusCode, JoinRoomResponse] = await this.apiGateway.joinRoom(roomId);

    if (response[0].value == 201) {
      const responseRoom: Room = await this.getRoom(roomId);

      if (responseRoom != null) {
        this.roomId$.next(responseRoom.roomId);
        this.room$.next(responseRoom);
        this.isRoomAdmin$.next(responseRoom.roomAdmin.sub == this.auth.user.sub);
      }
    }

    return response;
  }

  async getRoom(roomId: string): Promise<Room> {
    const response: [HttpStatusCode, GetRoomResponse] = await this.apiGateway.getRoom(roomId);

    if (response[0].value == 200) {
      return response[1].data;
    } else {
      return null;
    }
  }

  async endJoin(roomId: string): Promise<[HttpStatusCode, EndJoinResponse]> {
    const response: [HttpStatusCode, EndJoinResponse] = await this.apiGateway.setEndJoin(roomId);

    if (response[0].value == 200) {
      const room: Room = this.room$.value;
      room.usersCanJoin = false;
      this.room$.next(room);
    }

    return response;
  }

  async canJoin(roomId: string): Promise<[HttpStatusCode, CanJoinResponse]> {
    const response: [HttpStatusCode, CanJoinResponse] = await this.apiGateway.getCanJoin(roomId);

    if (response[0].value == 200) {
      const room: Room = this.room$.value;
      room.usersCanJoin = response[1].data.usersCanJoin;
      this.room$.next(room);
    }

    return response;
  }

  async getResults(roomId: string): Promise<[HttpStatusCode, GetRoomMoviesResponse]> {
    const response: [HttpStatusCode, GetRoomMoviesResponse] = await this.apiGateway.getRoomMovies(roomId);

    if (response[0].value == 200) {
      this.results$.next(response[1].data.map(a => ({...a})));
    }

    return response;
  }

  async canVote(roomId: string): Promise<[HttpStatusCode, CanVoteResponse]> {
    const response: [HttpStatusCode, CanVoteResponse] = await this.apiGateway.getCanVote(roomId);

    if (response[0].value == 200) {
      const room: Room = this.room$.value;
      room.usersCanVote = response[1].data.usersCanVote;
      this.room$.next(room);
    }

    return response;
  }

  async startVote(roomId: string): Promise<[HttpStatusCode, StartVoteResponse]> {
    const response: [HttpStatusCode, StartVoteResponse] = await this.apiGateway.setStartVote(roomId);

    if (response[0].value == 200) {
      const room: Room = this.room$.value;
      room.usersCanVote = true;
      this.room$.next(room);
    }

    return response;
  }

  async getFinalMovie(roomId: string): Promise<[HttpStatusCode, GetRoomFinalMovieResponse]> {
    const response: [HttpStatusCode, GetRoomFinalMovieResponse] = await this.apiGateway.getRoomFinalMovie(roomId);

    if (response[0].value == 200) {
      const room: Room = this.room$.value;
      room.usersCanVote = true;
      this.room$.next(room);
    }

    return response;
  }

  async postVote(roomId: string, choices: VoteChoices): Promise<[HttpStatusCode, VoteResponse]> {
    return this.apiGateway.postVotes(roomId, choices);
  }

  async endVote(roomId: string): Promise<[HttpStatusCode, EndVoteResponse]> {
    const response: [HttpStatusCode, EndVoteResponse] = await this.apiGateway.setEndVote(roomId);

    if (response[0].value == 200) {
      const room: Room = this.room$.value;
      room.usersCanVote = false;
      this.room$.next(room);
    }

    return response;
  }

  get roomId(): string { return this.roomId$.value; }

  get isRoomAdmin(): boolean { return this.isRoomAdmin$.value; }

  exitRoom() {

  }
}
