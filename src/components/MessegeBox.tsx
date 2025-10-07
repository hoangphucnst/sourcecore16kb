import {StyleSheet, View} from 'react-native'
import React, {useImperativeHandle} from 'react'
import {useAppStyles} from '~/hooks'
import {AppTheme} from '~/styles/Theme'
import AppText from './AppText'
import AppButton from './AppButton'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated'

export type TypeRefMessageBox = {
  show: (option: TypeOptionsMessageBox) => void
  hide: () => void
}

export type TypeOptionsMessageBox = {
  title?: string | 'Thông báo'
  message?: string | ''
  labelCancel?: string | 'Huỷ'
  labelConfirm?: string | 'Xác nhận'
  showCancel?: boolean | true
  onCancel?: () => void
  onConfirm?: () => void
}

const INIT_VALUE_Y = 2000
const TIMER = 200 //ms
const INIT_SCALE = 0

const MessegeBox = React.forwardRef<TypeRefMessageBox>((props, ref) => {
  const {THEME} = useAppStyles()
  const styles = stylesWithTheme(THEME)
  const [show, setShow] = React.useState(false)
  const [options, setOptions] = React.useState<TypeOptionsMessageBox>({
    title: 'Thông báo',
    message: 'Nội dung thông báo...',
    labelCancel: 'Huỷ',
    labelConfirm: 'Xác nhận',
  })
  const opacity = useSharedValue(0)
  const translateY = useSharedValue(INIT_VALUE_Y) // Initial value to start off-screen
  const scale = useSharedValue(INIT_SCALE)

  useImperativeHandle(ref, () => ({
    show: (option: TypeOptionsMessageBox) => {
      setShow(true)
      setOptions(option)
      opacity.value = withTiming(1, {duration: TIMER})
      // translateY.value = withTiming(0, {duration: TIMER})
      scale.value = withTiming(1, {duration: TIMER})
    },
    hide: () => {
      opacity.value = withTiming(0, {duration: TIMER})
      // translateY.value = withTiming(INIT_VALUE_Y, {duration: TIMER}, () => {
      //   runOnJS(setShow)(false)
      //   runOnJS(setOptions)({})
      // }) // Slide down animation
      scale.value = withTiming(INIT_SCALE, {duration: TIMER}, () => {
        runOnJS(setShow)(false)
        runOnJS(setOptions)({})
      })
    },
  }))

  const onCancel = () => {
    opacity.value = withTiming(0, {duration: TIMER})
    // translateY.value = withTiming(-INIT_VALUE_Y, {duration: TIMER}, () => {
    //   runOnJS(setShow)(false)
    //   if (options.onCancel) {
    //     runOnJS(options.onCancel)()
    //   }
    //   runOnJS(setOptions)({})
    //   translateY.value = INIT_VALUE_Y
    // })
    scale.value = withTiming(INIT_SCALE, {duration: TIMER}, () => {
      runOnJS(setShow)(false)
      if (options.onCancel) {
        runOnJS(options.onCancel)()
      }
      runOnJS(setOptions)({})
      scale.value = INIT_SCALE
    })
  }

  const onConfirm = () => {
    opacity.value = withTiming(0, {duration: TIMER})
    // translateY.value = withTiming(-INIT_VALUE_Y, {duration: TIMER}, () => {
    //   runOnJS(setShow)(false)
    //   if (options.onConfirm) {
    //     runOnJS(options.onConfirm)()
    //   }
    //   runOnJS(setOptions)({})
    //   translateY.value = INIT_VALUE_Y
    // })
    scale.value = withTiming(INIT_SCALE, {duration: TIMER}, () => {
      runOnJS(setShow)(false)
      if (options.onConfirm) {
        runOnJS(options.onConfirm)()
      }
      runOnJS(setOptions)({})
      translateY.value = INIT_SCALE
    })
  }

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  // const animatedStyleTranslateY = useAnimatedStyle(() => ({
  //   transform: [{translateY: translateY.value}],
  // }))

  const animatedStyleScale = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }))

  if (show)
    return (
      <Animated.View style={[styles.container, animatedStyle]}>
        <Animated.View style={[styles.content, animatedStyleScale]}>
          <AppText style={styles.title}>{options.title}</AppText>
          <AppText style={styles.message}>{options.message}</AppText>
          <View
            style={[
              styles.cnt_button_cancel,
              options.showCancel && styles.cnt_button_cancel_show,
            ]}>
            {options.showCancel && (
              <AppButton
                title={options?.labelCancel || ''}
                styleButton={styles.button_cancel}
                onPress={onCancel}
                styleTitle={{
                  color: THEME.colors.text.primary,
                }}
              />
            )}
            <AppButton
              title={options?.labelConfirm || ''}
              styleButton={
                options.showCancel
                  ? styles.button_ok
                  : styles.butotn_ok_not_show_cancel
              }
              styleTitle={{
                color: THEME.colors.white,
              }}
              onPress={onConfirm}
            />
          </View>
        </Animated.View>
      </Animated.View>
    )
  return null
})
MessegeBox.displayName = 'MessegeBox'
export default MessegeBox

const stylesWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.5)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      width: 320,
      backgroundColor: THEME.colors.white,
      padding: THEME.sizes.pd10,
      borderRadius: 20,
    },
    title: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: THEME.sizes.h4,
    },
    message: {
      marginTop: THEME.sizes.mg10,
      textAlign: 'center',
      color: THEME.colors.text.primary,
    },
    cnt_button_cancel: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: THEME.sizes.mg15,
      justifyContent: 'center',
    },
    cnt_button_cancel_show: {
      justifyContent: 'space-between',
    },
    button_cancel: {
      flex: 1,
      marginRight: THEME.sizes.mg15,
      backgroundColor: THEME.colors.background,
    },
    button_ok: {
      flex: 1,
    },
    butotn_ok_not_show_cancel: {
      flex: 0.5,
    },
  })
