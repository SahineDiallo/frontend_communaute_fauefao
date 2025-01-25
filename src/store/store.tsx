import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import tabsReducer from './features/tabs/tabsSlice';
import authReducer from './features/auth/authSlice';
import communitiesReducer from './features/communities/CommunitySlice';
import communityDetailsReducer from './features/communities/CommunityDetailsSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Wrap each reducer with persistReducer
const persistedTabsReducer = persistReducer(persistConfig, tabsReducer);
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedCommunitiesReducer = persistReducer(persistConfig, communitiesReducer);
const persistedCommunityDetailsReducer = persistReducer(persistConfig, communityDetailsReducer);

// Configure the store
const store = configureStore({
  reducer: {
    tabs: persistedTabsReducer,
    auth: persistedAuthReducer,
    communities: persistedCommunitiesReducer,
    communityDetails: persistedCommunityDetailsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // Ignore redux-persist actions
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
