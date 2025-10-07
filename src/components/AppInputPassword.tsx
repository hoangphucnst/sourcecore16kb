import React, {forwardRef, useState} from 'react'
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native'
import {useAppStyles} from '~/hooks'
import {AppTheme} from '~/styles/Theme'
import {scale} from '~/utils/scaleScreen'
import AppImage from './AppImage'
import {Icons} from '~/assets'

const AppInputPassword = forwardRef<TextInput, TextInputProps>(
  ({style, ...rest}, ref) => {
    const {THEME} = useAppStyles()
    const styles = AppInputPasswordStyles(THEME)
    const [visible, setVisible] = useState(true)

    return (
      <View>
        <TextInput
          ref={ref}
          {...rest}
          onChangeText={text => {
            rest.onChangeText?.(text)
          }}
          style={[{color: THEME.colors.text.primary}, style]}
          placeholderTextColor={
            rest.placeholderTextColor ?? THEME.colors.text.placeHolder
          }
          secureTextEntry={visible}
        />
        <TouchableOpacity
          onPress={() => {
            setVisible(prev => !prev)
          }}
          style={styles.container_icon}>
          <AppImage
            source={visible ? Icons.icVisible : Icons.icNotVisible}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    )
  },
)

AppInputPassword.displayName = 'AppInputPassword'

export default AppInputPassword

const AppInputPasswordStyles = (theme: AppTheme) => {
  const {colors} = theme
  return StyleSheet.create({
    container_icon: {
      position: 'absolute',
      height: '100%',
      paddingRight: scale(10),
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      width: scale(20),
      height: scale(20),
      tintColor: colors.primary,
    },
  })
}
