import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Video } from '../model/video.model';
import { SearchService } from '../search.service';
import { VideoService } from '../services/video.service';

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
  constructor(private searchService: SearchService, private videoService: VideoService) { }

  ngOnInit() {
  }

  onChanges(value) {
    console.log('ONCHANGES', value);
    this.query = value;
  }

  onSearch() {
    console.log('submit', this.query);
    this.response$ = this.searchService.searchYoutube(this.query);

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

}
