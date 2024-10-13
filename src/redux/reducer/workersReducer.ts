// redux/reducer/workersReducer.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAllWorkers } from '../../api/getAllWorkersApi';
import { Workers, WorkersState } from '../../entities/Workers';

const initialState: WorkersState = {
  loading: false,
  workers: [], // Initialize as an empty array of Workers
  error: null,
};

// Define async thunk with explicit return type
export const fetchWorkersAction = createAsyncThunk<Workers, void, { rejectValue: string }>(
  'workers/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllWorkers(); // Ensure this returns a promise resolving to Worker[]
      return data; // Return the data which is assumed to be Workers (Worker[])
    } catch (error) {
      // Using a more structured approach for error handling
      return rejectWithValue(
        (error as { response?: { data?: { message?: string } } }).response?.data?.message ||
          'Failed to fetch workers',
      );
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
        state.loading = true; // Set loading state
        state.error = null; // Reset any previous error
      })
      .addCase(fetchWorkersAction.fulfilled, (state, action: PayloadAction<Workers>) => {
        state.loading = false; // Loading complete
        state.workers = action.payload; // Update workers with fetched data
        state.error = null; // Reset error state
      })
      .addCase(fetchWorkersAction.rejected, (state, action) => {
        state.loading = false; // Loading complete on error
        state.error = action.payload as string; // Set error message
      });
  },
});

// Export the reducer to be used in the store
export default workersSlice.reducer;
