// tslint:disable: no-empty-interface
import { Auth0UserLimited } from '../auth0/auth0-user-limited';
import { GenericDataErrorResponse } from './generic-data-error-response';
import { GenericMessageErrorResponse } from './generic-message-error-response';
import { Room } from './types/room';
import { Movie } from './types/movie';

/** 02 */
export interface JoinRoomResponse extends GenericMessageErrorResponse {}
/** 03 */
export interface CloseRoomResponse extends GenericMessageErrorResponse {}
/** 04 */
export interface DeleteRoomResponse extends GenericMessageErrorResponse {}
/** 11 */
export interface VoteResponse extends GenericMessageErrorResponse {}
/** 13 */
export interface EndVoteResponse extends GenericMessageErrorResponse {}
/** 14 */
export interface EndJoinResponse extends GenericMessageErrorResponse {}
/** 13 */
export interface StartVoteResponse extends GenericMessageErrorResponse {}

/** 01 */
export interface CreateRoomResponse extends GenericDataErrorResponse<{ roomId: string }> {}
/** 05 */
export interface IsRoomAdminResponse extends GenericDataErrorResponse<{ isRoomAdmin: boolean }> {}
/** 06 */
export interface RoomExistsResponse extends GenericDataErrorResponse<{ exists: boolean }> {}
/** 07 */
export interface GetRoomResponse extends GenericDataErrorResponse<Room> {}
/** 08 */
export interface GetRoomUsersResponse extends GenericDataErrorResponse<string[]> {}
/** 09 */
export interface GetRoomAdminResponse extends GenericDataErrorResponse<Auth0UserLimited> {}
/** 10 */
export interface GetRoomMoviesResponse extends GenericDataErrorResponse<Movie[]> {}
/** 12 */
export interface GetRoomFinalMovieResponse extends GenericDataErrorResponse<Movie> {}

/** 15 */
export interface CanVoteResponse extends GenericDataErrorResponse<{ usersCanVote: boolean }> {}
/** 16 */
export interface CanJoinResponse extends GenericDataErrorResponse<{ usersCanJoin: boolean }> {}
