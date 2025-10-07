import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React, {useEffect, useImperativeHandle, forwardRef} from 'react'
import {useAppStyles, useFadeBackgroundAnimation} from '~/hooks'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {
  p_horizontalScale,
  p_verticalScale,
  scale,
  scaleFont,
} from '~/utils/scaleScreen'
import utils from '~/utils'
import Animated from 'react-native-reanimated'
import PopupHeader from './PopupHeader'
import AppScrollViewBody from '~/components/AppScrollViewBody'
import AppText from '~/components/AppText'

interface StyledFilterContainerProps {
  children: React.ReactNode
  onClose: () => void
  onReset: () => void
  onApply: () => void
  title: string
  nameButtonReset: string
  nameButtonApply: string
  showBottom: boolean
  showHeader: boolean
  enableTouchCloseOverlay: boolean
}
export interface StyledFilterContainerRef {
  triggerClose: () => void
  callbackClose: ({callback}: {callback: () => void}) => void
}

const StyledFilterContainer = forwardRef<
  StyledFilterContainerRef,
  StyledFilterContainerProps
>(
  (
    {
      children,
      onClose = () => {
        utils.goBackNavigation()
      },
      onReset = () => {},
      onApply = () => {},
      title = 'Bộ lọc',
      nameButtonReset = 'Thiết lập lại',
      nameButtonApply = 'Áp dụng',
      showBottom = true,
      showHeader = true,
      enableTouchCloseOverlay = true,
    },
    ref,
  ) => {
    const styles = useModalStyles()
    const timeStartAnimation = 150 * 5
    const timeEndAnimation = timeStartAnimation / 5

    const {animatedStyle, startAnimation, endAnimation} =
      useFadeBackgroundAnimation({
        from: 0,
        to: 0.3,
        durationIn: timeStartAnimation,
        durationOut: timeEndAnimation,
      })

    const goBack = () => {
      endAnimation({
        callback() {
          onClose()
        },
      })
    }

    useEffect(() => {
      setTimeout(() => {
        startAnimation()
      }, 150)
    }, [])

    useImperativeHandle(ref, () => ({
      triggerClose: goBack,
      callbackClose: ({callback}: {callback: () => void}) => {
        endAnimation({
          callback() {
            callback()
          },
        })
      },
    }))

    return (
      <Animated.View style={[styles.container, animatedStyle]}>
        <TouchableWithoutFeedback
          disabled={!enableTouchCloseOverlay}
          onPress={goBack}>
          <View style={styles.container_press_out} />
        </TouchableWithoutFeedback>
        <View style={styles.conatiner_filter}>
          {showHeader && <PopupHeader text={title} onClose={goBack} />}
          <AppScrollViewBody
            extraHeight={-scale(90)}
            extraScrollHeight={-scale(90)}
            style={styles.container_master}
            showsVerticalScrollIndicator={false}>
            {children}
          </AppScrollViewBody>
          {showBottom && (
            <View style={styles.bottomSection}>
              <View style={styles.itemSection}>
                <BorderButton
                  title={nameButtonReset}
                  onPress={() => {
                    endAnimation({
                      callback() {
                        onReset()
                      },
                    })
                  }}
                />
              </View>
              <View style={styles.itemSection}>
                <SolidButton
                  title={nameButtonApply}
                  onPress={() => {
                    endAnimation({
                      callback() {
                        onApply()
                      },
                    })
                  }}
                />
              </View>
            </View>
          )}
        </View>
      </Animated.View>
    )
  },
)

StyledFilterContainer.displayName = 'StyledFilterContainer'
export default StyledFilterContainer

const useModalStyles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  const {bottom} = useSafeAreaInsets()
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    conatiner_filter: {
      backgroundColor: colors.white,
      borderTopRightRadius: scale(16),
      borderTopLeftRadius: scale(16),
      gap: scale(8),
      paddingVertical: scale(16),
      paddingHorizontal: scale(10),
      paddingBottom: scale(16) + bottom,
    },
    container_master: {
      maxHeight: p_verticalScale(60),
      gap: scale(16),
    },
    container_press_out: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: p_verticalScale(100),
      width: p_horizontalScale(100),
    },
    bottomSection: {
      paddingTop: scale(16),
      flexDirection: 'row',
      // justifyContent: 'space-between',
      gap: scale(10),
    },
    itemSection: {
      flex: 1,
    },
  })
}

const SolidButton = ({
  title = 'Áp dụng',
  onPress = () => {},
}: {
  title: string
  onPress: () => void
}) => {
  const styles = SolidButtonStyles()
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <AppText style={styles.text}>{title}</AppText>
      </View>
    </TouchableOpacity>
  )
}

const SolidButtonStyles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    container: {
      // width: scale(172),
      height: scale(36),
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: scale(8),
    },
    text: {
      fontSize: scaleFont(14),
      color: colors.white,
    },
  })
}

const BorderButton = ({
  title = 'Thiết lập lại',
  onPress = () => {},
}: {
  title: string
  onPress: () => void
}) => {
  const styles = BorderButtonStyles()
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <AppText style={styles.text}>{title}</AppText>
      </View>
    </TouchableOpacity>
  )
}

const BorderButtonStyles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    container: {
      height: scale(36),
      borderWidth: scale(1),
      borderColor: colors.primary,
      borderRadius: scale(8),
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: scaleFont(14),
      color: colors.primary,
    },
  })
}
