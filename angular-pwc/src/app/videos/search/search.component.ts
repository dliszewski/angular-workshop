import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService, YoutubeResponse } from '../search.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  query: string;
  response$: Observable<YoutubeResponse>;
  resp: YoutubeResponse;
  destroy$ = new Subject();
  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }

  onChanges(value) {
    console.log('ONCHANGES', value);
    this.query = value;
  }

  onSearch() {
    console.log('submit', this.query);
    this.response$ = this.searchService.searchYoutube(this.query);

    this.searchService.searchYoutube(this.query)
    .pipe(takeUntil(this.destroy$))
    .subscribe(res => this.resp = res);
  }

  ngOnDestroy(): void {
    console.log('DESTROY');
    this.destroy$.next();
  }

}
