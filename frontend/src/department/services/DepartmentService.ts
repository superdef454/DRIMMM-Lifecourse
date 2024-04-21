import { createAsyncThunk } from '@reduxjs/toolkit';
import { apiGet } from '../../api/common/apiFunctions.ts';
import { StatusCodeEnum } from '../../../libs/StatusCodeEnum.ts';

export class DepartmentService {
  static fn = createAsyncThunk('department/fn', async (_request: never, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue } = thunkAPI;

    try {
      const response = await apiGet('/api/posts');

      console.log('fulfillWithValue', response);

      return fulfillWithValue({});
    } catch (e: any) {
      if (e.status === StatusCodeEnum.CLIENT_ERROR_UNAUTHORIZED) {
        console.log('qwfe');
      }

      console.log('rejectWithValue', e);
      return rejectWithValue({});
    }
  });
}

export const departmentServicePending = [DepartmentService.fn.pending];
export const departmentServiceCompleted = [DepartmentService.fn.fulfilled, DepartmentService.fn.rejected];
