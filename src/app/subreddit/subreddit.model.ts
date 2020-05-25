export interface SubRedditResponse {
  kind: string;
  data: {
    children: [{ data: SubReddit }];
  };
}

export interface SubReddit {
  id: string;
  title: string;
}
