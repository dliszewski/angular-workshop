import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { YOUTUBE_API_KEY, BASE_URL, IMAGES_BASE_URL } from './shared/tokens';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponent } from './share/error/error.component';
import {HttpInterceptorService} from './shared/interceptor/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: YOUTUBE_API_KEY,
      useValue: environment.youtubeApiKey
    },
    {
      provide: BASE_URL,
      useValue: environment.baseUrl
    },
    {
      provide: IMAGES_BASE_URL,
      useValue: environment.imagesBaseUrl
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
