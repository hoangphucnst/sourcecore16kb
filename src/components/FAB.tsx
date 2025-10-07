import React, {useState} from 'react'
import {
  Dimensions,
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated'
import AppImage from './AppImage'
import {Icons} from '~/assets'
import {scale} from '~/utils/scaleScreen'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useAppStyles} from '~/hooks'

const {width, height} = Dimensions.get('window')

export interface FABItem {
  idItem: string
  icon: string
  title?: string
  backgroundColor?: string
  textColor?: string
}

export interface HiddenMenu {
  list: FABItem[]
  showText: boolean
}

interface FABProps {
  padding: number
  autoDragToCorner: boolean
  staticMenu?: FABItem[]
  hiddenMenu?: HiddenMenu
  fullScreen?: boolean
  onPress: (idItem: string) => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isPointInsideCircle = (
  pointX: number,
  pointY: number,
  centerX: number,
  centerY: number,
  radius: number,
): boolean => {
  const distanceSquared = (pointX - centerX) ** 2 + (pointY - centerY) ** 2
  return distanceSquared <= radius ** 2
}

const isPointInsideRectangle = (
  pointX: number,
  pointY: number,
  centerX: number,
  centerY: number,
  _width: number,
  _height: number,
): boolean => {
  const left = centerX - _width / 2
  const right = centerX + _width / 2
  const top = centerY - _height / 2
  const bottom = centerY + _height / 2

  return pointX >= left && pointX <= right && pointY >= top && pointY <= bottom
}

const FAB: React.FC<FABProps> = ({
  padding = scale(10),
  autoDragToCorner = true,
  fullScreen = false,
  staticMenu = [],
  hiddenMenu = {
    list: [],
    showText: true,
  },
  onPress = () => {},
}) => {
  const newPadding = padding + scale(10)
  const sizeCircle = scale(50)
  const sizeIcon = scale(24)
  const {top} = useSafeAreaInsets()
  const [viewWidth, setViewWidth] = useState(0)
  const [viewHeight, setViewHeight] = useState(0)
  const styles = Styles(sizeCircle, sizeIcon, viewHeight)
  const upperLimitX = -width + scale(10) + newPadding + viewWidth
  const lowerLimitX = sizeCircle / 2 - newPadding
  const upperLimitY =
    -height + sizeCircle + top + newPadding + scale(fullScreen ? 0 : 30)
  const lowerLimitY = sizeCircle / 2 - scale(20)
  const offsetX = useSharedValue(lowerLimitX)
  const offsetY = useSharedValue(lowerLimitY)
  const isAllowDrag = useSharedValue(0)
  const startX = useSharedValue(lowerLimitX)
  const startY = useSharedValue(lowerLimitY)
  const [showHiddenMenu, setShowHiddenMenu] = useState(false)
  const [isOnLeft, setIsOnLeft] = useState(false)
  const [isOnTop, setIsOnTop] = useState(false)
  const degAnimated = useSharedValue(0)
  const transparentNumberAnimated = useSharedValue(0)
  const opacityAnimated = useSharedValue(0)
  const posYAnimated = useSharedValue(0)
  const transYmove = useSharedValue(0)

  const handleLayout = (event: LayoutChangeEvent) => {
    const layout_width = event.nativeEvent.layout.width
    setViewWidth(layout_width)
  }

  const handleLayout_vertical = (event: LayoutChangeEvent) => {
    const layout_height = event.nativeEvent.layout.height
    setViewHeight(layout_height)
  }

  const processX = x => {
    if (x < upperLimitX) {
      return upperLimitX
    }
    if (x > lowerLimitX) return lowerLimitX
    return x
  }

  const processY = y => {
    if (y < upperLimitY) return upperLimitY
    if (y > lowerLimitY) return lowerLimitY
    return y
  }

  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    if (isAllowDrag.value === 1) return
    offsetX.value = processX(startX.value + event.nativeEvent.translationX)
    offsetY.value = processY(startY.value + event.nativeEvent.translationY)
  }

  const onHandlerStateChange = (event: HandlerStateChangeEvent) => {
    if (event.nativeEvent.state === 5) {
      startX.value = offsetX.value
      startY.value = offsetY.value
      if (autoDragToCorner) {
        const isBottomRight = isPointInsideRectangle(
          offsetX.value,
          offsetY.value,
          lowerLimitX,
          lowerLimitY,
          (width - viewWidth) / 2,
          height - top,
        )
        const isBottomLeft = isPointInsideRectangle(
          offsetX.value,
          offsetY.value,
          upperLimitX,
          lowerLimitY,
          (width - viewWidth) / 2,
          height - top,
        )
        const isTopRight = isPointInsideRectangle(
          offsetX.value,
          offsetY.value,
          lowerLimitX,
          upperLimitY,
          (width - viewWidth) / 2,
          height - top,
        )
        const isTopLeft = isPointInsideRectangle(
          offsetX.value,
          offsetY.value,
          upperLimitX,
          upperLimitY,
          (width - viewWidth) / 2,
          height - top,
        )
        if (isBottomRight) {
          offsetX.value = withTiming(lowerLimitX, {
            duration: 250,
            easing: Easing.ease,
          })
          offsetY.value = withTiming(lowerLimitY, {
            duration: 250,
            easing: Easing.ease,
          })

          startX.value = lowerLimitX
          startY.value = lowerLimitY
        }
        if (isBottomLeft) {
          offsetX.value = withTiming(upperLimitX, {
            duration: 250,
            easing: Easing.ease,
          })
          offsetY.value = withTiming(lowerLimitY, {
            duration: 250,
            easing: Easing.ease,
          })

          startX.value = upperLimitX
          startY.value = lowerLimitY
        }
        if (isTopRight) {
          offsetX.value = withTiming(lowerLimitX, {
            duration: 250,
            easing: Easing.ease,
          })
          offsetY.value = withTiming(upperLimitY, {
            duration: 250,
            easing: Easing.ease,
          })

          startX.value = lowerLimitX
          startY.value = upperLimitY
        }
        if (isTopLeft) {
          offsetX.value = withTiming(upperLimitX, {
            duration: 250,
            easing: Easing.ease,
          })
          offsetY.value = withTiming(upperLimitY, {
            duration: 250,
            easing: Easing.ease,
          })

          startX.value = upperLimitX
          startY.value = upperLimitY
        }
      }
      const isLeft = offsetX.value < (lowerLimitX + upperLimitX) / 2
      const isTop = offsetY.value < (lowerLimitY + upperLimitY) / 2
      setIsOnLeft(isLeft)
      setIsOnTop(isTop)
    }
  }

