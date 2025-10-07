import {StyleSheet, View} from 'react-native'
import React, {useState} from 'react'
import {useAppStyles} from '~/hooks'
import {AppTheme} from '~/styles/Theme'
import Components from '~/components'
import utils from '~/utils'
import {useDispatch} from 'react-redux'
import {AppDispatch} from '~/redux/store'
import {AuthenLogout} from '~/redux/slices/AuthSlice'

type KeyInput = 'passOld' | 'passNew' | 'passCheck'

const ChangePassword = () => {
  const {THEME} = useAppStyles()
  const styles = stylesWithTheme(THEME)
  const [secureText1, setSecureText1] = useState(true)
  const [secureText2, setSecureText2] = useState(true)
  const [secureText3, setSecureText3] = useState(true)
  const [passOld, setPassOld] = useState('')
  const [passNew, setPassNew] = useState('')
  const [passCheck, setPassCheck] = useState('')
  const [error, setError] = useState('')

  const dispatch = useDispatch<AppDispatch>()

  // Function back navigation
  const onBack = () => {
    utils.goBackNavigation()
  }

  // Fuction check pass old
  const checkPassOld = (pass: string, _passOld: string) => {
    if (pass !== _passOld) return true
    return false
  }

  // Function check condition pass new
  const checkPassNew = (password: string) => {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    if (password.length <= minLength) {
      return 'Mật khẩu phải dài hơn 8 ký tự.'
    }
    if (!hasUpperCase) {
      return 'Mật khẩu phải chứa ít nhất một chữ cái viết hoa.'
    }
    if (!hasLowerCase) {
      return 'Mật khẩu phải chứa ít nhất một chữ cái viết thường.'
    }
    if (!hasNumber) {
      return 'Mật khẩu phải chứa ít nhất một chữ số.'
    }
    if (!hasSpecialChar) {
      return 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt.'
    }
    return 'Mật khẩu hợp lệ.'
  }

  // Fucton message logout
  const onSignOut = (text: string, isLogOut: boolean) => {
    utils.messageBox({
      showCancel: false,
      title: 'Thông báo',
      message: text,
      labelConfirm: 'Xác nhận',
      onConfirm: () => {
        isLogOut ? dispatch(AuthenLogout()) : null
      },
    })
  }

  const onChangeInput = (key: KeyInput) => (value: string) => {
    const setValue = {
      passOld: (str: string) => setPassOld(str),
      passNew: (str: string) => setPassNew(str),
      passCheck: (str: string) => setPassCheck(str),
    }
    setValue?.[key](value)
    if (key === 'passNew') setError(checkPassNew(passNew))
  }

  // Function check condition reset password
  const buttonReset = () => {
    if (passOld === '' || passNew === '' || passCheck === '')
      onSignOut('Vui lòng nhập đầy đủ thông tin', false)
    else if (checkPassOld(passOld, '123456'))
      onSignOut('Mật khẩu cũ không đúng', false)
    else {
      if (checkPassNew(passNew) !== 'Mật khẩu hợp lệ.') {
        onSignOut(checkPassNew(passNew), false)
      } else if (passNew !== passCheck)
        onSignOut('Mật khẩu nhập lại không trùng khớp', false)
      else onSignOut('Đổi mật khẩu thành công', true)
    }
  }

  return (
    <View style={[styles.container]}>
      <Components.AppHeader
        title="Đổi mật khẩu"
        componentLeft={
          <Components.AppIconVector.Ionicons name={'chevron-back'} />
        }
        onPressLeft={onBack}
      />
      <View style={styles.viewContain}>
        <Components.AppScrollViewBody
          horizontalInit={THEME.sizes.horizontal_13}
          contentContainerStyle={{
            padding: THEME.sizes.horizontal_13,
          }}>
          <View style={styles.viewConstainIput}>
            <Components.AppText style={[styles.textDetail]}>
              Mật khẩu cũ
            </Components.AppText>
            <View style={styles.viewInput}>
              <Components.AppInput
                placeholder="Mật khẩu cũ"
                style={styles.textInput}
                secureTextEntry={secureText1}
                onChangeText={onChangeInput('passOld')}
              />
              <Components.AppIconVector.Ionicons
                name={secureText1 ? 'eye-off' : 'eye'}
                onPress={() => setSecureText1(!secureText1)}
                style={{color: THEME.colors.primary}}
                size={20}
              />
            </View>
            <Components.AppText
              style={[styles.textDetail, {marginTop: THEME.sizes.mg20}]}>
              Mật khẩu mới
            </Components.AppText>
            <View style={styles.viewInput}>
              <Components.AppInput
                placeholder="Mật khẩu mới"
                style={styles.textInput}
                secureTextEntry={secureText2}
                onChangeText={onChangeInput('passNew')}
              />
              <Components.AppIconVector.Ionicons
                name={secureText2 ? 'eye-off' : 'eye'}
                onPress={() => setSecureText2(!secureText2)}
                style={{color: THEME.colors.primary}}
                size={20}
              />
            </View>
            <Components.AppText
              style={[
                styles.textError,
                {
                  color:
                    error === 'Mật khẩu hợp lệ.'
                      ? THEME.colors.online
                      : THEME.colors.error,
                },
              ]}>
              {error !== '' && passNew !== '' && error}
            </Components.AppText>
            <Components.AppText style={[styles.textDetail]}>
              Nhập lại mật khẩu mới
            </Components.AppText>
            <View style={styles.viewInput}>
              <Components.AppInput
                placeholder="Nhập lại mật khẩu"
                style={styles.textInput}
                secureTextEntry={secureText3}
                onChangeText={onChangeInput('passCheck')}
              />
              <Components.AppIconVector.Ionicons
                name={secureText3 ? 'eye-off' : 'eye'}
                onPress={() => setSecureText3(!secureText3)}
                style={{color: THEME.colors.primary}}
                size={20}
              />
            </View>
            <Components.AppText
              style={[
                styles.textError,
                {
                  color:
                    passCheck !== '' && passNew !== passCheck
                      ? THEME.colors.error
                      : THEME.colors.online,
                },
              ]}>
              {passCheck !== '' && passNew !== passCheck
                ? `Mật khẩu nhập lại không trùng khớp`
                : passCheck !== '' && passNew === passCheck
                  ? `Mật khẩu nhập lại trùng khớp`
                  : ''}
            </Components.AppText>
          </View>
          <Components.AppButton
            title="Đổi mật khẩu"
            styleButton={{marginTop: THEME.sizes.mg10}}
            onPress={buttonReset}
          />
          <Components.AppText style={{marginTop: THEME.sizes.mg20}}>
            {`Lưu ý:\n❖ Mật khẩu phải dài hơn 8 ký tự.\n❖ Mật khẩu có ít nhất một chữ cái viết hoa.\n❖ Mật khẩu có ít nhất một chữ cái viết thường.\n❖ Mật khẩu có ít nhất một chữ số.\n❖ Mật khẩu có ít nhất một ký tự đặc biệt.`}
          </Components.AppText>
        </Components.AppScrollViewBody>
      </View>
    </View>
  )
}

export default ChangePassword

const stylesWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: THEME.colors.background,
      flex: 1,
      justifyContent: 'center',
    },
    viewContain: {
      flex: 1,
      backgroundColor: THEME.colors.background_2,
    },
    viewInput: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      borderRadius: 10,
      borderColor: THEME.colors.border,
      borderWidth: 1,
      backgroundColor: THEME.colors.white,
      paddingRight: 10,
    },
    viewConstainIput: {
      backgroundColor: THEME.colors.white,
      paddingHorizontal: THEME.sizes.horizontal_10,
      paddingTop: THEME.sizes.pd10,
      borderRadius: 10,
    },
    textInput: {
      flex: 1,
      padding: THEME.sizes.input_padding,
      backgroundColor: THEME.colors.white,
      borderRadius: 50,
    },
    textDetail: {
      fontSize: 15,
      marginBottom: 5,
      paddingLeft: 5,
    },
    textError: {
      paddingLeft: THEME.sizes.mg5,
      marginTop: THEME.sizes.mg5,
      height: THEME.sizes.h3,
      fontSize: THEME.sizes.h6,
      color: THEME.colors.error,
    },
  })
