import { Injectable, Inject } from '@angular/core';
import { BASE_URL, IMAGES_BASE_URL } from 'src/app/shared/tokens';
import { HttpClient } from '@angular/common/http';
import { Video, FavouriteVideo } from '../model/video.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(@Inject(BASE_URL) private base: string, @Inject(IMAGES_BASE_URL) private iamges: string,
   private client: HttpClient) { }

   addFavourite(video: Video): Observable<FavouriteVideo> {
     return this.client.post<FavouriteVideo>(this.base + '/videos', {
        id: video.id.videoId,
        video
     });
   }
}
