import {StyleSheet, TouchableOpacity, View} from 'react-native'
import React, {useCallback} from 'react'
import {AppTheme} from '~/styles/Theme'
import {useAppStyles} from '~/hooks'
import {scale} from '~/utils/scaleScreen'
import AppImage from '~/components/AppImage'
import AppFastImage from '~/components/AppFastImage'
import utils from '~/utils'
import {Screens} from '../Screens'
import {Icons} from '~/assets'
import AppText from '~/components/AppText'
import {Fontsfamily} from '~/styles/FontsFamily'
import useUserInfo from '../Settings/hooks/useUserInfo'

const InfoUserAndNotificationCard = ({countNoti = 0}: {countNoti: number}) => {
  const {THEME} = useAppStyles()
  const styles = useCallback(styleWithTheme, [THEME])(THEME)
  const imageUserInfo = useUserInfo()
  const {imgAvatar} = imageUserInfo

  const goInfo = () => utils.navigate(Screens.name.Settings)

  const openNotification = () => {
    utils.navigate(Screens.name.Notification)
  }

  return (
    <View style={styles.right_header_warpper}>
      <View>
        <TouchableOpacity onPress={goInfo}>
          <View style={styles.icon_warpper}>
            <AppFastImage
              key={
                imgAvatar ? Math.random().toString() : JSON.stringify(imgAvatar)
              }
              source={
                imgAvatar ? {...imgAvatar, cache: 'web'} : Icons.icNoImage
              }
              style={[styles.icon, {borderRadius: scale(22)}]}
              resizeMode="cover"
              showReloadButton={false}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={openNotification}>
          <AppImage
            source={Icons.icNotification}
            style={[styles.icon, {tintColor: THEME.colors.white}]}
          />
        </TouchableOpacity>
        {countNoti > 0 && countNoti < 10 && (
          <View style={styles.circleAlert}>
            <AppText style={styles.textNoti}>{countNoti}</AppText>
          </View>
        )}
        {countNoti >= 10 && (
          <View style={[styles.circleAlert, styles.circleAlertNonText]} />
        )}
      </View>
    </View>
  )
}

export default InfoUserAndNotificationCard

const styleWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    right_header_warpper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(16),
      flex: 1,
    },
    icon_warpper: {
      borderRadius: scale(22),
      borderWidth: scale(0.8),
      borderColor: THEME.colors.white,
      backgroundColor: THEME.colors.white,

      // iOS Shadow
      shadowColor: '#363636',
      shadowOffset: {width: 2, height: 3},
      shadowOpacity: 0.25,
      shadowRadius: 4,

      // Android Shadow
      elevation: 5,
    },
    icon: {
      width: scale(21),
      height: scale(22),
    },
    circleAlert: {
      position: 'absolute',
      top: -5,
      right: -5,
      width: scale(14),
      height: scale(14),
      borderRadius: scale(20),
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
    },
    circleAlertNonText: {
      width: scale(10),
      height: scale(10),
      top: -3,
      right: 0,
    },
    textNoti: {
      fontFamily: Fontsfamily.OpenSans.Bold,
      fontSize: scale(10),
      color: THEME.colors.white,
    },
  })
