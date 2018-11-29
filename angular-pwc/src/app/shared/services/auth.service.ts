import { Injectable } from '@angular/core';
import {UserService} from './user.service';
import {MatDialog} from '@angular/material';
import {share, switchMap, take} from 'rxjs/operators';
import {AuthDialogComponent} from '../dialogs/auth-dialog/auth-dialog.component';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService, private dialog: MatDialog) { }

  public loginDialog$ = this.userService.user$.pipe(
    switchMap( (user) => {
      if (!user) {
        const dialogRef = this.dialog.open(AuthDialogComponent);
        return dialogRef.afterClosed();
      } else {
        return of(user);
      }
    }),
    share(),
    take(1)
  );

    // switchMap(user => {
    //
    //   if (!user) {
    //     const dialogRef = this.dialog.open(AuthDialogComponent, {
    //       height: '400px',
    //       width: '600px',
    //     });
    //
    //     return dialogRef.afterClosed();
    //   } else {
    //     return of(user);
    //   }
    // }),
    // share(),
    // take(1)
  // );
}
