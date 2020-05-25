import { Injectable } from '@angular/core';
import { MachineOptions } from 'xstate';
import { map } from 'rxjs/operators';
import { RedditContext } from './reddit-machine.schema';
import { RedditEvent, LoadSubRedditSuccess } from './reddit-machine.events';
import { SubRedditService } from '../subreddit/subreddit.service';
import { redditMachine } from './reddit-machine.config';
import { useMachine } from 'xstate-angular';

@Injectable()
export class RedditMachine {
  redditMachineOptions: Partial<MachineOptions<RedditContext, RedditEvent>> = {
    services: {
      invokeFetchSubreddit: (_, event) =>
        this.subRedditService.subreddit(event.name).pipe(
          map(response => response.data.children.map(child => child.data)),
          map(data => new LoadSubRedditSuccess(data))
        )
    }
  };
  redditMachine = useMachine(redditMachine, { ...this.redditMachineOptions, devTools: true });
  constructor(private subRedditService: SubRedditService) {}
}
