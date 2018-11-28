import { Injectable, Inject } from '@angular/core';
import { BASE_URL, IMAGES_BASE_URL } from 'src/app/shared/tokens';
import { HttpClient } from '@angular/common/http';
import { Video, FavouriteVideo } from '../model/video.model';
import { Observable, BehaviorSubject, of, empty } from 'rxjs';
import { tap, switchMap, mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private favourites$ = new BehaviorSubject<FavouriteVideo[]>([]);

  constructor(@Inject(BASE_URL) private base: string, @Inject(IMAGES_BASE_URL) private iamges: string,
   private client: HttpClient) { }

   addFavourite(video: Video): Observable<FavouriteVideo> {
     return of(1).pipe(
       switchMap((v) => this.loadFavourite()),
       switchMap(favorites  => {
         console.log('favs ', favorites.find(v => v.id === video.id.videoId));
         if (favorites.find(v => v.id === video.id.videoId)) {
            return empty();
         } else {
          return this.client.post<FavouriteVideo>(this.base + '/videos', {
            id: video.id.videoId,
            video
         }).pipe(
           switchMap((favouriteVideo) => {
            return this.loadFavourite().pipe(mapTo(favouriteVideo));
           })
         );
         }})
     );
   }

   loadFavourite(): Observable<FavouriteVideo[]> {
    return this.client.get<FavouriteVideo[]>(this.base + '/videos')
    .pipe(
      tap(fav => this.favourites$.next(fav))
    );
  }

  getFavourites(): Observable<FavouriteVideo[]> {
    return this.favourites$.asObservable();
  }
}
