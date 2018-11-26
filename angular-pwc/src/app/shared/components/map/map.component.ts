import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input()
  coords = 999999;

  // @Output()
  // mapClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
