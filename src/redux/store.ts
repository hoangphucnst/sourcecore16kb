import {configureStore} from '@reduxjs/toolkit';
import {GetDefaultMiddleware} from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import {AppReducers} from './reducers';
import {createNetworkMiddleware} from 'react-native-offline';
import {persistStore} from 'redux-persist';

export const store = configureStore({
  reducer: AppReducers,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware: GetDefaultMiddleware<any>) =>
    getDefaultMiddleware({serializableCheck: false}).concat(
      createNetworkMiddleware({
        queueReleaseThrottle: 200,
      }),
    ),
});

// Store caching persist
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
