import { SubReddit } from '../subreddit/subreddit.model';

export class SelectReddit {
  readonly type = 'SELECT';
  constructor(public name: string) {}
}
export class LoadSubRedditSuccess {
  readonly type = 'SUCCESS';
  constructor(public data: SubReddit[]) {}
}

export type RedditEvent = SelectReddit | LoadSubRedditSuccess;
