import {debounce} from 'lodash'
import React, {useCallback, useEffect, useState} from 'react'
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import {Icons} from '~/assets'
import AppImage from '~/components/AppImage'
import AppText from '~/components/AppText'
import {useAppStyles} from '~/hooks'
import useAuth from '~/redux/reduxHooks/useAuth'
import PopupHeader from '~/screens/components/PopupHeader'
import {Role} from '~/services/apis/userService'
import {AppTheme} from '~/styles/Theme'
import utils from '~/utils'
import {
  p_horizontalScale,
  p_verticalScale,
  scale,
  scaleFont,
} from '~/utils/scaleScreen'

const Modal_ChooseRole = props => {
  const {THEME} = useAppStyles()
  const styles = ModalStyles(THEME)
  const bgOpacity = useSharedValue(0)
  const timeStartAnimation = 150 * 5
  const timeEndAnimation = timeStartAnimation / 5
  const {roleInfo: roleInfo_redux} = useAuth()
  const [selectedRole, setSelectedRole] = useState<Role>(roleInfo_redux)
  const {dataLogin} = useAuth()
  const keys_params = [
    'callbackSelectRole',
    'statusbar_bg',
    'statusbar_content',
  ]

  const defaultValue_params = {
    callbackSelectRole: () => {},
    statusbar_bg: THEME.colors.white,
    statusbar_content: 'dark-content',
  }

  const {callbackSelectRole} = utils.ngetParams(
    props,
    keys_params,
    defaultValue_params,
  )

  const startAnimation = () => {
    bgOpacity.value = withTiming(0.3, {duration: timeStartAnimation})
  }

  const endAnimation = () => {
    bgOpacity.value = withTiming(0, {duration: timeEndAnimation})
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: `rgba(0, 0, 0, ${bgOpacity.value})`,
    }
  })

  useEffect(() => {
    setTimeout(() => {
      startAnimation()
    }, 150)

    // Platform.OS === 'android' &&
    //   StatusBar.setBackgroundColor(THEME.colors.transparent.black_40)
    // StatusBar.setBarStyle('light-content')
    // return () => {
    //   Platform.OS === 'android' && StatusBar.setBackgroundColor(statusbar_bg)
    //   StatusBar.setBarStyle(statusbar_content)
    // }
  }, [])

  const goBack = () => {
    endAnimation()
    setTimeout(() => {
      utils.goBackNavigation()
    }, timeEndAnimation + 100)
  }

  const handlePress = useCallback(
    debounce(roleInfo => {
      if (roleInfo !== roleInfo_redux) {
        const handler = () => {
          utils.goBackNavigation()
          setSelectedRole(roleInfo)
          callbackSelectRole(roleInfo)
        }
        bgOpacity.value = withTiming(0, {duration: timeEndAnimation}, () => {
          runOnJS(handler)()
        })
      }
    }, 100), // Debounce 300ms
    [],
  )

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableWithoutFeedback onPress={goBack}>
        <View style={styles.container_press_out} />
      </TouchableWithoutFeedback>
      <View style={styles.conatiner_choose_role}>
        <PopupHeader text="Chọn vai trò" onClose={goBack} />
        {dataLogin?.roles?.map((roleInfo, index) => {
          const isSelected =
            roleInfo.role_id === selectedRole?.role_id &&
            roleInfo.department_id === selectedRole?.department_id &&
            roleInfo.role_user_dept_id === selectedRole?.role_user_dept_id
          // utils.log(FILE_NAME, `isSelected -> ${JSON.stringify(isSelected)}`)
          return (
            <TouchableOpacity
              key={`${roleInfo.roleId}_${index}`}
              onPress={() => {
                handlePress(roleInfo)
              }}>
              <View style={styles.container_title}>
                <View style={styles.container_card}>
                  <AppText
                    style={
                      isSelected
                        ? styles.text_card_check
                        : styles.text_card_not_check
                    }>
                    Vai trò: {roleInfo.role_name}
                  </AppText>
                  <AppText
                    style={
                      isSelected
                        ? styles.text_card_check
                        : styles.text_card_not_check
                    }>
                    Đơn vị: {roleInfo.department_name}
                  </AppText>
                </View>
                {isSelected && (
                  <AppImage source={Icons.icCheck} style={styles.iconClose} />
                )}
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    </Animated.View>
  )
}

export default Modal_ChooseRole

const ModalStyles = (theme: AppTheme) => {
  const {colors} = theme
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    conatiner_choose_role: {
      backgroundColor: colors.white,
      borderTopRightRadius: scale(16),
      borderTopLeftRadius: scale(16),
      gap: scale(8),
      paddingVertical: scale(16),
      paddingHorizontal: scale(10),
    },
    container_title: {
      paddingTop: scale(8),
      paddingBottom: scale(16),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    iconClose: {
      width: scale(22),
      height: scale(22),
      tintColor: colors.primary,
    },
    iconCheck: {
      width: scale(20),
      height: scale(20),
    },
    container_card: {
      gap: scale(8),
    },
    text_card_check: {
      fontSize: scaleFont(14),
      color: colors.primary,
    },
    text_card_not_check: {
      fontSize: scaleFont(14),
      color: colors.text.secondary,
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
