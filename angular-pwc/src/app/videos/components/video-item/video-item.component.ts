import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../../model/video.model';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss']
})
export class VideoItemComponent implements OnInit {

  @Input()
  video: Video;

  constructor() { }

  ngOnInit() {
    console.log('video', this.video);
  }

}
