import {Platform, StyleSheet, View} from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import AppText from '~/components/AppText'
import AppInput from '~/components/AppInput'
import AppInputPassword from '~/components/AppInputPassword'
import AppRatio from '~/components/AppRatio'
import AppButton from '~/components/AppButton'
import {useAppStyles} from '~/hooks'
import {scale, scaleFont} from '~/utils/scaleScreen'
import {Fontsfamily} from '~/styles/FontsFamily'
import AppConfig from '~/app/AppConfig'
import {DOMAIN} from '~/services/apis/endpoints'
import utils from '~/utils'

const LoginFormInput = ({
  form = {
    user: '',
    password: '',
    isRemember: false,
    host: '',
  },
  onChangeUserName = () => {},
  onChangePassword = () => {},
  onChangeRemember = () => {},
  onSubmit = () => {},
  onChangeHost = () => {},
}: {
  form: {
    user: string
    password: string
    isRemember: boolean
    host: string
  }
  onChangeUserName: (userName) => void
  onChangePassword: (passowrd) => void
  onChangeRemember: (isRemember) => void
  onSubmit: () => void
  onChangeHost: () => void
}) => {
  const styles = Styles()
  const translateY = useSharedValue(450) // Bắt đầu từ dưới
  const [showHost, setShowHost] = useState(false)

  useEffect(() => {
    translateY.value = withTiming(0, {duration: 600}) // Animation trượt lên
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }))

  const onChangeConfigHost = () => {
    if (form.password === 'nst@321543') {
      setShowHost(true)
    }
  }

  const validateUrl = url => {
    const regex = /^https:\/\/[a-z0-9.-]+\.[a-z]{2,}(:\d+)?(\/[^\s]*)?$/i
    return regex.test(url)
  }

  const onSubmitForm = async () => {
    if (showHost && form.password === 'nst@321543') {
      if (!validateUrl(form.host)) {
        utils.showMessageFlash({
          message: 'Thông báo',
          description: 'Đường dẫn không đúng định dạng. Kiểm tra lại',
          type: 'danger',
          duration: 2500,
          icon: 'danger',
        })
        return
      }
      try {
        utils.showLoadingFullApp({
          show: true,
        })
        const testUrl = `${form.host}` // hoặc /health, hoặc endpoint nào backend đảm bảo có
        const response = await fetch(testUrl, {method: 'GET', timeout: 3000})
        utils.showLoadingFullApp({
          show: false,
        })
        if (response.ok) {
          const hostPerfect =
            form.host[form.host.length - 1] !== '/'
              ? `${form.host}/`
              : form.host
          AppConfig.host = hostPerfect
          DOMAIN.MAIN = hostPerfect
          setShowHost(false)
          onChangePassword('')
          utils.showMessageFlash({
            message: 'Thông báo',
            description: 'Đổi thông tin cấu hình ứng dụng thành công.',
            type: 'success',
            duration: 2500,
            icon: 'success',
          })
        } else {
          utils.showMessageFlash({
            message: 'Thông báo',
            description: 'Không nhận được phản hồi từ đường dẫn',
            type: 'danger',
            duration: 2500,
            icon: 'danger',
          })
        }
      } catch (error) {
        utils.showMessageFlash({
          message: 'Lỗi',
          description: 'Host không khả dụng. Vui lòng kiểm tra lại đường dẫn.',
          type: 'error',
          duration: 3000,
          icon: 'error',
        })
      }
    } else {
      onSubmit()
    }
  }

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.container_input}>
        <AppText style={styles.text}>Tên đăng nhập</AppText>
        <AppInput
          value={form.user}
          onChangeText={text => {
            onChangeUserName(text)
          }}
          placeholder="Tài khoản"
          style={styles.input}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.container_input}>
        <AppText style={styles.text}>Mật khẩu</AppText>
        <AppInputPassword
          value={form.password}
          onChangeText={text => {
            onChangePassword(text)
          }}
          placeholder="Mật khẩu"
          style={styles.input}
          onSubmitEditing={showHost ? () => {} : onSubmitForm}
          autoCapitalize="none"
        />
      </View>
      {showHost && (
        <View style={styles.container_input}>
          <AppText style={styles.text}>Host</AppText>
          <AppInput
            value={form.host}
            onChangeText={text => {
              onChangeHost(text)
            }}
            placeholder="Host"
            style={styles.input}
            keyboardType="url"
          />
        </View>
      )}
      <AppRatio
        value={form.isRemember}
        getIsTick={isTick => {
          onChangeRemember(isTick)
        }}>
        <AppText style={styles.text_remember}>Ghi nhớ đăng nhập</AppText>
      </AppRatio>
      <AppButton
        onLongPress={onChangeConfigHost}
        onPress={onSubmitForm}
        title={showHost ? 'Xác nhận cấu hình' : 'Đăng nhập'}
        styleTitle={styles.loginTxt}
        colorsLinear={['#4188D6', '#2C68BF']}
        styleButton={styles.button_login}
      />
    </Animated.View>
  )
}

export default LoginFormInput

const Styles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    container: {
      gap: scale(16),
      padding: scale(24),
      backgroundColor: colors.white,
      alignSelf: 'center',
      minWidth: scale(340),
      borderRadius: scale(30),
      borderCurve: 'continuous',
    },
    container_input: {
      gap: scale(8),
    },
    text: {
      fontSize: scaleFont(14),
      color: colors.text.secondary,
    },
    text_remember: {
      fontSize: scaleFont(14),
    },
    input: {
      backgroundColor: colors.white,
      borderColor: colors.border,
      borderWidth: scale(1),
      // height: scale(36),
      paddingVertical: Platform.OS === 'ios' ? scale(13) : scale(7),
      borderRadius: scale(13),
      paddingHorizontal: scale(8),
    },
    button_login: {
      borderRadius: scale(15),
    },
    loginTxt: {
      color: colors.white,
      fontFamily: Fontsfamily.Nunito.ExtraBold,
    },
  })
}
