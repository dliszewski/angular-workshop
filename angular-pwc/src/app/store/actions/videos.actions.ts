import { Action } from '@ngrx/store';
import {User} from '../../videos/model/music.model';
import {Video} from '../../videos/model/video.model';

export enum VideosActionTypes {
  LoadVideoss = '[Videos] Load Videoss',
  UpdateCredits = '[Videos] Update Credits',
  UserLogin = '[User] User Login',
  UserLoginRsponse = '[User] User Login Response',
  SearchVideo = '[Videos] Search Video',
  SearchVideoError = '[Videos] Search Video Error',
  SearchVideoResponse = '[Videos] Search Video Response',
}

export class LoadVideoss implements Action {
  readonly type = VideosActionTypes.LoadVideoss;
}

export class UpdateCreditsAction implements Action {
  readonly type = VideosActionTypes.UpdateCredits;
  constructor(public payload: string) { }
}

export class UserLoginAction implements Action {
  readonly type = VideosActionTypes.UserLogin;
}

export class UserLoginResponseAction implements Action {
  readonly type = VideosActionTypes.UserLoginRsponse;
  constructor(public payload: User | null) { }
}

export class SearchVideoAction implements Action {
  readonly type = VideosActionTypes.SearchVideo;
  constructor(public payload: string) { }
}

export class SearchVideoResponseAction implements Action {
  readonly type = VideosActionTypes.SearchVideoResponse;
  constructor(public payload: Video[]) { }
}

export class SearchVideoErrorAction implements Action {
  readonly type = VideosActionTypes.SearchVideoError;
  constructor(public payload: any) { }
}

export type VideosActions = LoadVideoss | UpdateCreditsAction | UserLoginAction | UserLoginResponseAction |
  SearchVideoAction | SearchVideoResponseAction | SearchVideoErrorAction;
