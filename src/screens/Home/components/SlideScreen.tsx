import React, {forwardRef, useImperativeHandle} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Animated from 'react-native-reanimated'
import AppScrollViewBody from '~/components/AppScrollViewBody'
import {scale} from '~/utils/scaleScreen'
import useTheme from '~/redux/reduxHooks/useTheme'
import {useAppStyles, useSlideScreen} from '~/hooks'

interface SlideScreenProps {
  initValueAniamted: number
}

export type SlideScreenRef = {
  open: () => void
  close: () => void
  initHeightTransparent: (height: number) => void
  getStatus: () => boolean
}

const SlideScreen = forwardRef<SlideScreenRef, SlideScreenProps>(
  ({initValueAniamted}, ref) => {
    const infoScreen = useTheme()
    const {width: screenWidth, isLandscape} = infoScreen
    const styles = useThemeStyles()

    const {
      animatedStyle,
      open,
      close,
      initHeightTransparent,
      getStatus,
      heightHeaderTransparent,
    } = useSlideScreen(initValueAniamted)

    // Expose functions via ref
    useImperativeHandle(ref, () => ({
      open,
      close,
      initHeightTransparent,
      getStatus,
    }))

    return (
      <Animated.View
        key={isLandscape ? 'landscape' : 'portrait'}
        pointerEvents={'box-none'}
        style={[styles.slideContainer, {width: screenWidth}, animatedStyle]}>
        <View
          pointerEvents={'none'}
          style={[styles.headerTransparent, {height: heightHeaderTransparent}]}
        />
        <AppScrollViewBody horizontalInit={scale(24)} style={styles.content}>
          <Text style={styles.title}>Slide Screen</Text>
          <TouchableOpacity onPress={close} style={styles.button}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </AppScrollViewBody>
      </Animated.View>
    )
  },
)

const useThemeStyles = () => {
  const {THEME: theme} = useAppStyles()
  return StyleSheet.create({
    slideContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      backgroundColor: theme.colors.transparent,
    },
    content: {
      flex: 1,
      backgroundColor: theme.colors.slide.background,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: theme.colors.slide.button,
      borderRadius: 5,
    },
    buttonText: {
      color: theme.colors.white,
      fontWeight: 'bold',
    },
    headerTransparent: {
      height: 0,
      backgroundColor: theme.colors.transparent,
    },
  })
}

export default SlideScreen

SlideScreen.displayName = 'SlideScreen'
