import {Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import * as L from 'leaflet';
import {Coords} from '../../../videos/model/music.model';
import {ReplaySubject} from 'rxjs';

L.Icon.Default.imagePath = '/assets/leaflet/images/';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {

  @ViewChild('mapContainer')
  mapContainer: ElementRef;

  private marker;
  private map;

  @Input()
  set coords(coords: Coords) {
    console.log('set coords', coords);
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
    if (this.map) {
      this.marker = L.marker(coords).addTo(this.map);
      this.map.panTo(coords);
    }
  }

  @Output()
  mapClick = new EventEmitter<Coords>();

  private coords$ = new ReplaySubject<Coords>(1);

  constructor(private userService: UserService) {
    console.log('HOME', userService);
  }

  ngOnInit() {
    console.log('L', L);

    const map = L.map(this.mapContainer.nativeElement).setView([51.505, -0.09], 13);
    this.map = map;

    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png`', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // this.mapClick.emit();

    map.on('click', (e: L.LeafletMouseEvent) => {
      // console.log('map', e.latlng);
      this.mapClick.next(e.latlng);
    });

    // this.coords$.subscribe((coords: Coords) => {
    //
    //   L.marker(coords)
    //     .addTo(map);
    //   map.panTo(coords);
    //
    // });
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (changes.hasOwnProperty('coords')) {
      console.log('onChanges coords', changes);
      this.coords$.next(changes['coords'].currentValue);
    }
  }

}
