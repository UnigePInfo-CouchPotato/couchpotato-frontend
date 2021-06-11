import { Auth0UserLimited } from "../../auth0/auth0-user-limited";

export interface Room {
  movies: string;
  numberOfMovies: number;
  usersCanJoin: boolean;
  roomClosed: boolean;
  roomAdmin: Auth0UserLimited;
  userPreferences: string[];
  usersCanVote: boolean;
  roomId: string;
}
