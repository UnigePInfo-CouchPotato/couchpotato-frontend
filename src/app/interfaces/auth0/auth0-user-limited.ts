import { UserPreferences } from './auth0-user-preferences';

export interface Auth0UserLimited {
  /** Claim identifying the principal that is thesubject of the JWT. */
  sub: string;

  /** The user's email address. */
  email: string;

  /** Whether the user has verified their account. */
  email_verified: boolean;

  /** Username / Email */
  name: string;

  /** Username */
  nickname: string;

  /** Picture */
  picture: string;

  /** Auth0 Metadata structure... */
  'https://pinfo2.unige.ch/metadata'?: UserPreferences;

  /** Time the information was last updated. */
  updated_at: string;
}
