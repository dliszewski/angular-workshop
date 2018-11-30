import {Directive, HostListener} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {State} from '../../store/reducers';
import {Store} from '@ngrx/store';
import {UserLoginAction} from '../../store/actions/videos.actions';

@Directive({
  selector: '[appAuth]'
})
export class AuthDirective {

  constructor(private authService: AuthService, public store: Store<State>) { }

  @HostListener('click')
  onclick() {
    this.store.dispatch(new UserLoginAction());
    // this.authService.loginDialog$.subscribe();
  }
}
