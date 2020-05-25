import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SubredditComponent } from './subreddit.component';
import { SubRedditService } from './subreddit.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SubredditComponent],
  exports: [SubredditComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [SubRedditService]
})
export class SubredditModule {}
