import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [MenuComponent, HomeComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MenuComponent,
    HomeComponent
  ]
})
export class SharedModule { }
