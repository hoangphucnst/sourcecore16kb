import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {reactotronRedux} from 'reactotron-redux';

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: 'React Native Demo',
  })
  .useReactNative({
    asyncStorage: true,
    networking: {ignoreUrls: /symbolicate/},
    editor: {openCommand: 'code'},
    errors: {veto: () => false},
    overlay: false,
    log: true,
    storybook: false,
    devTools: false,
  })
  .use(reactotronRedux())
  .connect();
