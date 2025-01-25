import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Community } from '../../../types';

interface CommunityDetailsState {
  data: Community | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CommunityDetailsState = {
  data: null,
  status: 'idle',
  error: null,
};

// Async thunk to fetch community details
export const fetchCommunityDetails = createAsyncThunk<Community, string>(
  'communityDetails/fetchCommunityDetails',
  async (pkId) => {
    const response = await fetch(`http://localhost:8000/api/communautes/${pkId}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch community details');
    }
    const data: Community = await response.json();
    return data;
  }
);

const communityDetailsSlice = createSlice({
  name: 'communityDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunityDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCommunityDetails.fulfilled, (state, action: PayloadAction<Community>) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCommunityDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch community details';
      });
  },
});

export default communityDetailsSlice.reducer;