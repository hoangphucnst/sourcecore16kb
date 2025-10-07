import {Dimensions, StyleSheet, View} from 'react-native'
import React, {
  forwardRef,
  useImperativeHandle,
  useCallback,
  ReactNode,
  useState,
} from 'react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import BackDrop from './BackDrop'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useTheme} from '@react-navigation/native'

type Props = {
  snapTo: string
  children?: ReactNode
  backgroundColor: string
  backDropColor: string
  onBottomSheetReady?: (ready: boolean) => void
}

export interface BottomSheetMethods {
  expand: () => void
  close: () => void
  isActive: () => boolean
}

const BottomSheetView = forwardRef<BottomSheetMethods, Props>(
  (
    {
      snapTo,
      children,
      backgroundColor,
      backDropColor,
      onBottomSheetReady,
    }: Props,
    ref,
  ) => {
    const inset = useSafeAreaInsets()
    const infoScreen = useTheme()
    const {height, isLandscape, width} = infoScreen
    const maxWidthBottomSheet = isLandscape ? height : width
    const percentage = parseFloat(snapTo.replace('%', '')) / 100
    const closeHeight = height
    const openHeight = height - height * percentage
    const topAnimation = useSharedValue(closeHeight)
    const context = useSharedValue(0)
    const [show, setShow] = useState(false)

    const isActive = useCallback(() => {
      return topAnimation.value === openHeight
    }, [topAnimation, openHeight])

    const expand = useCallback(() => {
      'worklet'
      runOnJS(setShow)(true)
      topAnimation.value = withTiming(openHeight, undefined, () => {
        if (onBottomSheetReady) {
          runOnJS(onBottomSheetReady)(true)
        }
      })
    }, [openHeight, topAnimation, onBottomSheetReady])

    const close = useCallback(() => {
      'worklet'
      if (onBottomSheetReady) {
        runOnJS(onBottomSheetReady)(false)
      }
      topAnimation.value = withTiming(closeHeight, undefined, () => {
        runOnJS(setShow)(false)
      })
    }, [closeHeight, topAnimation, onBottomSheetReady])

    // useEffect(() => {
    //     if (!isActive()) {
    //         topAnimation.value = withTiming(closeHeight);
    //     }
    // }, [height, isActive, openHeight, closeHeight, topAnimation]);

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
          if (onBottomSheetReady) {
            runOnJS(onBottomSheetReady)(false)
          }
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

    React.useEffect(() => {
      // Update layout on orientation change
      const newCloseHeight = Dimensions.get('window').height
      const newOpenHeight = newCloseHeight - newCloseHeight * percentage
      topAnimation.value = withTiming(
        isActive() ? newOpenHeight : newCloseHeight,
        undefined,
        () => {
          runOnJS(setShow)(false)
          if (onBottomSheetReady) {
            runOnJS(onBottomSheetReady)(false)
          }
        },
      )
    }, [
      height,
      isLandscape,
      percentage,
      topAnimation,
      isActive,
      onBottomSheetReady,
    ])

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
              {children}
            </Animated.View>
          </GestureDetector>
        </>
      )
    return null
  },
)
BottomSheetView.displayName = 'BottomSheetView'
export default BottomSheetView

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
