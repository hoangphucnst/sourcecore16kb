import React, {useState, useCallback} from 'react'
import {
  View,
  StyleSheet,
  LayoutChangeEvent,
  ViewStyle,
  ImageStyle,
} from 'react-native'
import AppImage from '~/components/AppImage'
import {scale} from '~/utils/scaleScreen'
import {Icons} from '~/assets'
import {useAppStyles} from '~/hooks'

interface StyledContainerProps {
  showLine?: boolean
  children: React.ReactNode
  icon: {
    source?: string
    size?: number
    style?: ImageStyle
  }
  container: {
    size?: number
    style?: ViewStyle
  }
}

const StyledContainer: React.FC<StyledContainerProps> = props => {
  const {
    showLine = true,
    children,
    icon: iconProp = {},
    container: containerProp = {},
  } = props

  const icon = {
    source: Icons.icUser,
    size: 24,
    ...iconProp,
  }

  const container = {
    size: 40,
    ...containerProp,
  }

  const {THEME} = useAppStyles()
  const {colors} = THEME

  const [childrenHeight, setChildrenHeight] = useState(0)

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const {height} = event.nativeEvent.layout
    setChildrenHeight(height)
  }, [])

  const avatarImageHeight = scale(container.size)

  const styles = useStyles(container.size, icon.size)

  return (
    <View style={[styles.container]}>
      <View style={[styles.avatarContainer]}>
        <View style={[styles.avatarCircle, container.style]}>
          <AppImage
            source={icon.source}
            style={[
              styles.avatarImage,
              {tintColor: colors.primary},
              icon.style,
            ]}
          />
        </View>
        {showLine && (
          <>
            {childrenHeight - scale(10) > avatarImageHeight && (
              <View
                style={[styles.verticalLine, {borderColor: colors.background}]}
              />
            )}
          </>
        )}
      </View>
      <View onLayout={handleLayout} style={styles.container_child}>
        {children}
      </View>
    </View>
  )
}

export default StyledContainer

const useStyles = (sizeCircle, sizeIcon) => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: scale(8),
    },
    avatarContainer: {
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
    },
    avatarCircle: {
      width: scale(sizeCircle),
      height: scale(sizeCircle),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: scale(sizeCircle) / 2,
      backgroundColor: colors.button.background,
    },
    avatarImage: {
      width: scale(sizeIcon),
      height: scale(sizeIcon),
    },
    verticalLine: {
      width: scale(sizeCircle) / 2,
      flex: 1,
      borderLeftWidth: scale(2),
      borderBottomWidth: scale(2),
      borderBottomLeftRadius: scale(8),
      marginBottom: scale(10),
    },
    container_child: {
      flex: 1,
    },
  })
}
