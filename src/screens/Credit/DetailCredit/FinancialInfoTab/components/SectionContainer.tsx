import {StyleSheet, View, ViewProps} from 'react-native'
import React from 'react'
import {scale} from '~/utils/scaleScreen'
import {useAppStyles} from '~/hooks'

const SectionContainer: React.FC<ViewProps> = ({children, style, ...props}) => {
  const {THEME} = useAppStyles()
  const {colors} = THEME

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: colors.white, borderRadius: scale(10)},
        style,
      ]}
      {...props}>
      {children}
    </View>
  )
}

export default SectionContainer

const styles = StyleSheet.create({
  container: {
    padding: scale(10),
  },
})
