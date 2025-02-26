
// communitiesSlice.ts
import { createSlice, createAsyncThunk,  PayloadAction } from '@reduxjs/toolkit';
import { Community } from '../../../types';

interface FilterParams {
  query: string;
  type: string;
  category: string;
}

interface CommunitiesState {
  data: Community[];
  filteredData: Community[]; // Store filtered communities
  featuredCommunity: Community | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  filteredStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filteredError: string | null;
}

const initialState: CommunitiesState = {
  data: [],
  filteredData: [],
  featuredCommunity: null,
  status: 'idle',
  filteredStatus: 'idle',
  error: null,
  filteredError: null,
};

// Thunk for fetching all communities
export const fetchCommunities = createAsyncThunk<Community[]>(
  'communities/fetchCommunities',
  async () => {
    const domain = import.meta.env.VITE_MAIN_DOMAIN;
    const response = await fetch(`${domain}/api/communautes/`);
    if (!response.ok) {
      throw new Error('Failed to fetch communities');
    }
    const data: Community[] = await response.json();
    return data;
  }
);

// New thunk for fetching filtered communities
export const fetchFilteredCommunities = createAsyncThunk<Community[], FilterParams>(
  'communities/fetchFilteredCommunities',
  async (filters) => {
    // If filters is not provided, default to safe values
    if (!filters) {
      filters = { query: '', type: 'all', category: 'all' };
    }
    
    const domain = import.meta.env.VITE_MAIN_DOMAIN;
    const queryParams = new URLSearchParams();
    
    if (filters.query) queryParams.append('community_name', filters.query);
    if (filters.type && filters.type !== 'all') queryParams.append('type', filters.type);
    if (filters.category && filters.category !== 'all') queryParams.append('category', filters.category);
    
    const response = await fetch(`${domain}/api/communautes/?${queryParams.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch filtered communities');
    }
    const data: Community[] = await response.json();
    return data;
  }
);

// Optionally, an action to reset filtered data
const resetFilteredData = (state: CommunitiesState) => {
  state.filteredData = [];
  state.filteredStatus = 'idle';
  state.filteredError = null;
};

const communitiesSlice = createSlice({
  name: 'communities',
  initialState,
  reducers: {
    setFeaturedCommunity: (state, action: PayloadAction<Community>) => {
      state.featuredCommunity = action.payload;
    },
    resetCommunityState: (state) => {
      state.status = 'idle';
      // Do not clear data to avoid flickering
    },
    resetFilteredCommunities: resetFilteredData,
  },
  extraReducers: (builder) => {
    builder
      // For fetchCommunities (unfiltered)
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
      })

      // For fetchFilteredCommunities
      .addCase(fetchFilteredCommunities.pending, (state) => {
        state.filteredStatus = 'loading';
      })
      .addCase(fetchFilteredCommunities.fulfilled, (state, action: PayloadAction<Community[]>) => {
        state.filteredStatus = 'succeeded';
        state.filteredData = action.payload;
      })
      .addCase(fetchFilteredCommunities.rejected, (state, action) => {
        state.filteredStatus = 'failed';
        state.filteredError = action.error.message || 'Failed to fetch filtered communities';
      });
  },
});

export const { setFeaturedCommunity, resetCommunityState, resetFilteredCommunities } = communitiesSlice.actions;
export default communitiesSlice.reducer;
