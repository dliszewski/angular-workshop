import {VideosActions, VideosActionTypes} from '../actions/videos.actions';
import {User} from '../../videos/model/music.model';
import {Video} from '../../videos/model/video.model';

export interface State {
  credits: string;
  user: User;
  videos: Video[];
}

export const initialState: State = {
  credits: 'Szkolenie Angular 2018',
  user: null,
  videos: []
};

export function reducer(state = initialState, action: VideosActions): State {
  switch (action.type) {

    case VideosActionTypes.LoadVideoss:
      return {
        ...state,
        user: null
      };

    case VideosActionTypes.UpdateCredits:
      return {
        ...state,
        credits: action.payload
      };

    default:
      return state;
  }
}
