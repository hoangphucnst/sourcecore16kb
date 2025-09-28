import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: 'React Native Demo',
    host: 'localhost', // hoặc 10.0.2.2 nếu dùng emulator Android
  })
  .useReactNative({
    asyncStorage: true,
    networking: {ignoreUrls: /symbolicate/},
    editor: true,
    errors: {veto: stackFrame => false},
  })
  .connect();

// 👉 Đoạn này giúp bạn log từ console ra Reactotron
console.tron = Reactotron;
