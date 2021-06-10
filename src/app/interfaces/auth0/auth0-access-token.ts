export interface Auth0AccessToken {
  access_token: string;
  scope: string;
  expires_in: number;
  token_type: string;
}
