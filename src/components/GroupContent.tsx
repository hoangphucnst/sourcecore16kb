import React, {useEffect, useState, useCallback} from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated'
import AppText from './AppText'
import {AppTheme} from '~/styles/Theme'
import {useAppStyles} from '~/hooks'
import {scale} from '~/utils/scaleScreen'
import {Icons} from '~/assets'

interface GroupContentProps {
  onPressGroup?: () => void
  title: string
  number?: number
  outputRange?: [string, string]
  componentExtra?: () => JSX.Element | null
  showIconDrop?: boolean
  disableOnPress?: boolean
  showGroup?: boolean
  style?: ViewStyle
  styleTouchTitle?: ViewStyle
  styleTitle?: ViewStyle
  styleLabelTitle?: TextStyle
  styleIcon?: ImageStyle
  numberOfLinesTitle?: number
  children?: React.ReactNode
}

const GroupContent: React.FC<GroupContentProps> = ({
  onPressGroup = () => {},
  title,
  number,
  componentExtra = null,
  showIconDrop = true,
  disableOnPress = false,
  showGroup: initialShowGroup = true,
  style,
  styleTouchTitle,
  styleTitle,
  styleLabelTitle,
  styleIcon,
  numberOfLinesTitle = 1,
  children,
}) => {
  const [showGroup, setShowGroup] = useState<boolean>(initialShowGroup)
  const animation = useSharedValue(0)
  const {THEME} = useAppStyles()
  const styles = useCallback(styleWithTheme, [THEME])(THEME)

  const rotateDrop = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${animation.value * 90 - 90}deg`}],
    }
  })

  useEffect(() => {
    CallAnimation(showGroup ? 1 : 0)
  }, [showGroup])

  const onPressHandler = () => {
    onPressGroup()
    setShowGroup(!showGroup)
  }

  const CallAnimation = (value: number) => {
    animation.value = withTiming(value, {
      duration: 200,
      easing: Easing.linear,
    })
  }

  return (
    <View style={[{backgroundColor: THEME.colors.white}, style]}>
      <TouchableOpacity
        disabled={disableOnPress}
        activeOpacity={0.5}
        onPress={onPressHandler}
        style={[styles.btnTitle, styleTouchTitle]}>
        <View style={[styles.title, styleTitle]}>
          {componentExtra && componentExtra()}
          <AppText
            numberOfLines={numberOfLinesTitle}
            style={[styles.lblTitle, styleLabelTitle]}>
            {title}
          </AppText>
          {number ? <AppText>{` (${number})`}</AppText> : null}
        </View>
        {showIconDrop && (
          <Animated.Image
            source={Icons.icDropDown_2}
            resizeMode="contain"
            style={[styles.iconDropdown, rotateDrop, styleIcon]}
          />
        )}
      </TouchableOpacity>
      {showGroup && children}
    </View>
  )
}

export default GroupContent

const styleWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    title: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    lblTitle: {
      flexShrink: 1,
      color: THEME.colors.text.secondary,
    },
    btnTitle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: THEME.colors.table.background,
      alignItems: 'center',
      borderRadius: scale(8),
      borderWidth: 1,
      borderColor: THEME.colors.border,
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 4,
      shadowColor: THEME.colors.shadow,
    },
    iconDropdown: {
      width: scale(20),
      height: scale(20),
      marginLeft: 10,
    },
  })
