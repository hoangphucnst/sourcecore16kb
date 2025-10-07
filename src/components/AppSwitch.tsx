import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated'
import {useAppStyles} from '~/hooks'

interface AppSwitchProps {
  isSelected?: boolean
  onPress?: () => void
}

const AppSwitch: React.FC<AppSwitchProps> = ({
  isSelected = false,
  onPress = () => {},
}) => {
  const {THEME} = useAppStyles()
  const colorSwith = THEME.colors.primary || 'green'
  const radioAnimated = useSharedValue(0)

  const circleColorAnimated = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      radioAnimated.value,
      [0, 20],
      ['rgba(0,0,0,0.3)', colorSwith],
    )
    return {backgroundColor, borderColor: backgroundColor}
  })

  const lineColorAnimated = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        radioAnimated.value,
        [0, 20],
        ['rgba(0,0,0,0.1)', `${colorSwith}3A`],
      ),
    }
  })

  React.useEffect(() => {
    if (isSelected) {
      radioAnimated.value = withTiming(20, {duration: 300})
    } else {
      radioAnimated.value = withTiming(0, {duration: 300})
    }
  }, [isSelected, radioAnimated])

  const circleStyle = useAnimatedStyle(() => {
    return {
      left: radioAnimated.value,
    }
  })

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Animated.View style={[styles.line_default, lineColorAnimated]} />
      <Animated.View
        style={[styles.circle_default, circleStyle, circleColorAnimated]}
      />
    </TouchableOpacity>
  )
}

export default AppSwitch
const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 'auto',
  },
  line_default: {
    width: '100%',
    height: 20,
    borderRadius: 10,
  },
  circle_default: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 15,
  },
})
