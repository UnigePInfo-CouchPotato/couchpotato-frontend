import { createReducer, on } from '@ngrx/store';
import { loginSuccess } from './authentication.actions';
import { initialState } from './authentication.state';

const authReducer = createReducer(initialState, on(loginSuccess, (state, action) => {
  return {
    ...state,
    user: action.user
  }
}));

export function AuthReducer(state, action) {
  return authReducer(state, action);
}
