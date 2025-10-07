import React, {useCallback} from 'react'
import AppText from './AppText'
import {StyleSheet, View, ViewStyle} from 'react-native'
import {AppTheme} from '~/styles/Theme'
import {useAppStyles} from '~/hooks'

type PropsBagde = {
  data?: string | undefined
  style?: ViewStyle | ViewStyle[]
  color?: string | undefined
  styleValue?: ViewStyle | ViewStyle[]
}

const Badge = (props: PropsBagde) => {
  const {color, data, style, styleValue} = props
  const {THEME} = useAppStyles()
  const styles = useCallback(styleWithTheme, [THEME])(THEME)
  const styleBadge: ViewStyle = {
    backgroundColor: color,
  }
  return (
    <View style={[styleBadge, styles.default_bagde, style]}>
      <AppText numberOfLines={1} style={[styles.default_value, styleValue]}>
        {data}
      </AppText>
    </View>
  )
}

export default Badge
const styleWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    default_bagde: {
      backgroundColor: 'red',
      borderRadius: 50,
      padding: THEME.sizes.pd2,
      paddingHorizontal: 3,
    },
    default_value: {
      fontSize: THEME.sizes.h7,
      color: THEME.colors.white,
    },
  })