  const fabStyle = useAnimatedStyle(() => {
    return {
      bottom: newPadding,
      right: newPadding,
      transform: [
        {
          translateX: offsetX.value,
        },
        {
          translateY: offsetY.value,
        },
      ],
    }
  })

  const rotateIconStyles = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${degAnimated.value}deg`}],
    }
  })

  const hiddenMenuItemStyles = useAnimatedStyle(() => {
    return {
      opacity: opacityAnimated.value,
      translateY: interpolate(transYmove.value, [0, 1], [0, 50]),
    }
  })

  const backgroundStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: `rgba(0, 0, 0, ${transparentNumberAnimated.value})`,
    }
  })

  const openHiddenMenu = () => {
    setShowHiddenMenu(prev => {
      isAllowDrag.value = prev ? 0 : 1
      degAnimated.value = withTiming(prev ? 0 : 90, {duration: 250})
      transparentNumberAnimated.value = withTiming(prev ? 0 : 0.4, {
        duration: 250,
      })
      opacityAnimated.value = withTiming(prev ? 0 : 1, {duration: 250})
      posYAnimated.value = withTiming(prev ? 0 : -200, {duration: 250})
      transYmove.value = withTiming(!prev ? 0 : 1, {
        duration: 150,
      })
      return !prev
    })
  }

  return (
    <View style={styles.container}>
      <Animated.View
        onTouchEnd={openHiddenMenu}
        pointerEvents={showHiddenMenu ? 'box-only' : 'none'}
        style={[{width: width, height: height + top}, backgroundStyles]}
      />
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <Animated.View style={[styles.floatingBase, fabStyle]}>
          {/* Horizontal Menu */}
          <View
            onLayout={handleLayout}
            style={[
              isOnLeft ? styles.horizontalMenuReverse : styles.horizontalMenu,
              showHiddenMenu && {marginRight: -scale(8)},
            ]}>
            {staticMenu.length > 0 &&
              staticMenu.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    onPress(item.idItem)
                  }}
                  key={`Horizontal_menu_${index}`}>
                  <View
                    style={[
                      styles.baseButton,
                      item?.backgroundColor && {
                        backgroundColor: item.backgroundColor,
                      },
                    ]}>
                    <AppImage source={item.icon} style={styles.icon} />
                  </View>
                </TouchableOpacity>
              ))}
            <TouchableOpacity onPress={openHiddenMenu} activeOpacity={0.6}>
              <Animated.View style={[styles.baseButton, rotateIconStyles]}>
                <AppImage source={Icons.icOptions} style={styles.icon} />
              </Animated.View>
            </TouchableOpacity>
            {showHiddenMenu && (
              <View
                style={
                  isOnTop ? styles.verticalMenuReverse : styles.verticalMenu
                }
                onLayout={handleLayout_vertical}>
                {hiddenMenu?.list?.length > 0 &&
                  hiddenMenu.list.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          onPress(item.idItem)
                        }}
                        key={`Vertical_menu_${index}`}>
                        <Animated.View
                          style={[
                            styles.baseButton,
                            item?.backgroundColor && {
                              backgroundColor: item.backgroundColor,
                            },
                            hiddenMenuItemStyles,
                          ]}>
                          <AppImage source={item.icon} style={styles.icon} />
                        </Animated.View>
                      </TouchableOpacity>
                    )
                  })}
              </View>
            )}
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}

const Styles = (sizeCircle, sizeIcon, viewHeight) => {
  const {top} = useSafeAreaInsets()
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: width,
      height: height + top,
      justifyContent: 'center',
      alignItems: 'center',
    },
    floatingBase: {
      position: 'absolute',
    },
    baseButton: {
      backgroundColor: colors.fab.darkGray,
      width: sizeCircle,
      height: sizeCircle,
      borderRadius: sizeCircle,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      width: sizeIcon,
      height: sizeIcon,
    },
    horizontalMenu: {
      flexDirection: 'row',
      gap: scale(8),
    },
    horizontalMenuReverse: {
      flexDirection: 'row-reverse',
      gap: scale(8),
    },
    verticalMenu: {
      position: 'absolute',
      top: -viewHeight - scale(8),
      right: scale(8),
      gap: scale(8),
    },
    verticalMenuReverse: {
      position: 'absolute',
      top: sizeCircle + scale(8),
      right: scale(8),
      flexDirection: 'column-reverse',
      gap: scale(8),
    },
    button: {
      marginBottom: -scale(30),
    },
  })
}

export default FAB
