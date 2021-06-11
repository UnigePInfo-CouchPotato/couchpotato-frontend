export interface Auth0Token {
  aud: string;
  email: string;
  email_verified: string;
  exp: number;
  'https://pinfo2.unige.ch/metadata': {
    preferences: number[];
  };
  iat: number;
  iss: string;
  name: string;
  nickname: string;
  nonce: string;
  picture: string;
  sub: string;
  updated_at: string;
}
