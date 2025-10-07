import React from 'react'
import {useAppStyles} from '~/hooks'
import AppVersion from '~/components/AppVersion'
import {scale, scaleFont} from '~/utils/scaleScreen'
import HeaderLogin from './components/HeaderLogin'
import AppScrollViewBody from '~/components/AppScrollViewBody'
import {Icons} from '~/assets'
import useLogin from './hooks/useLogin'
import LoginFormInput from './components/LoginFormInput'
import {ImageBackground, StyleSheet} from 'react-native'

const Login = () => {
  const styles = Styles()
  const {
    userName,
    setUserName,
    password,
    setPassword,
    isRemember,
    setIsRemember,
    onLogin,
    host,
    setHost,
  } = useLogin()

  return (
    <ImageBackground source={Icons.imgBackgroundLogin} style={styles.container}>
      <AppScrollViewBody
        bounces={false}
        style={styles.scrollview}
        // horizontalInit={scale(8)}
      >
        <HeaderLogin />
        <LoginFormInput
          form={{
            user: userName,
            password: password,
            isRemember: isRemember,
            host: host,
          }}
          onChangeUserName={name => {
            setUserName(name?.toLowerCase())
          }}
          onChangePassword={newText => {
            setPassword(newText)
          }}
          onChangeRemember={setIsRemember}
          onSubmit={onLogin}
          onChangeHost={setHost}
        />
      </AppScrollViewBody>
      <AppVersion />
    </ImageBackground>
  )
}

export interface LoginFormInputRef {
  hideForm: () => void
}

export default Login

const Styles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    container: {flex: 1, gap: scale(32)},
    text: {
      fontSize: scaleFont(14),
    },
    container_button: {
      width: '100%',
      height: scale(36),
      backgroundColor: colors.primary,
      borderRadius: scale(8),
      alignItems: 'center',
      justifyContent: 'center',
    },
    textButton: {
      fontSize: scaleFont(14),
      color: colors.white,
    },
    scrollview: {
      width: '100%',
      gap: scale(24),
    },
  })
}
