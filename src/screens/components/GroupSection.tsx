import React, {useEffect, useState, ReactNode} from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated'
import AppText from '~/components/AppText'
import {scale} from '~/utils/scaleScreen'
import {Icons} from '~/assets'
import {useAppStyles} from '~/hooks'
import {Fontsfamily} from '~/styles/FontsFamily'

interface GroupSectionProps {
  onPressGroup?: () => void
  title: string
  number?: number
  componentExtra?: () => JSX.Element | null
  showIconDrop?: boolean
  disableOnPress?: boolean
  showGroup?: boolean
  numberOfLinesTitle?: number
  children?: ReactNode
  levelNode: '1' | '2'
}

const GroupSection: React.FC<GroupSectionProps> = ({
  onPressGroup = () => {},
  title,
  number,
  componentExtra = null,
  showIconDrop = true,
  disableOnPress = false,
  showGroup: initialShowGroup = true,
  numberOfLinesTitle = 1,
  children,
  levelNode = '1',
}) => {
  const styles = useLocalStyles(levelNode)
  const [showGroup, setShowGroup] = useState<boolean>(initialShowGroup)
  const animation = useSharedValue(0)

  const rotateDrop = useAnimatedStyle(() => ({
    transform: [{rotate: `${animation.value * 90 - 90}deg`}],
  }))

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
    <View style={styles.container}>
      <TouchableOpacity
        disabled={disableOnPress}
        activeOpacity={0.5}
        onPress={onPressHandler}
        style={styles.btnTitle}>
        <View style={styles.titleWrapper}>
          {componentExtra && componentExtra()}
          <AppText numberOfLines={numberOfLinesTitle} style={styles.lblTitle}>
            {title}
          </AppText>
          {number ? <AppText>{` (${number})`}</AppText> : null}
        </View>
        {showIconDrop && (
          <Animated.Image
            source={Icons.icDropDown_2}
            resizeMode="contain"
            style={[styles.iconDropdown, rotateDrop]}
          />
        )}
      </TouchableOpacity>
      {showGroup && children}
    </View>
  )
}

export default GroupSection

const useLocalStyles = (levelNode: string) => {
  const {THEME} = useAppStyles()
  const {colors} = THEME

  let sizeText
  switch (levelNode) {
    case '1': {
      sizeText = 16
      break
    }
    case '2': {
      sizeText = 14
      break
    }
    default: {
      sizeText = 16
      break
    }
  }

  let fontText = Fontsfamily.OpenSans.Bold
  switch (levelNode) {
    case '1': {
      fontText = Fontsfamily.OpenSans.Bold
      break
    }
    case '2': {
      fontText = Fontsfamily.OpenSans.SemiBold
      break
    }
    default: {
      fontText = Fontsfamily.OpenSans.Bold
      break
    }
  }

  return StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      overflow: 'hidden',
    },
    titleWrapper: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    lblTitle: {
      flexShrink: 1,
      color: colors.primary,
      fontSize: scale(sizeText),
      fontFamily: fontText,
    },
    btnTitle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: scale(8),
      backgroundColor: colors.button.background,
      alignItems: 'center',
      borderRadius: scale(8),
    },
    iconDropdown: {
      width: scale(18),
      height: scale(18),
      marginLeft: scale(10),
      tintColor: colors.primary,
    },
  })
}
