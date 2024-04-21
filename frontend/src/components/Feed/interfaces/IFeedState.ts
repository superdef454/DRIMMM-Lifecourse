export interface IFeedState {
  list: Array<{
    id: number;
    title: string;
    description: string;
    created_at: string;
    event_type_title: string;
    author: string;
    likes: number;
  }>;
}
