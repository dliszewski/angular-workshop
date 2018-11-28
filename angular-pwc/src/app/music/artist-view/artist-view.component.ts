import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {Artist} from 'src/app/videos/model/music.model';
import {delay, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {ArtistService} from '../services/artist.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-artist-view',
  templateUrl: './artist-view.component.html',
  styleUrls: ['./artist-view.component.scss']
})
export class ArtistViewComponent implements OnInit {

  public artist$: Observable<Artist>;
  isEdit = false;

  constructor(private route: ActivatedRoute, private artistService: ArtistService) {
  }

  artistForm: FormGroup;

  ngOnInit() {
    this.route.paramMap.subscribe(res => console.log('paramMap', res));
    this.artist$ = this.route.paramMap.pipe(
      map(paramMap => paramMap.get('id')),
      switchMap((id) => {
        return this.artistService.getArtist(id);
      }),
      tap(artist => this.artistForm.patchValue(artist))
    );

    this.artistForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      img: new FormControl('')
    });
  }

  save() {
    console.log('save', this.artistForm.value);
    this.artistService.updateArtist(this.artistForm.value)
      .subscribe(s => {
        console.log(s);
        this.isEdit = false;
      }, err => {
        console.log(err);
        this.isEdit = false;
      });
  }

}
