import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SelectReddit } from './+xstate/reddit-machine.events';
import { useMachine } from 'xstate-angular';
import { redditMachine } from './+xstate/reddit-machine.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  subreddits = ['frontend', 'reactjs', 'vuejs'];
  redditMachine = useMachine(redditMachine, { devTools: true });
  form = new FormGroup({
    subreddit: new FormControl(this.subreddits[0])
  });

  selectSubReddit(name: string) {
    this.redditMachine.send(new SelectReddit(name));
  }
}
