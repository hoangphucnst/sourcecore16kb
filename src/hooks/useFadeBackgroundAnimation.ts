import {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated'

const useFadeBackgroundAnimation = (
  config = {from: 0, to: 0.3, durationIn: 750, durationOut: 150},
) => {
  const opacity = useSharedValue(config.from)

  const startAnimation = ({
    callback = () => {},
  }: {callback?: () => void} = {}) => {
    opacity.value = withTiming(
      config.to,
      {duration: config.durationIn},
      finished => {
        if (finished) {
          runOnJS(callback)()
        }
      },
    )
  }

  const endAnimation = ({
    callback = () => {},
  }: {callback?: () => void} = {}) => {
    opacity.value = withTiming(
      config.from,
      {duration: config.durationOut},
      finished => {
        if (finished) {
          runOnJS(callback)()
        }
      },
    )
  }

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: `rgba(0,0,0,${opacity.value})`,
  }))

  return {
    animatedStyle,
    startAnimation,
    endAnimation,
  }
}

export default useFadeBackgroundAnimation
