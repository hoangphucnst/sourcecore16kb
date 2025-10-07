import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React, {useEffect} from 'react'
import Animated from 'react-native-reanimated'
import {p_horizontalScale, p_verticalScale, scale} from '~/utils/scaleScreen'
import PopupHeader from '~/screens/components/PopupHeader'
import utils from '~/utils'
import {useAppStyles} from '~/hooks'
import RowContent from '~/screens/components/RowContent'
import useUserInfo from '../hooks/useUserInfo'
import useAuth from '~/redux/reduxHooks/useAuth'
import {useFadeBackgroundAnimation} from '~/hooks'

// const FILE_NAME = 'Modal_DetailUserInfo'
const Modal_DetailUserInfo = () => {
  const {THEME} = useAppStyles()
  const styles = ModalStyles(THEME)
  const timeStartAnimation = 150 * 5
  const timeEndAnimation = timeStartAnimation / 5
  const {animatedStyle, startAnimation, endAnimation} =
    useFadeBackgroundAnimation({
      from: 0,
      to: 0.3,
      durationIn: timeStartAnimation,
      durationOut: timeEndAnimation,
    })

  const {dataUser} = useUserInfo()
  const {roleInfo} = useAuth()

  useEffect(() => {
    setTimeout(() => {
      startAnimation()
    }, 150)

    Platform.OS === 'android' &&
      StatusBar.setBackgroundColor(THEME.colors.transparent.black_40)
    StatusBar.setBarStyle('light-content')
    return () => {
      Platform.OS === 'android' &&
        StatusBar.setBackgroundColor(THEME.colors.white)
      StatusBar.setBarStyle('dark-content')
    }
  }, [])

  const goBack = () => {
    endAnimation({
      callback() {
        utils.goBackNavigation()
      },
    })
  }

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableWithoutFeedback onPress={goBack}>
        <View style={styles.container_press_out} />
      </TouchableWithoutFeedback>
      <View style={styles.container_inner}>
        <PopupHeader text="Thông tin tài khoản" onClose={goBack} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <RowContent label="Họ và tên" value={dataUser?.fullName} />
          <RowContent label="Tên đăng nhập" value={dataUser?.username} />
          <RowContent label="Vị trí công tác" value={dataUser?.role} />
          <RowContent label="Phòng ban" value={dataUser?.department} />
          <RowContent label="Mã nhân viên" value={dataUser?.userCode} />
          <RowContent label="Ngày sinh" value={dataUser?.birthDay} />
          <RowContent label="Giới tính" value={dataUser?.gender} />
          <RowContent label="Số điện thoại" value={dataUser?.phoneNumber} />
          <RowContent label="E-mail" value={dataUser?.email} />
          <RowContent label="CCCD" value={dataUser?.identifyCode} />
          <RowContent label="Ngày cấp" value={dataUser?.issueDate} />
          <RowContent label="Nơi cấp" value={dataUser?.issuePlace} />
          <RowContent
            label="Chứng thư số"
            value={dataUser?.digitalCertificateName}
          />
          <RowContent
            label="Loại chứng thư"
            value={dataUser?.certificateTypeName}
          />
          <RowContent label="Số SIM CA" value={dataUser?.simCa} />
        </ScrollView>
      </View>
    </Animated.View>
  )
}

export default Modal_DetailUserInfo

const ModalStyles = (theme: AppTheme) => {
  const {colors} = theme
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    container_inner: {
      height: '70%',
      backgroundColor: colors.white,
      borderTopRightRadius: scale(16),
      borderTopLeftRadius: scale(16),
      gap: scale(8),
      paddingVertical: scale(16),
      paddingHorizontal: scale(10),
    },
    container_press_out: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: p_verticalScale(100),
      width: p_horizontalScale(100),
    },
  })
}
