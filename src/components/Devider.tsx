import {StyleSheet, View, ViewProps, ViewStyle} from 'react-native'
import React, {useCallback} from 'react'
import {useAppStyles} from '~/hooks'
import {AppTheme} from '~/styles/Theme'

const Devider = (props: ViewProps) => {
  const {THEME} = useAppStyles()
  const styles = useCallback(stylesWithThemem, [THEME])(THEME)
  return <View {...props} style={[styles.default, props.style]} />
}

export default Devider

const stylesWithThemem = (THEME: AppTheme) =>
  StyleSheet.create({
    default: {
      backgroundColor: THEME.colors.border,
      height: 1,
    },
  })
