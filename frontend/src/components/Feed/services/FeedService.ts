import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet } from '../../../api/common/apiFunctions.ts';
import { StatusCodeEnum } from '../../../../libs/StatusCodeEnum.ts';
import { IFeedState } from '../interfaces/IFeedState.ts';

export class FeedService {
  static fn = createAsyncThunk('feed/getPosts', async (_request: never, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await apiGet<IFeedState['list']>('/api/posts');

      return response;
    } catch (e: any) {
      if (e.status === StatusCodeEnum.CLIENT_ERROR_UNAUTHORIZED) {
        console.log('qwfe');
      }

      console.log('rejectWithValue', e);
      return rejectWithValue({});
    }
  });
  static getUniversity = createAsyncThunk('feed/uni', async (_request: never, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await apiGet<any[]>('/api/university');

      return response;
    } catch (e: any) {
      if (e.status === StatusCodeEnum.CLIENT_ERROR_UNAUTHORIZED) {
        console.log('qwfe');
      }

      console.log('rejectWithValue', e);
      return rejectWithValue({});
    }
  });
  static getCity = createAsyncThunk('feed/city', async (_request: never, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await apiGet<any[]>('/api/city');

      return response;
    } catch (e: any) {
      if (e.status === StatusCodeEnum.CLIENT_ERROR_UNAUTHORIZED) {
        console.log('qwfe');
      }

      console.log('rejectWithValue', e);
      return rejectWithValue({});
    }
  });
  static getFaculty = createAsyncThunk('feed/faculty', async (_request: never, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await apiGet<any[]>('/api/faculty');

      return response;
    } catch (e: any) {
      if (e.status === StatusCodeEnum.CLIENT_ERROR_UNAUTHORIZED) {
        console.log('qwfe');
      }

      console.log('rejectWithValue', e);
      return rejectWithValue({});
    }
  });
  static getGroup = createAsyncThunk('feed/group', async (_request: never, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await apiGet<any[]>('/api/group');

      return response;
    } catch (e: any) {
      if (e.status === StatusCodeEnum.CLIENT_ERROR_UNAUTHORIZED) {
        console.log('qwfe');
      }

      console.log('rejectWithValue', e);
      return rejectWithValue({});
    }
  });
}

export const feedServicePending = [FeedService.fn.pending];
export const feedServiceCompleted = [FeedService.fn.fulfilled, FeedService.fn.rejected];
