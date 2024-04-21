import { createSlice } from '@reduxjs/toolkit';
import { initialFeedState } from '../constants/initialFeedState.ts';

const slice = createSlice({
  name: 'feed',
  initialState: initialFeedState,
  reducers: {
    clearState: () => {
      return initialFeedState;
    },
  },
});

export const feedReducer = slice.reducer;
export const feedSlice = slice.actions;
