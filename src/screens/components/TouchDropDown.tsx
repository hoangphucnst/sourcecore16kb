import {StyleSheet, TouchableOpacity} from 'react-native'
import React, {useCallback} from 'react'
import {AppTheme} from '~/styles/Theme'
import {useAppStyles} from '~/hooks'
import AppText from '~/components/AppText'
import AppImage from '~/components/AppImage'
import {Icons} from '~/assets'
import {scale} from '~/utils/scaleScreen'

const TouchDropDown = ({
  value = '',
  onPress = () => {},
}: {
  value: string
  onPress: () => void
}) => {
  const {THEME} = useAppStyles()
  const styles = useCallback(styleWithTheme, [THEME])(THEME)

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <AppText numberOfLines={1} style={styles.value_drop}>
        {value}
      </AppText>
      <AppImage source={Icons.icDropDown_2} style={styles.icon_dropdown} />
    </TouchableOpacity>
  )
}

export default TouchDropDown

const styleWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: scale(10),
      borderColor: THEME.colors.border,
      borderWidth: 0.5,
      borderCurve: 'continuous',
      padding: scale(10),
    },
    icon_dropdown: {
      width: THEME.sizes.icon_20,
      height: THEME.sizes.icon_20,
      resizeMode: 'contain',
      tintColor: THEME.colors.text.secondary,
    },
    value_drop: {
      flex: 1,
    },
  })
