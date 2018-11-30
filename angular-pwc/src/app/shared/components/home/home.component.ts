import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '../../services/user.service';
import {Coords} from '../../../videos/model/music.model';
import {Store} from '@ngrx/store';
import {State} from '../../../store/reducers';
import {Observable} from 'rxjs';
import {UpdateCreditsAction} from '../../../store/actions/videos.actions';

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

  credits$: Observable<string> = this.store.select('videos', 'credits');
  constructor(public store: Store<State>) { }

  ngOnInit() {
    this.title = Date.now().toString();
    // setTimeout( () => this.number = 2, 2000);
    // setInterval( () => this.title = Date.now().toString(), 1000);
  }

  onDivClick() {
    console.log('click div');
    this.red = 'green';
  }

  onMapClick(event: Coords) {
    console.log('Map clicked', event);
    this.coords = event;
  }

  updateCredits() {
    this.store.dispatch(new UpdateCreditsAction('New credits ' + Date.now()));
  }
}
