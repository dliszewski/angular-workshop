import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../services/artist.service';
import {merge, Observable, Subject} from 'rxjs';
import { Artist } from 'src/app/videos/model/music.model';
import {delay, distinctUntilChanged, map, mergeMap, startWith, tap} from 'rxjs/operators';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  artists$: Observable<Artist[]>;

  private sort$ = new Subject<string>();
  private page$ = new Subject<number>();
  page: number = 1;
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
      distinctUntilChanged(),
      map(sortTerm => {
        this.sort = sortTerm;
        return {sort: sortTerm, page: 1, order: this.order}
      })
    );

    this.source$ = merge(pageSource$, sortSource$).pipe(
      startWith({sort: this.sort, page: this.page, order: this.order}),
      mergeMap((params: {sort: string, page: number, order: string}) => {
        return this.artistService.getArtistTest(params);
      }),
      tap(res => {
        console.log('result', res);
      })
    );
  }

  goTo(event) {
    const p = 1;
    debugger
    this.page$.next(p);
  }

  sortBy(sortBy: string) {
    debugger
    this.sort$.next(sortBy);
  }
}
