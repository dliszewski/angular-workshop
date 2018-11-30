import { Action } from '@ngrx/store';

export enum VideosActionTypes {
  LoadVideoss = '[Videos] Load Videoss',
  UpdateCredits = '[Videos] Update Credits'
}

export class LoadVideoss implements Action {
  readonly type = VideosActionTypes.LoadVideoss;
}

export class UpdateCreditsAction implements Action {
  readonly type = VideosActionTypes.UpdateCredits;
  constructor(public payload: string) { }
}

export type VideosActions = LoadVideoss | UpdateCreditsAction;
