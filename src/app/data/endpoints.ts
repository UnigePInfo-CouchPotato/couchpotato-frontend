import { environment as env } from 'src/environments/environment';

export const Endpoints = {
  AUTH0_MANAGE_METADATA: (userId: string) => `https://${env.auth0.domain}/api/v2/users/${userId}`,
  AUTH0_GET_MGMT_TOKEN: () => 'https://couchpotato.eu.auth0.com/oauth/token',
  RECOMMENDATION_GENRES: () => env.api_recommendations + '/genres',
  ROOM_ALL: () => env.api_rooms + '/all',
  ROOM_CREATE: () => env.api_rooms + '/create',
  ROOM_JOIN: () => env.api_rooms + '/join?roomId=${roomId}',
  ROOM_CLOSE: (roomId: string) => env.api_rooms + `/close?roomId=${roomId}`,
  ROOM_DELETE: (roomId: string) => env.api_rooms + `/delete?roomId=${roomId}`,
  ROOM_IS_USER_ADMIN: (roomId: string) => env.api_rooms + `/is-room-admin?roomId=${roomId}`,
  ROOM_EXISTS: (roomId: string) => env.api_rooms + `/exists?roomId=${roomId}`,
  ROOM_GET: (roomId: string) => env.api_rooms + `/?${roomId}`,
  ROOM_GET_USERS: (roomId: string) => env.api_rooms + `/users?roomId=${roomId}`,
  ROOM_GET_ADMIN: (roomId: string) => env.api_rooms + `/admin?roomId=${roomId}`,
};
