import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../services/artist.service';
import {combineLatest, merge, Observable, of, Subject} from 'rxjs';
import { Artist } from 'src/app/videos/model/music.model';
import {
  debounce,
  debounceTime,
  delay,
  distinctUntilChanged,
  map,
  mergeMap,
  startWith,
  switchMap,
  tap
} from 'rxjs/operators';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  artists$: Observable<Artist[]>;

  private sort$ = new Subject<{sort: string, order: string}>();
  private page$ = new Subject<number>();
  page: number = 1;
  temppage: number = 1;
  sort: string = "";
  order: string = "";
  source$: Observable<Artist[]>;

  constructor(private artistService: ArtistService) { }

  ngOnInit() {
    this.artists$ = this.artistService.loadArtists();
    const pageSource$ = this.page$.pipe(
      distinctUntilChanged(),
      map(pageNumber => {
        this.page = pageNumber;
        return {sort: this.sort, page: pageNumber, order: this.order}
      }));

    const sortSource$ = this.sort$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map((sortTerm: {sort: string, order: string}) => {
        this.sort = sortTerm.sort;
        this.order = sortTerm.order;
        return {sort: sortTerm.sort, page: 1, order: this.order}
      })
    );

    this.source$ = merge(pageSource$, sortSource$).pipe(
      startWith({sort: this.sort, page: this.page, order: this.order}),
      mergeMap((params: {sort: string, page: number, order: string}) => {
        // debugger
        return this.artistService.getArtistTest(params);
      }),
      tap(res => {
        console.log('result', res);
      })
    );
  }
//connect sort and order
  goTo(event) {
    this.temppage = this.page + 1;
    // debugger
    this.page$.next(this.temppage);
  }

  sortBy(sortBy: string) {
    // debugger
    this.sort$.next({sort: sortBy, order: this.order});
  }

  orderBy(order: string) {
    this.order = order;
    this.sort$.next({sort: this.sort, order: order});
  }
}
