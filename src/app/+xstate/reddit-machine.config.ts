import { Machine, assign } from 'xstate';
import { RedditContext, RedditSchema } from './reddit-machine.schema';
import { RedditEvent } from './reddit-machine.events';

export const redditMachine = Machine<RedditContext, RedditSchema, RedditEvent>({
  id: 'reddit',
  initial: 'idle',
  context: {
    subreddit: null,
    posts: [],
    lastUpdated: null
  },
  states: {
    idle: {},
    selected: {
      initial: 'loading',
      states: {
        loading: {
          invoke: {
            id: 'fetch-subreddit',
            src: 'invokeFetchSubreddit',
            onError: 'failed'
          },
          on: {
            SUCCESS: {
              target: 'loaded',
              actions: assign({
                posts: (_, event) => event.data,
                lastUpdated: () => Date.now()
              })
            }
          }
        },
        loaded: {},
        failed: {}
      }
    }
  },
  on: {
    SELECT: {
      target: '.selected',
      actions: assign({
        subreddit: (context, event) => event.name
      })
    }
  }
});
