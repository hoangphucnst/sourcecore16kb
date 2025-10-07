import {Alert, Platform, StatusBar, StyleSheet, View} from 'react-native'
import React, {useEffect} from 'react'
import {useAppStyles} from '~/hooks'
import {AppTheme} from '~/styles/Theme'
import {scale, scaleFont} from '~/utils/scaleScreen'
import AppHeader from '~/components/AppHeader'
import {Icons} from '~/assets'
import {Fontsfamily} from '~/styles/FontsFamily'
import utils from '~/utils'
import AnimatedList from './components/AnimatedList'
import useNofiticationList from './hooks/useNofiticationList'
import useScreenState from '~/redux/reduxHooks/useScreenState'
import {Notification} from '~/services/apis/notificationService'
import {APIs} from '~/services/apis'
import {TYPE_GROUP_NAME_NOTIFICATION, TYPE_NOTIFICATION_KEY} from '~/constants'
import {Screens} from '../Screens'

const NotificationScreen = () => {
  const {THEME} = useAppStyles()
  const styles = NotificationStyles(THEME)

  const {list, onRefresh, loadMore, updateLocalNotification} =
    useNofiticationList()
  const {refreshCountNoti} = useScreenState()

  useEffect(() => {
    refreshCountNoti()

    setTimeout(() => {
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('transparent')
        StatusBar.setTranslucent(true)
      }
      StatusBar.setBarStyle('dark-content')
    }, 300)
    return () => {
      StatusBar.setBarStyle('light-content')
    }
  }, [])

  const onSelectNoti = async (item: Notification) => {
    onHandlerNavigate(item)
    if (item.isRead !== 1) {
      const res = await APIs.updateIsReadNotification({
        notificationId: item?.notificationId,
      })

      if (res.status === 200) {
        updateLocalNotification(item.notificationId)
        refreshCountNoti()
      }
    }
  }

  const getNotificationTypeByValue = (
    value: string,
  ): keyof typeof TYPE_NOTIFICATION_KEY | undefined => {
    for (const category in TYPE_NOTIFICATION_KEY) {
      const keys =
        TYPE_NOTIFICATION_KEY[category as keyof typeof TYPE_NOTIFICATION_KEY]
      if (Object.values(keys).includes(value as any)) {
        return category as keyof typeof TYPE_NOTIFICATION_KEY
      }
    }
    return undefined // nếu không tìm thấy
  }

  const onHandlerNavigate = async (notify: Notification) => {
    utils.showLoadingFullApp({show: true})
    const type = getNotificationTypeByValue(notify.type)
    let resCheckExit
    switch (type) {
      case TYPE_GROUP_NAME_NOTIFICATION.CUSTOMER:
        resCheckExit = await APIs.existsByCustomerId(notify.targetId)
        utils.showLoadingFullApp({show: false})
        if (resCheckExit.status === 200 && resCheckExit.object) {
          utils.navigate(Screens.name.DetailsCutomer, {
            customer: {
              customerId: notify.targetId,
            },
          })
        } else {
          utils.showMessageFlash({
            message: 'Thông báo',
            description: `Hồ sơ khách hàng không tồn tại hoặc đã bị xoá`,
            icon: 'danger',
            type: 'danger',
          })
        }
        break
      case TYPE_GROUP_NAME_NOTIFICATION.MORTGAGE:
        resCheckExit = await APIs.existsByMortgageContractId(notify.targetId)
        utils.showLoadingFullApp({show: false})
        if (resCheckExit.status === 200 && resCheckExit.object) {
          utils.navigate(Screens.name.MortgageContractDetails, {
            mortgageContractId: notify?.targetId,
          })
        } else {
          utils.showMessageFlash({
            message: 'Thông báo',
            description: `Hợp đồng thế chấp không tồn tại hoặc đã bị xoá`,
            icon: 'danger',
            type: 'danger',
          })
        }
        break
      case TYPE_GROUP_NAME_NOTIFICATION.TASK:
        resCheckExit = await APIs.existsByTaskId(notify.targetId)
        utils.showLoadingFullApp({show: false})
        if (resCheckExit.status === 200 && resCheckExit.object) {
          utils.navigate(Screens.name.DetailTask, {
            taskInfo: {
              taskId: notify.targetId,
              taskEncodeId: notify.targetIdEncode,
              encodeTaskId: notify.targetIdEncode,
            },
          })
        } else {
          utils.showMessageFlash({
            message: 'Thông báo',
            description: `Công việc không tồn tại hoặc đã bị xoá`,
            icon: 'danger',
            type: 'danger',
          })
        }
        break
      case TYPE_GROUP_NAME_NOTIFICATION.CREDIT:
        resCheckExit = await APIs.existsByCreditContractId(notify.targetId)
        utils.showLoadingFullApp({show: false})
        if (resCheckExit.status === 200 && resCheckExit.object) {
          utils.navigate(Screens.name.DetailCredit, {
            creditIdEncode: notify?.targetIdEncode || null,
          })
        } else {
          utils.showMessageFlash({
            message: 'Thông báo',
            description: `Hợp đồng tín dụng không tồn tại hoặc đã bị xoá`,
            icon: 'danger',
            type: 'danger',
          })
        }
        break

      default:
        break
    }
  }

  return (
    <View style={styles.container}>
      <AppHeader
        title="Thông báo"
        styleHeader={styles.header}
        styleTitle={styles.title_header}
        iconLeft={Icons.icBack_shadow}
        styleIconLeft={{
          width: scale(24),
          height: scale(24),
        }}
        onPressLeft={() => {
          utils.goBackNavigation()
        }}
      />
      <AnimatedList
        data={list.data}
        onPressItem={onSelectNoti}
        refreshing={list.refresh}
        onRefresh={onRefresh}
        showLoading={list.showLoading}
        loadMore={loadMore}
      />
    </View>
  )
}

export default NotificationScreen

const NotificationStyles = (theme: AppTheme) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {colors, fonts, sizes} = theme
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.app.background,
    },
    header: {
      backgroundColor: colors.white,
    },
    title_header: {
      color: colors.text.primary,
      fontSize: scaleFont(18),
    },
    iconSize: {
      width: scale(24),
      height: scale(24),
    },
    container_noti_item: {
      backgroundColor: colors.white,
      paddingVertical: scale(16),
      paddingHorizontal: scale(10),
    },
    container_noti_item_unread: {
      backgroundColor: colors.table.background,
      paddingVertical: scale(16),
      paddingHorizontal: scale(10),
    },
    container_noti: {
      flexDirection: 'row',
      gap: scale(8),
    },
    container_icon: {
      width: scale(60),
      height: scale(60),
      backgroundColor: colors.table.background,
      borderRadius: scale(60),
      alignItems: 'center',
      justifyContent: 'center',
    },
    container_text: {
      flex: 1,
      gap: scale(8),
    },
    primary_text: {
      fontSize: scaleFont(14),
      fontFamily: Fontsfamily.Nunito.SemiBold,
      color: colors.text.primary,
    },
    primary_text_unread: {
      fontSize: scaleFont(14),
      fontFamily: Fontsfamily.Nunito.Bold,
      color: colors.text.primary,
    },
    secondary_text: {
      fontSize: scaleFont(14),
      fontFamily: Fontsfamily.Nunito.Regular,
      color: colors.text.secondary,
    },
    secondary_text_unread: {
      fontSize: scaleFont(14),
      fontFamily: Fontsfamily.Nunito.SemiBold,
      color: colors.text.secondary,
    },
  })
}
