import React, {forwardRef} from 'react'
import {TextInput, TextInputProps} from 'react-native'
import {useAppStyles} from '~/hooks'

const AppInput = forwardRef<TextInput, TextInputProps>(
  ({children, style, ...rest}, ref) => {
    const {THEME} = useAppStyles()
    return (
      <TextInput
        ref={ref}
        {...rest}
        onChangeText={text => {
          rest.onChangeText?.(text)
        }}
        style={[{color: THEME.colors.text.primary}, style]}
        placeholderTextColor={
          rest.placeholderTextColor ?? THEME.colors.text.placeHolder
        }>
        {children}
      </TextInput>
    )
  },
)

AppInput.displayName = 'AppInput'

export default AppInput
