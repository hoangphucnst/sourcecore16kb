import React, {useCallback, useEffect} from 'react'
import {Linking, Platform, StyleSheet} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import AppText from '~/components/AppText'
import {useSelector} from 'react-redux'
import AppIconVector from '~/components/AppIconVector'
import {scale} from '~/utils/scaleScreen'
import {AppTheme} from '~/styles/Theme'
import {useAppStyles} from '~/hooks'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import AppButton from '~/components/AppButton'
import {RootState} from '~/redux/store'

const WrapperNetworkStatusWarning = WrappedComponent => {
  return function EnhancedComponent(props) {
    const {THEME} = useAppStyles()
    const styles = useCallback(styleWithTheme, [THEME])(THEME)
    const isConnected = useSelector(
      (state: RootState) => state.network.isConnected,
    )
    const {bottom} = useSafeAreaInsets()
    const HEIGHT_TABBOTOM = 80
    const VALUE_BOTTOM = bottom + scale(HEIGHT_TABBOTOM * 2)

    const translateY = useSharedValue(VALUE_BOTTOM)

    useEffect(() => {
      translateY.value = isConnected
        ? withTiming(VALUE_BOTTOM, {duration: 300})
        : withTiming(0, {duration: 300})
    }, [isConnected])

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{translateY: translateY.value}],
    }))

    const openNetworkSettings = () => {
      if (Platform.OS === 'ios') {
        Linking.openURL('App-Prefs:WIFI') // iOS 11+ (có thể không hoạt động trên mọi thiết bị)
      } else {
        Linking.openSettings()
      }
    }

    return (
      <>
        <WrappedComponent {...props} />
        <Animated.View
          style={[
            styles.banner,
            {bottom: bottom + scale(HEIGHT_TABBOTOM)},
            animatedStyle,
          ]}>
          <AppIconVector.MaterialIcon
            name="signal-cellular-connected-no-internet-4-bar"
            size={20}
            color="#fff"
            style={{marginRight: scale(8)}}
          />
          <AppText style={styles.text}>Mất kết nối Internet</AppText>
          <AppButton
            title="Cài đặt"
            styleButton={{
              backgroundColor: THEME.colors.white,
            }}
            onPress={openNetworkSettings}
          />
        </Animated.View>
      </>
    )
  }
}

export default WrapperNetworkStatusWarning

const styleWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    banner: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#e53935',
      padding: scale(5),
      position: 'absolute',
      bottom: 0,
      left: scale(10),
      right: scale(10),
      zIndex: 999,
      borderRadius: scale(10),
      justifyContent: 'space-between',
      borderCurve: 'continuous',
    },
    text: {
      color: '#fff',
      fontWeight: '600',
      flex: 1,
    },
  })
