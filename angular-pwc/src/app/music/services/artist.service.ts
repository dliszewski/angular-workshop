import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artist } from 'src/app/videos/model/music.model';
import { BASE_URL } from 'src/app/shared/tokens';
import {BehaviorSubject, merge, Observable, of, Subject} from 'rxjs';
import {tap, startWith, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private artists$ = new BehaviorSubject<Artist[]>([]);
  reload$ = new Subject();

  constructor(private http: HttpClient, @Inject(BASE_URL) private base: string) { }

  loadArtists(): Observable<Artist[]> {
    return merge(
      this.reload$,
      of(1)
    ).pipe(
      switchMap(() => this.http.get<Artist[]>(this.base + '/artists'))
    );
    // return this.http.get<Artist[]>(this.base + '/artists')
    // .pipe(
    //   tap(fav => this.artists$.next(fav))
    // );
  }

  getArtists(): Observable<Artist[]> {
    return this.artists$.asObservable();
  }

  getArtist(id): Observable<Artist> {
    return this.http.get<Artist>(this.base + '/artists/' + id);
  }

  updateArtist(artist: Artist): Observable<Artist> {
    return this.http.patch<Artist>(this.base + '/artists/' + artist.id, artist)
      .pipe(tap(() => this.reload$.next()));
  }
}
