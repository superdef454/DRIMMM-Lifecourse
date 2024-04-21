import { RootState } from '../../../core/store/types/RootState.ts';

export class FeedSelector {
  static getState = (state: RootState) => state.feed;
}
