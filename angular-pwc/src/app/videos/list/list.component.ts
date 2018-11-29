import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  destroy$ = new Subject();

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.pipe(takeUntil(this.destroy$)).subscribe(d => console.log(d));
  }

}
