import {ActivityIndicator, StyleSheet, View} from 'react-native'
import React from 'react'
import {AppTheme} from '~/styles/Theme'
import {scale} from '~/utils/scaleScreen'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useAppStyles} from '~/hooks'

const LoadingList = ({isScrollable}: {isScrollable: boolean}) => {
  const {THEME} = useAppStyles()
  if (!isScrollable) return null
  const styles = LoadingListStyles(THEME)
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={THEME.colors.primary} />
    </View>
  )
}

const LoadingListStyles = (theme: AppTheme) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {colors, fonts} = theme
  const {bottom} = useSafeAreaInsets()
  return StyleSheet.create({
    container: {
      paddingHorizontal: scale(24),
      paddingTop: scale(24),
      paddingBottom: scale(24) + bottom,
    },
  })
}

export default LoadingList
