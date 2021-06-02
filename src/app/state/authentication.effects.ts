import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from 'rxjs/internal/scheduler/Action';
import { exhaustMap } from 'rxjs/operators';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { loginStart, loginSuccess } from './authentication.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthenticationService) {}
/*
  login$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginStart),
        exhaustMap((action: {username: string, password: string}) => {
          return this.authService.attemptLogin(action.username, action.password).pipe(
            map((data) => {
              return loginSuccess()
            })
          )
        })
      )
    }
  );
  */
}
