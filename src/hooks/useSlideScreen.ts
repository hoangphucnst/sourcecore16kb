import {useState, useEffect} from 'react'
import {Easing} from 'react-native-reanimated'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

export type SlideScreenLogic = {
  translateX: Animated.SharedValue<number>
  animatedStyle: any
  open: () => void
  close: () => void
  initHeightTransparent: (height: number) => void
  getStatus: () => boolean
}

const useSlideScreen = (initWidth: number): SlideScreenLogic => {
  const translateX = useSharedValue(-initWidth) // Bắt đầu màn hình ở ngoài bên trái
  const isOpen = useSharedValue(false)
  const [heightHeaderTransparent, setHeightHeaderTransparent] = useState(0)

  useEffect(() => {
    translateX.value = isOpen.value ? 0 : -initWidth
  }, [initWidth])

  const open = () => {
    translateX.value = withTiming(0, {
      duration: 200,
      easing: Easing.linear,
    })
    isOpen.value = true
  }

  const close = () => {
    translateX.value = withTiming(-initWidth, {
      duration: 200,
      easing: Easing.linear,
    })
    isOpen.value = false
  }

  const initHeightTransparent = (height: number) =>
    setHeightHeaderTransparent(height)

  const getStatus = () => isOpen.value

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }))

  return {
    heightHeaderTransparent,
    translateX,
    animatedStyle,
    open,
    close,
    initHeightTransparent,
    getStatus,
  }
}

export default useSlideScreen
