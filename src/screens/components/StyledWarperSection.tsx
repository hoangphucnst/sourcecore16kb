import {StyleSheet, View} from 'react-native'
import React from 'react'
import {scale} from '~/utils/scaleScreen'
import {useAppStyles} from '~/hooks'

interface StyledWarperSectionProps {
  children: React.ReactNode
  style?: StyleSheet
}

const StyledWarperSection: React.FC<StyledWarperSectionProps> = ({
  children,
  style,
}) => {
  const styles = Styles()
  return <View style={[styles.container, style]}>{children}</View>
}

export default StyledWarperSection

const Styles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    container: {
      padding: scale(8),
      borderRadius: scale(10),
      backgroundColor: colors.white,
    },
  })
}
