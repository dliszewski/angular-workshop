import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { delay } from 'rxjs/operators';
import { YOUTUBE_API_KEY } from '../shared/tokens';


export interface YoutubeResponse {
  items: any[];
}
// let time = 2000;
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  key = 'AIzaSyAt9pnxTbXbdPrgVRyp2CCZnnwe7ceJEhc';
  constructor(private http: HttpClient, @Inject(YOUTUBE_API_KEY) key: string) { }

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

  searchYoutube(query: string): Observable<YoutubeResponse> {
    console.log('search...');
    return this.http.get<YoutubeResponse>(`https://www.googleapis.com/youtube/v3/search?q=${query}&part=snippet&key=${this.key}`);
  }
}
