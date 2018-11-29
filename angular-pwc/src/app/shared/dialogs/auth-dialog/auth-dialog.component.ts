import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AuthDialogComponent>, private userService: UserService) { }

  ngOnInit() {
  }

  onLogin() {
    console.log('form data ', this.loginForm.valid, this.loginForm.value);
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      this.userService.login(data.username, data.password).subscribe(user => {
        console.log('SUCCESS', user);
        this.dialogRef.close(user);
      }, err => {
        console.log('ERROR', err);
      });
    }
  }

  onCancel() {
    console.log('cancel in');
    this.dialogRef.close('closed');
  }
}
