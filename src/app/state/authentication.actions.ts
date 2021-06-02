import { createAction, props } from '@ngrx/store';
import { User } from '../models/user';

export const loginStart = createAction(
  '[Auth] Login User | Start',
  props<User>()
);

export const loginSuccess = createAction(
  '[Auth] Login User | Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth] Login User | Failure',
  props<User>()
);

export const logout = createAction(
  '[Auth] Logout User',
  props<User>()
);

