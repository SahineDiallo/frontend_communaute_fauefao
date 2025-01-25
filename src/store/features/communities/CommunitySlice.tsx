import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Community } from '../../../types';


interface CommunitiesState {
  data: Community[];
  featuredCommunity: Community | null; // Add featuredCommunity
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}


const initialState: CommunitiesState = {
  data: [],
  featuredCommunity: null, // Initialize as null
  status: 'idle',
  error: null,
  
};


// Async thunk to fetch communities
export const fetchCommunities = createAsyncThunk<Community[]>(
  'communities/fetchCommunities',
  async () => {
    const response = await fetch('http://localhost:8000/api/communautes/');
    if (!response.ok) {
      throw new Error('Failed to fetch communities');
    }
    const data: Community[] = await response.json();
    console.log("here is the data", data);
    return data;
  }
);

const communitiesSlice = createSlice({
  name: 'communities',
  initialState,
  reducers: {
    // Add a reducer to set the featured community
    setFeaturedCommunity: (state, action: PayloadAction<Community>) => {
      state.featuredCommunity = action.payload;
    },
    resetCommunityState: (state) => {
      state.status = 'idle';
      // Optionally reset other state values if needed
      // state.error = null;
      // Don't reset the data to avoid flickering: state.data = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCommunities.fulfilled, (state, action: PayloadAction<Community[]>) => {
        state.status = 'succeeded';
        state.data = action.payload;

        // Randomly select a featured community
        if (action.payload.length > 0) {
          const randomIndex = Math.floor(Math.random() * action.payload.length);
          state.featuredCommunity = action.payload[randomIndex];
        }
      })
      .addCase(fetchCommunities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch communities';
      });
  },
});

export const { setFeaturedCommunity, resetCommunityState  } = communitiesSlice.actions;
export default communitiesSlice.reducer;