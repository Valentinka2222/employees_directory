import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllWorkers } from '../../api/getAllWorkersApi';
import { WorkersState } from '../../entities/Workers';

const initialState: WorkersState = {
  loading: false,
  workers: [],
  error: null,
};

export const fetchWorkersAction = createAsyncThunk(
  'workers/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllWorkers();

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch workers');
    }
  },
);

const workersSlice = createSlice({
  name: 'workers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWorkersAction.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkersAction.fulfilled, (state, action) => {
        state.loading = false;
        state.workers = action.payload;
        state.error = null;
      })
      .addCase(fetchWorkersAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default workersSlice.reducer;
