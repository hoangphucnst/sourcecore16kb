import {StyleSheet, View} from 'react-native'
import React from 'react'
import {useAppStyles} from '~/hooks'
import {scale} from '~/utils/scaleScreen'

interface StyledTabWarperProps {
  children: React.ReactNode
}

const StyledTabWarper: React.FC<StyledTabWarperProps> = ({children}) => {
  const styles = Styles()
  return <View style={styles.container}>{children}</View>
}

export default StyledTabWarper

const Styles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingBottom: scale(150),
    },
  })
}
