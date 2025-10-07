import {StyleSheet, View, ViewProps} from 'react-native'
import React, {useCallback} from 'react'
import {useAppStyles} from '~/hooks'
import {AppTheme} from '~/styles/Theme'
import {scale} from '~/utils/scaleScreen'

type PropsSeparator = {
  style?: ViewProps
}

const Separator = (props: PropsSeparator) => {
  const {THEME} = useAppStyles()
  const styles = useCallback(styleWithTheme, [THEME])(THEME)
  return <View style={[styles.container, props.style]} />
}

export default Separator

const styleWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    container: {
      marginTop: scale(8),
    },
  })
