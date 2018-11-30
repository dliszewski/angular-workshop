import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {SearchVideoAction, SearchVideoResponseAction, UserLoginResponseAction, VideosActionTypes} from '../actions/videos.actions';
import {map, switchMap} from 'rxjs/operators';
import {AuthService} from '../../shared/services/auth.service';
import {from} from 'rxjs';
import {SearchService} from '../../videos/search.service';

@Injectable()
export class VideosEffects {

  @Effect()
  // each effect has input Action and must output action
  userLogin$ = this.actions$.pipe(
    ofType(VideosActionTypes.UserLogin),
    switchMap(() => {
      // // multiple actions in return
      // return from([
      //   new UserLoginResponseAction(null),
      //   new UserLoginResponseAction(null)
      // ])
      return this.authService.loginDialog$.pipe(
        map(user => {
          console.log('user', user);
          return new UserLoginResponseAction(user);
        })
      );
    })
  );

  @Effect()
  searchYoutube$ = this.actions$.pipe(
    ofType(VideosActionTypes.SearchVideo),
    switchMap( (p: SearchVideoAction) => {
      console.log('searchYoutube$', p);
      return this.searchService.searchYoutube(p.payload).pipe(
        map(videos => new SearchVideoResponseAction(videos))
      );
    })
  );

  constructor(private actions$: Actions, private authService: AuthService, private searchService: SearchService) {}
}
