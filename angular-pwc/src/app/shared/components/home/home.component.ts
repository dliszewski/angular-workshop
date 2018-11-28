import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '../../services/user.service';
import {Coords} from '../../../videos/model/music.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  // encapsulation: ViewEncapsulation.Emulated
  providers: []
})
export class HomeComponent implements OnInit {

  title: string;
  number: number;
  number2 = 666;
  red = 'red';
  public coords: Coords;
  constructor() { }

  ngOnInit() {
    this.title = Date.now().toString();
    setTimeout( () => this.number = 2, 2000);
    setInterval( () => this.title = Date.now().toString(), 1000);
  }

  onDivClick() {
    console.log('click div');
    this.red = 'green';
  }

  onMapClick(event: Coords) {
    console.log('Map clicked', event);
    this.coords = event;
  }
}
