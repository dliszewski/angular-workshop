import { Component, OnInit } from '@angular/core';
import {ArtistService} from '../../services/artist.service';
import {Observable} from 'rxjs';
import {Artist, Song} from '../../../videos/model/music.model';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {

  songs$: Observable<Song[]>;
  public show = false;
  public songDetail: Song;

  constructor(private artistService: ArtistService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.songs$ = this.route.parent.paramMap.pipe(
      map(paramMap => paramMap.get('id')),
      switchMap((id) => {
        return this.artistService.getSongs(id);
      }),
      tap(r => console.log('res', r))
    );
  }
}
