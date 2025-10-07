import React, {useEffect} from 'react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated'
import NotiCard from './NotiCard'
import {Notification} from '~/services/apis/notificationService'

const timeAnimation = 100
const timeTransAnimation = 100
let timeline = timeAnimation // Dùng chung cho tất cả item

const NotiAnimatedItem = ({
  item,
  index,
  onPressItem,
}: {
  item: Notification
  index: number
  onPressItem: (item: Notification, index: number) => void
}) => {
  // const translateX = useSharedValue(100)
  const translateY = useSharedValue(100)
  const opacity = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
    opacity: opacity.value,
  }))

  useEffect(() => {
    if (index > 9) return
    const delay = timeline
    timeline += timeAnimation

    setTimeout(() => {
      translateY.value = withTiming(0, {
        duration: timeTransAnimation,
        easing: Easing.out(Easing.ease),
      })
      opacity.value = withTiming(1, {duration: timeTransAnimation})
    }, delay)

    return () => {
      if (index === 0) timeline = timeAnimation // reset khi unmount list
    }
  }, [])

  const handlePress = () => {
    onPressItem(item, index)
  }

  if (index > 9) {
    return <NotiCard notiItem={item} onPress={handlePress} />
  }

  return (
    <Animated.View style={animatedStyle}>
      <NotiCard notiItem={item} onPress={handlePress} />
    </Animated.View>
  )
}

export default NotiAnimatedItem
