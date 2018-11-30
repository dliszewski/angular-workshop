import { Action } from '@ngrx/store';
import {User} from '../../videos/model/music.model';

export enum VideosActionTypes {
  LoadVideoss = '[Videos] Load Videoss',
  UpdateCredits = '[Videos] Update Credits',
  UserLogin = '[User] User Login',
  UserLoginRsponse = '[User] User Login Response',
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

export type VideosActions = LoadVideoss | UpdateCreditsAction | UserLoginAction | UserLoginResponseAction;
