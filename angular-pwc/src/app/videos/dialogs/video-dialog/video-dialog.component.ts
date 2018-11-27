import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Video } from '../../model/video.model';

export interface VideoDialogData {
  video: Video;
  videos: Video[];
}

@Component({
  selector: 'app-video-dialog',
  templateUrl: './video-dialog.component.html',
  styleUrls: ['./video-dialog.component.scss']
})
export class VideoDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: VideoDialogData,
  public dialogRef: MatDialogRef<VideoDialogComponent>,
  private sanitizer: DomSanitizer) { }

  url: SafeResourceUrl;
  currentIndex: number;

  ngOnInit() {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.data.video.id.videoId);
    this.currentIndex = this.data.videos.indexOf(this.data.video);
  }

  onClose() {
    this.dialogRef.close('closed');
  }

  onPrevious() {
    this.currentIndex = this.currentIndex === 0 ? this.data.videos.length : this.currentIndex - 1;
    const nextVideo = this.data.videos[this.currentIndex];
    this.data.video = this.data.videos[this.currentIndex];
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + nextVideo.id.videoId);
  }

  onNext() {
    this.currentIndex = this.currentIndex === this.data.videos.length ? 0 : this.currentIndex + 1;
    const nextVideo = this.data.videos[this.currentIndex];
    this.data.video = this.data.videos[this.currentIndex];
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + nextVideo.id.videoId);
  }
}
