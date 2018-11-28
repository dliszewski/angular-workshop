import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/videos/model/music.model';
import { distinctUntilChanged, delay, switchMap, map } from 'rxjs/operators';
import { ArtistService } from '../services/artist.service';

@Component({
  selector: 'app-artist-view',
  templateUrl: './artist-view.component.html',
  styleUrls: ['./artist-view.component.scss']
})
export class ArtistViewComponent implements OnInit {

  public artist$: Observable<Artist>;

  constructor(private route: ActivatedRoute, private artistService: ArtistService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(res => console.log('paramMap', res));
    this.artist$ = this.route.paramMap.pipe(
      map(paramMap => paramMap.get('id')),
      distinctUntilChanged(),
      delay(500),
      switchMap((id) => {
        return this.artistService.getArtist(id).pipe(delay(1000));
      })
    );
  }

}
