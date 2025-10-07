import 'react-native-gesture-handler';
import {AppState, Linking, Platform, UIManager} from 'react-native';
import React, {useEffect, useRef} from 'react';
import useNotification from '~/hooks/useNotification';
import {ReduxNetworkProvider} from 'react-native-offline';
import {Provider} from 'react-redux';
import {persistor, store} from '~/redux/store';
import AppRoot from '~/screens/AppRoot';
import {PersistGate} from 'redux-persist/integration/react';
import utils from '~/utils';
import {
  closeAllBottomSheetModal,
  onDisplayNotification,
} from '~/hooks/useNotification';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {DEFAULT_ARGS_NETWORK_PROVIDER} from '~/constants';
import './src/assets/languages/i18n';
import UpdateStoreProvider from '~/hoc/UpdateStoreProvider';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => {
  const {onListenerNotificationFirebase, requestUserPermission} =
    useNotification({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onDismissedNotifee: (dataNotification: any) => {},
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onPressNotifee: (dataNotification: any) => {
        //Close Bottom Sheet Modal (if opnend)
        closeAllBottomSheetModal();
        //Handler something here such as: navigate deeplink
      },
    });

  const appState = useRef(AppState.currentState);

  function requirePermissionNotification() {
    requestUserPermission({
      nameTopicFirebase: 'Notifications',
      onHandlerNotGrantedNotification: () => {
        utils.messageBox({
          title: 'Thông báo',
          message:
            'Vui lòng bật thông báo để nhận được các thông báo mới nhất.',
          labelCancel: 'Để sau',
          labelConfirm: 'Đến cài đặt',
          onConfirm: () => Linking.openSettings(),
        });
      },
    });
  }

  useEffect(() => {
    requirePermissionNotification();
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        utils.log(
          'NOTIFICAION _ CHECK PERMISSION & REGISTER TOKEN FCM',
          'App has come to the foreground!',
        );
        requirePermissionNotification();
      }
      appState.current = nextAppState;
    });
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const unsubcribe = onListenerNotificationFirebase({
      onHandlerAppClose: (notification: any) => {
        console.log('close', notification);
        // Only logic code deeplink
      },

      onHandlerAppForground: (notification: any) => {
        console.log('onHandlerAppForground', notification);
        // Only logic code deeplink
      },

      onHanlderAppOpened: (notification: any) => {
        console.log('open', notification);
        const {
          title = '',
          body = '',
          additionalData = {},
        } = notification?.payload;
        onDisplayNotification(title, body, additionalData);
      },
    });
    return () => {
      unsubcribe?.();
    };
  }, []);

  return (
    <Provider store={store}>
      <ReduxNetworkProvider {...DEFAULT_ARGS_NETWORK_PROVIDER}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <UpdateStoreProvider>
              <AppRoot />
            </UpdateStoreProvider>
          </SafeAreaProvider>
        </PersistGate>
      </ReduxNetworkProvider>
    </Provider>
  );
};

export default App;
