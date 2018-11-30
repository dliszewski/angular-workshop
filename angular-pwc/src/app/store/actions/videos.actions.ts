import { Action } from '@ngrx/store';

export enum VideosActionTypes {
  LoadVideoss = '[Videos] Load Videoss'
}

export class LoadVideoss implements Action {
  readonly type = VideosActionTypes.LoadVideoss;
}

export type VideosActions = LoadVideoss;
