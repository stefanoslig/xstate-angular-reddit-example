import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RedditMachine } from './+xstate/reddit-machine.service';
import { SelectReddit } from './+xstate/reddit-machine.events';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  subreddits = ['frontend', 'reactjs', 'vuejs'];
  state$ = this.service.redditMachine.state$;
  form = new FormGroup({
    subreddit: new FormControl(this.subreddits[0])
  });

  constructor(private service: RedditMachine) {}

  selectSubReddit(name: string) {
    this.service.redditMachine.send(new SelectReddit(name));
  }
}
