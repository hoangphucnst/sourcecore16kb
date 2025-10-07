import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from '@reduxjs/toolkit';
import {createMigrate, MigrationManifest} from 'redux-persist';
import persistReducer from 'redux-persist/es/persistReducer';
import AppConfig from '~/app/AppConfig';
import {encryptTransform} from './encrypt';
import {RootState} from './store';
import {
  ReducerAuth,
  ReducerLanguage,
  ReducerScreens,
  ReducerTheme,
} from './slices';
import {reducer as ReducerNetwork} from 'react-native-offline';

// ⚙️ Declare all reducers here (you can edit here)
const RootReducers = {
  network: ReducerNetwork,
  theme: ReducerTheme,
  auth: ReducerAuth,
  language: ReducerLanguage,
  screens: ReducerScreens,
};

// Reducers need migration added at here
const migrations: MigrationManifest = {
  [AppConfig.verMigratePersist]: (state: RootState) => {
    return {
      theme: {...RootReducers.theme, ...state.theme, default: true},
      auth: {...RootReducers.auth, ...state.auth, default: true},
    };
  },
};

/*
⚙️
|- persistConfig
    |- persistConfig -> whitelist | ⚡ Reducers will be saved into AsyncStorage when unmount App
    |- persistConfig -> blackList | ⚡ Reducers will be deleted/reset when unmount App
*/
const persistConfig = {
  key: 'primary',
  version: AppConfig.verMigratePersist,
  storage: AsyncStorage,
  migrate: createMigrate(migrations, {debug: __DEV__ ? true : false}),
  whitelist: ['auth', 'theme'],
  blackList: [],
  transform: [encryptTransform],
};

const reducers = combineReducers({...RootReducers});

export const AppReducers = persistReducer(persistConfig, reducers);
