import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../videos/model/music.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public name = 'auto';
  private _user$ = new BehaviorSubject<User | null>(null);
  constructor() { }

  get user$ () {
    return this._user$.asObservable();
  }
}
