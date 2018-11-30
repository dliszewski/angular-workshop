import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Video, FavouriteVideo } from '../model/video.model';
import { SearchService } from '../search.service';
import { VideoService } from '../services/video.service';
import {State} from '../../store/reducers';
import {Store} from '@ngrx/store';
import {SearchVideoAction} from '../../store/actions/videos.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  query: string;
  response$: Observable<Video[]>;
  // resp: YoutubeResponse;
  destroy$ = new Subject();
  favourites$: Observable<FavouriteVideo[]>;
  constructor(private searchService: SearchService, private videoService: VideoService, public store: Store<State>) { }

  ngOnInit() {
    this.videoService.loadFavourite().subscribe(res => console.log('sub', res));
    this.favourites$ = this.videoService.getFavourites();
    this.response$ = this.store.select('videos', 'videos');
  }

  onChanges(value) {
    console.log('ONCHANGES', value);
    this.query = value;
  }

  onSearch() {
    console.log('submit', this.query);
    this.store.dispatch(new SearchVideoAction(this.query));
    // this.response$ = this.searchService.searchYoutube(this.query);

    // this.searchService.searchYoutube(this.query)
    // .pipe(takeUntil(this.destroy$))
    // .subscribe(res => this.resp = res);
  }

  ngOnDestroy(): void {
    console.log('DESTROY');
    this.destroy$.next();
  }

  addFavourite(video: Video) {
    console.log('add like');
    this.videoService.addFavourite(video)
    .subscribe(res => console.log(res), err => console.log(err));
  }

  onDelete(video: Video) {
    console.log('delete video', video);
    this.videoService.deleteFavorite(video).subscribe(
      v => console.log('V', v),
      err => console.log('err', err)
    );
  }

}
