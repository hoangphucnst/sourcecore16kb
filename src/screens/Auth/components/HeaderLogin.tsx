import React, {useEffect} from 'react'
import {StyleSheet} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Icons} from '~/assets'
import AppImage from '~/components/AppImage'
import AppText from '~/components/AppText'
import {Fontsfamily, FONTSFAMILY} from '~/styles/FontsFamily'
import {scale, scaleFont} from '~/utils/scaleScreen'
import {AppTheme} from '~/styles/Theme'
import {useAppStyles} from '~/hooks'

interface HeaderLoginProps {
  theme: AppTheme
}

const HeaderLogin: React.FC<HeaderLoginProps> = () => {
  const styles = HeaderStyles()
  const {top} = useSafeAreaInsets()
  const translateY = useSharedValue(-(scale(200) + top)) // Khởi tạo vị trí trên cao

  useEffect(() => {
    translateY.value = withTiming(0, {duration: 600}) // Animation xuống từ trên
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }))

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {/* <LinearGradient
        colors={[theme.colors.sidebar.blue, theme.colors.sidebar.darkBlue]}
        locations={[0, 0.22]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.container_inner}>
        <AppImage
          source={Icons.logoApp}
          style={{
            width: scale(100),
            height: scale(100),
            borderRadius: scale(75),
          }}
        />
        <AppText style={styles.title_bottom}>Đăng nhập vào hệ thống</AppText>
      </LinearGradient> */}
      <Animated.View style={styles.container_inner}>
        <AppImage
          source={Icons.logoApp}
          style={{
            width: scale(100),
            height: scale(100),
            borderRadius: scale(75),
          }}
        />
        <AppText style={styles.title_bottom}>Đăng nhập vào hệ thống</AppText>
        <AppText style={styles.title_bottom_sub}>
          Chào mừng bạn trở lại 🤚
        </AppText>
      </Animated.View>
    </Animated.View>
  )
}

export default HeaderLogin

const HeaderStyles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  const {top} = useSafeAreaInsets()
  return StyleSheet.create({
    container: {
      // backgroundColor: colors.primary,
      // backgroundColor: colors.white,
      height: scale(200) + top,
      borderBottomLeftRadius: scale(50),
      backgroundColor: 'transparent',
      // alignItems: 'center',
      // justifyContent: 'space-between',
      // elevation: scale(4), // shadow - android
      // shadowColor: '#000', // shadow - iOS
      // shadowOffset: {width: scale(2), height: scale(2)}, // shadow - iOS
      // shadowOpacity: 0.1, // shadow - iOS
      // shadowRadius: scale(4), // shadow - iOS
    },
    container_inner: {
      flex: 1,
      paddingTop: scale(22) + top,
      paddingBottom: scale(44),
      borderBottomLeftRadius: scale(50),
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title_top: {
      color: colors.white,
      fontSize: scaleFont(20),
      fontFamily: FONTSFAMILY.NunitoRegular,
    },
    title_bottom: {
      color: colors.title_login,
      fontSize: scaleFont(24),
      fontFamily: Fontsfamily.OpenSans.SemiBold,
    },
    title_bottom_sub: {
      color: colors.text.placeHolder,
      fontSize: scaleFont(14),
      marginTop: scale(5),
    },
  })
}
