import {PermissionsAndroid, Platform} from 'react-native'
import messaging from '@react-native-firebase/messaging'
import notifee, {
  EventType,
  AndroidImportance,
  EventDetail,
} from '@notifee/react-native'
import {useEffect} from 'react'
import utils from '~/utils'
import {KEY_STORAGE} from '~/constants'

// ⚙️ Types
export type ListenerNotificationFireBase = {
  onHandlerAppForground: (noti_data: Notification_Data) => void
  onHandlerAppClose: (noti_data: Notification_Data) => void
  onHanlderAppOpened: (noti_data: Notification_Data) => void
}

export type RegisterTokenAndAskPermission = {
  onHandlerNotGrantedNotification: () => void
  nameTopicFirebase: string
}

export interface UseNotificationsProps {
  onDismissedNotifee: (detail: EventDetail) => void
  onPressNotifee: (detail: EventDetail) => void
}

export type Notification_Data = {
  payload: {
    title: string
    body: string
    additionalData: {[key: string]: string | object}
  }
}

// ⚙️ Constants
const DEFAULT_ANDROID_CHANNEL_ID = 'Notification_Channel'
const FILE_NAME = 'useNotification'

// ⚙️ Functions
export const onDisplayNotification = async (
  title: string,
  body: string,
  data: any,
) => {
  const channelId = await notifee.createChannel({
    id: DEFAULT_ANDROID_CHANNEL_ID,
    name: DEFAULT_ANDROID_CHANNEL_ID,
    badge: true,
    importance: AndroidImportance.HIGH,
  })

  // Display a notification
  await notifee.displayNotification({
    id: `${Date.now().toString()}`,
    title,
    body,
    data,
    android: {
      // color: '#FFFFFF',
      channelId,
      smallIcon: 'ic_notification_logoapp',
      importance: AndroidImportance.HIGH,
    },
    ios: {},
  })
}

export const closeAllBottomSheetModal = () => {
  try {
    utils._refChoiseDate.current?.close()
    utils._refControlDevive.current?.close()
  } catch (error) {}
}
const useNotification = ({
  onDismissedNotifee,
  onPressNotifee,
}: UseNotificationsProps) => {
  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      const {notification = null} = detail
      switch (type) {
        case EventType.DISMISSED:
          utils.log(
            FILE_NAME,
            `NOTIFEE - User dismissed notification ${notification?.title} | ${notification?.body}`,
          )
          onDismissedNotifee(detail)
          break
        case EventType.PRESS:
          utils.log(
            FILE_NAME,
            `NOTIFEE - User dismissed notification ${notification?.title} | ${notification?.body}`,
          )
          onPressNotifee(detail)
          break
      }
    })
  }, [])

  // Firebase notification
  const onListenerNotificationFirebase = (
    onHanlderNotification: ListenerNotificationFireBase = {
      onHandlerAppClose: () => {},
      onHandlerAppForground: () => {},
      onHanlderAppOpened: () => {},
    },
  ) => {
    //When app background | foreground
    messaging().onNotificationOpenedApp(remoteMessage => {
      //Handler foreground
      utils.log(
        FILE_NAME,
        `NOTIFICATION APP BACKGROUND | FOREGROUND --- remoteMessage: ${JSON.stringify(remoteMessage)}`,
      )

      const resultNoti: any = {
        notification: {
          payload: {
            title: remoteMessage?.notification?.title,
            body: remoteMessage?.notification?.body,
            additionalData: remoteMessage?.data,
          },
        },
      }
      onHanlderNotification.onHandlerAppForground(resultNoti)
    })

    //When app close
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        //Handler app closed
        utils.log(
          FILE_NAME,
          `NOTIFICATION APP CLOSED --- remoteMessage: ${JSON.stringify(remoteMessage)}`,
        )
        if (remoteMessage) {
          const resultNoti = {
            notification: {
              payload: {
                title: remoteMessage?.notification?.title,
                body: remoteMessage?.notification?.body,
                additionalData: remoteMessage?.data,
              },
            },
          }
          onHanlderNotification.onHandlerAppClose(resultNoti)
        }
      })
      .catch(err =>
        utils.log(
          FILE_NAME,
          `ERROR Notification caused app to open from quit state: ${err}`,
        ),
      )

    //When openning app
    return messaging().onMessage(async remoteMessage => {
      utils.log(
        FILE_NAME,
        `NOTIFICATION APP OPENNED --- remoteMessage: ${JSON.stringify(remoteMessage)}`,
      )

      const resultNoti: any = {
        payload: {
          title: remoteMessage?.notification?.title,
          body: remoteMessage?.notification?.body,
          additionalData: remoteMessage?.data,
        },
      }
      onHanlderNotification.onHanlderAppOpened(resultNoti)
    })
  }

  /**
   * The function `requestUserPermission` checks the platform type and requests permission for
   * notifications, then registers the device token for FCM if permission is granted.
   */
  async function requestUserPermission(
    onPayload: RegisterTokenAndAskPermission = {
      onHandlerNotGrantedNotification: () => {},
      nameTopicFirebase: 'Notifications',
    },
  ) {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission()
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL

      utils.log(FILE_NAME, `PERMISSION NOTIFICATION GRANTED: ${enabled}`)

      if (enabled) {
        registerDevicesTokenFCM()
      } else {
        onPayload.onHandlerNotGrantedNotification()
      }
    } else {
      //Android API 33+ need permission noitfication
      if (Number(Platform.Version) >= 33) {
        const permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        )
        if (permission === 'granted')
          registerDevicesTokenFCM(onPayload.nameTopicFirebase)
        else onPayload.onHandlerNotGrantedNotification()
      } else {
        //Android API from 32 to older not required
        registerDevicesTokenFCM(onPayload.nameTopicFirebase)
      }
    }
  }

  /**
   * The function `registerDevicesTokenFCM` subscribes a device to a specified FCM topic for receiving
   * notifications.
   * @param [topic] - The `topic` parameter in the `registerDevicesTokenFCM` function is used to specify
   * the topic to which the device's FCM token should be subscribed. If no topic is provided, it defaults
   * to "Notifications".
   */
  const registerDevicesTokenFCM = async (topic: string = 'Notifications') => {
    try {
      const fcmToken = await messaging()?.getToken()

      utils.log(FILE_NAME, `FIREBASE | Token -> ${fcmToken}`)
      if (fcmToken) {
        utils.saveStorage(KEY_STORAGE.fcmToken, fcmToken)
        messaging()
          ?.subscribeToTopic(topic)
          .then(() => {
            utils.log(FILE_NAME, `Subscribed to topic -> ${topic}`)
          })
          .catch(e => {
            utils.log(FILE_NAME, `Subscribe topic error: ${e}`)
          })
      }
    } catch (error) {
      utils.log(FILE_NAME, `Register FCM token error: ${error}`)
    }
  }
  return {
    onListenerNotificationFirebase: (
      onHanlderNotification: ListenerNotificationFireBase,
    ) => onListenerNotificationFirebase(onHanlderNotification),
    requestUserPermission: (onPayload: RegisterTokenAndAskPermission) =>
      requestUserPermission(onPayload),
  }
}

export default useNotification
