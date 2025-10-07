import {StyleSheet, View, ViewProps} from 'react-native'
import React from 'react'
import {scale} from '~/utils/scaleScreen'

const SectionWrapper: React.FC<ViewProps> = ({children, style, ...props}) => {
  return (
    <View style={[styles.wrapper, style]} {...props}>
      {children}
    </View>
  )
}

export default SectionWrapper

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    gap: scale(10),
  },
})
