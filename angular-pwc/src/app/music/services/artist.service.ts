import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artist } from 'src/app/videos/model/music.model';
import { BASE_URL } from 'src/app/shared/tokens';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private artists$ = new BehaviorSubject<Artist[]>([]);

  constructor(private http: HttpClient, @Inject(BASE_URL) private base: string) { }

  loadArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(this.base + '/artists')
    .pipe(
      tap(fav => this.artists$.next(fav))
    );
  }
}
