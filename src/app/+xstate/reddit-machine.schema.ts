import { SubReddit } from '../subreddit/subreddit.model';

export interface RedditSchema {
  states: {
    idle: {};
    selected: {
      states: {
        loading: {};
        loaded: {};
        failed: {};
      };
    };
  };
}

export interface RedditContext {
  subreddit: string;
  posts: SubReddit[];
  lastUpdated: number;
}
