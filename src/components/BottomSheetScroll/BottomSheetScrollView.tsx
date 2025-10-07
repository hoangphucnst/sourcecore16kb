import {Dimensions, Keyboard, StyleSheet, View} from 'react-native'
import React, {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useState,
} from 'react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useAnimatedScrollHandler,
  AnimatedScrollViewProps,
  runOnJS,
} from 'react-native-reanimated'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import BackDrop from './BackDrop'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view'
import useTheme from '~/redux/reduxHooks/useTheme'

const KeyboardScrollView = Animated.createAnimatedComponent(
  KeyboardAwareScrollView,
)

type Props = AnimatedScrollViewProps &
  KeyboardAwareScrollViewProps & {
    snapTo: string
    backgroundColor: string
    backDropColor: string
  }

export interface BottomSheetMethods {
  expand: () => void
  close: () => void
  isActive: () => boolean
}

const BottomSheetScrollView = forwardRef<BottomSheetMethods, Props>(
  ({snapTo, children, backgroundColor, backDropColor, ...rest}: Props, ref) => {
    const inset = useSafeAreaInsets()
    const infoScreen = useTheme()
    const {height, isLandscape, width} = infoScreen
    const maxWidthBottomSheet = isLandscape ? height : width
    const percentage = parseFloat(snapTo.replace('%', '')) / 100
    const extraHeightScrollView =
      (height * (100 - parseFloat(snapTo.replace('%', '')))) / 100
    const closeHeight = height
    const openHeight = height - height * percentage
    const topAnimation = useSharedValue(closeHeight)
    const context = useSharedValue(0)
    const scrollBegin = useSharedValue(0)
    const scrollY = useSharedValue(0)
    const [enableScroll, setEnableScroll] = useState(true)
    const [show, setShow] = useState(false)

    const isActive = useCallback(() => {
      return topAnimation.value === openHeight
    }, [topAnimation, openHeight])

    const expand = useCallback(() => {
      'worklet'
      setShow(true)
      topAnimation.value = withTiming(openHeight)
    }, [openHeight, topAnimation])

    const close = useCallback(() => {
      'worklet'
      topAnimation.value = withTiming(closeHeight, undefined, () => {
        runOnJS(setShow)(false)
      })
      Keyboard.dismiss()
    }, [closeHeight, topAnimation])

    useImperativeHandle(
      ref,
      () => ({
        expand,
        close,
        isActive,
      }),
      [expand, close, isActive],
    )

    const animationStyle = useAnimatedStyle(() => {
      const top = topAnimation.value
      return {
        top,
      }
    })

    // Define the function to dismiss the keyboard
    const dismissKeyboard = () => {
      Keyboard.dismiss()
    }

    const pan = Gesture.Pan()
      .onBegin(() => {
        context.value = topAnimation.value
      })
      .onUpdate(event => {
        if (event.translationY < 0) {
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          })
        } else {
          topAnimation.value = withSpring(context.value + event.translationY, {
            damping: 100,
            stiffness: 400,
          })
        }
      })
      .onEnd(() => {
        if (topAnimation.value > openHeight + 50) {
          runOnJS(dismissKeyboard)()
          topAnimation.value = withSpring(
            closeHeight,
            {
              damping: 100,
              stiffness: 400,
            },
            () => {
              runOnJS(setShow)(false)
            },
          )
        } else {
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          })
        }
      })

    const onScroll = useAnimatedScrollHandler({
      onBeginDrag: event => {
        scrollBegin.value = event.contentOffset.y
      },
      onScroll: event => {
        scrollY.value = event.contentOffset.y
      },
    })

    const panScroll = Gesture.Pan()
      .onBegin(() => {
        context.value = topAnimation.value
      })
      .onUpdate(event => {
        if (event.translationY < 0) {
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          })
        } else if (event.translationY > 0 && scrollY.value === 0) {
          runOnJS(setEnableScroll)(false)
          topAnimation.value = withSpring(
            Math.max(
              context.value + event.translationY - scrollBegin.value,
              openHeight,
            ),
            {
              damping: 100,
              stiffness: 400,
            },
          )
        }
      })
      .onEnd(() => {
        runOnJS(setEnableScroll)(true)
        if (topAnimation.value > openHeight + 50) {
          topAnimation.value = withSpring(closeHeight, {
            damping: 100,
            stiffness: 400,
          })
          runOnJS(setShow)(false)
        } else {
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          })
        }
      })

    const scrollViewGesture = Gesture.Native()

    React.useEffect(() => {
      // Update layout on orientation change
      const newCloseHeight = Dimensions.get('window').height
      const newOpenHeight = newCloseHeight - newCloseHeight * percentage
      topAnimation.value = withTiming(
        isActive() ? newOpenHeight : newCloseHeight,
      )
    }, [height, isLandscape, percentage, topAnimation, isActive])

    const styleMore = {
      backgroundColor: backgroundColor,
      paddingBottom: inset.bottom,
      maxWidth: maxWidthBottomSheet,
      left: isLandscape ? (width - maxWidthBottomSheet) / 2 : 0,
    }

    if (show)
      return (
        <>
          <BackDrop
            topAnimation={topAnimation}
            backDropColor={backDropColor}
            closeHeight={closeHeight}
            openHeight={openHeight}
            close={close}
          />
          <GestureDetector gesture={pan}>
            <Animated.View
              style={[styles.container, animationStyle, styleMore]}>
              <View style={styles.lineContainer}>
                <View style={styles.line} />
              </View>
              <GestureDetector
                gesture={Gesture.Simultaneous(scrollViewGesture, panScroll)}>
                <KeyboardScrollView
                  {...rest}
                  scrollEnabled={enableScroll}
                  bounces={false}
                  scrollEventThrottle={16}
                  onScroll={onScroll}
                  extraHeight={extraHeightScrollView}>
                  {children}
                </KeyboardScrollView>
              </GestureDetector>
            </Animated.View>
          </GestureDetector>
        </>
      )
    return null
  },
)
BottomSheetScrollView.displayName = 'BottomSheetScrollView'
export default BottomSheetScrollView

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  lineContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  line: {
    width: 50,
    height: 4,
    backgroundColor: 'black',
    borderRadius: 20,
  },
})
