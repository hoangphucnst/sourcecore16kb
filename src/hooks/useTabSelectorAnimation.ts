import {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated'

const useTabSelectorAnimation = (tabWidth: number) => {
  const selectorX = useSharedValue(0)
  const timeAnimation = 250

  const onTabChange = (index: number) => {
    selectorX.value = withTiming(index * tabWidth, {duration: timeAnimation})
  }

  const selectorStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: selectorX.value}],
    }
  })

  return {
    selectorStyle,
    onTabChange,
  }
}

export default useTabSelectorAnimation
