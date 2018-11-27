import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../../model/video.model';
import { MatDialog } from '@angular/material';
import { VideoDialogComponent, VideoDialogData } from '../../dialogs/video-dialog/video-dialog.component';


@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss']
})
export class VideoItemComponent implements OnInit {

  @Input()
  video: Video;

  @Input()
  videos: Video[];

  constructor(private matDialog: MatDialog) { }

  ngOnInit() {
    console.log('video', this.video);
  }

  showDialog() {
    console.log('show dialog');
    const data: VideoDialogData = {
      video: this.video,
      videos: this.videos
    };
    const dialogRef = this.matDialog.open(VideoDialogComponent, {
      data
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log('The dialog was closed', res);
    });
  }

}
