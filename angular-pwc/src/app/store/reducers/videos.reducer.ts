import {VideosActions, VideosActionTypes} from '../actions/videos.actions';
import {User} from '../../videos/model/music.model';
import {Video} from '../../videos/model/video.model';
import {createSelector} from '@ngrx/store';

export interface State {
  credits: string;
  user: User | null;
  videos: Video[];
  query: string;
  selectedVideoId: string;
}

export const initialState: State = {
  credits: 'Szkolenie Angular 2018',
  user: null,
  videos: [],
  query: null,
  selectedVideoId: null
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

    case VideosActionTypes.UserLoginRsponse:
      return {
        ...state,
        user: action.payload
      };

    case VideosActionTypes.SearchVideoResponse:
      return {
        ...state,
        videos: action.payload
      };

    case VideosActionTypes.SearchVideo:
      return {
        ...state,
        query: action.payload
      };

    default:
      return state;
  }
}

export const getVideos = (state: State) => state.videos;
export const getSelectedVideoId = (state: State) => state.selectedVideoId;

export const getSelectedVideo = createSelector(getVideos, getSelectedVideoId, (videos, selectedVideoId) => {
  return  videos.find(v => v.id.videoId === selectedVideoId);
});
