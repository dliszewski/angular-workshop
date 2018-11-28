import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../services/artist.service';
import { Observable } from 'rxjs';
import { Artist } from 'src/app/videos/model/music.model';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {

  artists$: Observable<Artist[]>;

  constructor(private artistService: ArtistService) { }

  ngOnInit() {
    this.artists$ = this.artistService.loadArtists();
  }

}
