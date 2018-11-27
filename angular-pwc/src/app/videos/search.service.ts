import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { YOUTUBE_API_KEY } from '../shared/tokens';
import { Video } from './model/video.model';
import { map } from 'rxjs/operators';


export interface YoutubeResponse {
  items: any[];
}
// let time = 2000;
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  // key = 'AIzaSyAt9pnxTbXbdPrgVRyp2CCZnnwe7ceJEhc';
  constructor(private http: HttpClient, @Inject(YOUTUBE_API_KEY) private key: string) { }

  // searchYoutube(query: string): Observable<YoutubeResponse> {
  //   console.log('search...' + time);
  //   time = time - 1000;
  //   return from([
  //     {items: [
  //       {name: 'jeden'},
  //       {name: 'dwa'}
  //     ]}
  //   ]).pipe(
  //     delay(time)
  //   );
  // }
  searchYoutube(query: string): Observable<Video[]> {
    console.log('search...', query);
    const endpoint = 'https://www.googleapis.com/youtube/v3/search';
    return this.http.get<Video[]>(endpoint, {
      params: {
        q: query,
        part: 'snippet',
        key: this.key,
      }
    }).pipe(
      map((res: any) => {
        return res.items;
      })
    );
  }
}
