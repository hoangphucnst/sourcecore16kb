import React, {useEffect, useRef, useState} from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  Platform,
  KeyboardAvoidingView,
} from 'react-native'
import Animated from 'react-native-reanimated'
import {Icons} from '~/assets'
import AppButton from '~/components/AppButton'
import AppImage from '~/components/AppImage'
import AppInput from '~/components/AppInput'
import AppText from '~/components/AppText'
import {useAppStyles, useFadeBackgroundAnimation} from '~/hooks'
import {useAuth} from '~/redux/reduxHooks'
import {Fontsfamily} from '~/styles/FontsFamily'
import utils from '~/utils'
import {scale, scaleFont} from '~/utils/scaleScreen'

const OTP_LENGTH = 6

const Modal_AuthOTP = props => {
  const {username, callbackSuccess, isRemember, password} = utils.ngetParams(
    props,
    ['username', 'callbackSuccess', 'isRemember', 'password'],
    {
      username: null,
      callbackSuccess: () => {},
      isRemember: false,
      password: '',
    },
  )
  const styles = Styles()
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''))
  const inputsRef = useRef<Array<TextInput | null>>([])
  const timeStartAnimation = 150 * 5
  const timeEndAnimation = timeStartAnimation / 5
  const {login2FA} = useAuth()

  const {animatedStyle, startAnimation, endAnimation} =
    useFadeBackgroundAnimation({
      from: 0,
      to: 0.3,
      durationIn: timeStartAnimation,
      durationOut: timeEndAnimation,
    })

  const handleOTPChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return

    // If user pasted full 6-digit OTP
    if (text.length === OTP_LENGTH) {
      const newOtp = text.split('')
      setOtp(newOtp)
      inputsRef.current[OTP_LENGTH - 1]?.focus()
      return
    }

    // Normal single-digit input
    const newOtp = [...otp]
    newOtp[index] = text
    setOtp(newOtp)

    if (text && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleSubmit = () => {
    const enteredOtp = otp.join('')
    endAnimation({
      callback: () => {
        if (enteredOtp.length === OTP_LENGTH) {
          setTimeout(() => {
            login2FA(
              {username: username, otp: enteredOtp, isRemember, password},
              callbackSuccess,
            )
          }, 250)
        } else {
          utils.showMessageFlash({
            message: 'Mã OTP gồm 6 chữ số',
            description: `Vui lòng nhập đầy đủ mã OTP.`,
            icon: 'warning',
            type: 'warning',
          })
        }
      },
    })
  }

  const handleCancel = () => {
    endAnimation({
      callback: () => {
        console.log('OTP cancelled')
        utils.goBackNavigation()
      },
    })
  }

  useEffect(() => {
    setTimeout(() => {
      startAnimation({
        callback: () => {
          inputsRef.current[0]?.focus()
        },
      })
    }, timeEndAnimation)
  }, [])

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        style={styles.avodingView}>
        <View style={styles.modal}>
          <View style={styles.iconBlock}>
            <AppImage
              style={styles.iconAuthen}
              source={Icons.icAccessControl}
            />
          </View>
          <AppText style={styles.title}>Xác thực hai bước</AppText>
          <AppText style={styles.subTitle}>
            Vui lòng nhập mã xác thực 6 chữ số từ ứng dụng Authenticator của bạn
          </AppText>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <AppInput
                key={index}
                ref={ref => (inputsRef.current[index] = ref)}
                style={styles.otpInput}
                keyboardType="number-pad"
                maxLength={index === 0 && otp[0].length === 0 ? 6 : 1}
                value={digit}
                onChangeText={text => handleOTPChange(text, index)}
                onKeyPress={({nativeEvent}) => {
                  if (
                    nativeEvent.key === 'Backspace' &&
                    otp[index] === '' &&
                    index > 0
                  ) {
                    const newOtp = [...otp]
                    newOtp[index - 1] = ''
                    setOtp(newOtp)
                    inputsRef.current[index - 1]?.focus()
                  }
                }}
                returnKeyType="done"
              />
            ))}
          </View>
          <View style={styles.buttonRow}>
            <AppButton
              onPress={handleCancel}
              title="Huỷ"
              styleButton={[styles.button, styles.cancelButton]}
              styleTitle={[styles.buttonText, styles.cancelText]}
            />
            <AppButton
              onPress={handleSubmit}
              title="Xác thực"
              styleButton={[styles.button]}
              styleTitle={styles.buttonText}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Animated.View>
  )
}

export default Modal_AuthOTP

const Styles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avodingView: {
      width: '85%',
    },
    modal: {
      backgroundColor: colors.white,
      padding: scale(24),
      borderRadius: scale(16),
      alignItems: 'center',
    },
    title: {
      fontSize: scaleFont(20),
      fontWeight: 'bold',
      marginBottom: scale(4),
      textAlign: 'center',
    },
    subTitle: {
      fontSize: scaleFont(14),
      marginBottom: scale(16),
      textAlign: 'center',
      fontFamily: Fontsfamily.Nunito.Medium,
      color: colors.text.secondary,
    },
    otpContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: scale(12),
    },
    otpInput: {
      width: scale(44),
      height: scale(44),
      borderWidth: scale(1),
      borderColor: colors.border,
      borderRadius: scale(8),
      textAlign: 'center',
      fontSize: scaleFont(18),
      marginHorizontal: scale(4),
      backgroundColor: colors.input.background,
    },
    buttonRow: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      marginTop: scale(12),
    },
    button: {
      flex: 1,
      marginHorizontal: scale(5),
      paddingVertical: scale(12),
      borderRadius: scale(8),
      backgroundColor: colors.primary,
      alignItems: 'center',
    },
    buttonText: {
      color: colors.white,
    },
    cancelButton: {
      backgroundColor: colors.app.background,
    },
    cancelText: {
      color: colors.text.primary,
    },
    iconBlock: {
      width: scale(64),
      height: scale(64),
      borderRadius: scale(64 / 2),
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: scale(12),
    },
    iconAuthen: {
      width: scale(36),
      height: scale(36),
      tintColor: colors.white,
    },
  })
}
