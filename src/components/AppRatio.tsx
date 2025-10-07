import {Image, StyleSheet, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import {Icons} from '~/assets'
import {scale} from '~/utils/scaleScreen'
import {useAppStyles} from '~/hooks'
import {AppTheme} from '~/styles/Theme'

interface AppRatioProps {
  value: boolean
  getIsTick: (isTick: boolean) => void
  children: React.ReactNode
  style: StyleSheet
  props: any
}

const AppRatio: React.FC<AppRatioProps> = ({
  value = false,
  getIsTick = () => {},
  children,
  style,
  props,
}) => {
  const [isTick, setIsTick] = useState(value)
  const {THEME} = useAppStyles()
  const styles = AppStyles(THEME)
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      {...props}
      onPress={() => {
        getIsTick(!isTick)
        setIsTick(prev => !prev)
      }}>
      <View style={styles.boxTick}>
        {isTick ? (
          <Image source={Icons.icTick} style={styles.icon} />
        ) : (
          <Image source={Icons.icUnTick} style={styles.icon} />
        )}
      </View>
      {children}
    </TouchableOpacity>
  )
}

export default AppRatio

const AppStyles = (theme: AppTheme) => {
  const {colors} = theme
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: scale(8),
    },
    icon: {
      width: scale(20),
      height: scale(20),
    },
    boxTick: {
      width: scale(20),
      height: scale(20),
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
}
