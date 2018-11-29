import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { RouterModule } from '@angular/router';
import { RxjsComponent } from './components/rxjs/rxjs.component';
import { HighlightDirective } from './directive/highlight.directive';
import { UnlessDirective } from './directive/unless.directive';
import { ImageUrlDirective } from './pipes/image-url.directive';
import { AuthDialogComponent } from './dialogs/auth-dialog/auth-dialog.component';
import { AuthDirective } from './directives/auth.directive';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MenuComponent,
    HomeComponent,
    MapComponent,
    RxjsComponent,
    HighlightDirective,
    UnlessDirective,
    ImageUrlDirective,
    AuthDialogComponent,
    AuthDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    MenuComponent,
    HomeComponent,
    MapComponent,
    HighlightDirective,
    UnlessDirective,
    ImageUrlDirective,
    AuthDialogComponent,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  entryComponents: [AuthDialogComponent]
})
export class SharedModule { }
