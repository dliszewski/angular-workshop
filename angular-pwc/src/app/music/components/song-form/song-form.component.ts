import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Song} from '../../../videos/model/music.model';
import {FormArray, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-song-form',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.scss']
})
export class SongFormComponent implements OnInit {
  _song: Song;
  @Input()
  set song(song) {
    this._song = song;
    if (song) {
      if (this._song.genders) {
        this._song.genders.forEach(v => this.genders.push(this.fb.control('')));
      }
      this.songForm.patchValue(song);
    }
  }

  @Output()
  save = new EventEmitter<void>();

  @Output()
  cancel = new EventEmitter<void>();

  get genders() {
    return this.songForm.get('genders') as FormArray;
  }

  public songForm = this.fb.group({
    title: ['', Validators.required],
    year: ['', Validators.required],
    favourite: ['', Validators.required],
    genders: this.fb.array([])
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('SUBMIT', this.songForm.value);
    this.save.emit(this.songForm.value);
  }

  onCancel() {
    this.song = this._song;
    this.cancel.next();
  }

  addGender() {
    this.genders.push(this.fb.control(''));
  }

  removeGender(index: number) {
    this.genders.removeAt(index);
  }
}
