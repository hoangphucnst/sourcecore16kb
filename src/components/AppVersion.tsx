import {StyleSheet, TextStyle, View} from 'react-native'
import React from 'react'
import AppText from './AppText'
import {scale, scaleFont} from '~/utils/scaleScreen'
import {useAppStyles} from '~/hooks'
import AppConfig from '~/app/AppConfig'

const AppVersion = ({styleText}: {styleText: TextStyle}) => {
  const {THEME} = useAppStyles()
  const {colors, fonts} = THEME
  return (
    <View style={styles.container}>
      <AppText
        style={[
          styles.text,
          {color: colors.text.titleTable, fontWeight: fonts.medium},
          styleText,
        ]}>
        Version {AppConfig.version}
      </AppText>
    </View>
  )
}

export default AppVersion

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: scale(16),
  },
  text: {
    fontSize: scaleFont(14),
  },
})
