export interface UserPreferences {
  preferences: number[];
}
export interface Auth0User {
  /** Client ID as provided by the platform. */
  aud: string;

  /** The user's email address. */
  email: string;

  /** Whether the user has verified their account. */
  email_verified: boolean;

  /** When the token expires. */
  exp: number;

  /** Token Issued at Time */
  iat: number;

  /** JWT Issuer */
  iss: string;

  /** Username / Email */
  name: string;

  /** Username */
  nickname: string;

  /** Value used to associate a Client session with an ID Token */
  nonce: string;

  /** Picture */
  picture: string;

  /** Claim identifying the principal that is thesubject of the JWT. */
  sub: string;

  /** Auth0 Metadata structure... */
  'https://pinfo2.unige.ch/metadata'?: UserPreferences;

  /** Time the information was last updated. */
  updated_at: string;
}
