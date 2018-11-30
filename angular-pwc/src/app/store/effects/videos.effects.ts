import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {UserLoginResponseAction, VideosActionTypes} from '../actions/videos.actions';
import {map, switchMap} from 'rxjs/operators';
import {AuthService} from '../../shared/services/auth.service';

@Injectable()
export class VideosEffects {

  @Effect()
  // each effect has input Action and must output action
  userLogin$ = this.actions$.pipe(
    ofType(VideosActionTypes.UserLogin),
    switchMap(() => this.authService.loginDialog$.pipe(
      map(user => new UserLoginResponseAction(user))
    ))
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
