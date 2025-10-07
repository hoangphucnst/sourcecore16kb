import {
  ImageSourcePropType,
  ImageStyle,
  LayoutAnimation,
  LayoutChangeEvent,
  Platform,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import React from 'react'
import {useAppStyles, useDebounce} from '~/hooks'
import {AppTheme} from '~/styles/Theme'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import AppText from './AppText'
import AppImage from './AppImage'
import AppViewBody from './AppViewBody'

const AppHeader = ({
  title = 'Your App Header',
  iconLeft,
  iconRight,
  componentLeft,
  componentRight,
  componentTitle,
  styleIconLeft,
  styleIconRight,
  styleTitle,
  styleHeader = {
    backgroundColor: 'blue',
    borderBottomColor: 'white',
  },
  onPressLeft = () => {},
  onPressRight = () => {},
  onLayoutHeader = () => {},
  styleLeft,
  styleRight,
}: {
  title: string
  iconLeft?: ImageSourcePropType
  iconRight?: ImageSourcePropType
  componentLeft?: React.ReactNode | null
  componentRight?: React.ReactNode | null
  componentTitle?: React.ReactNode | null
  styleIconLeft?: ImageStyle | undefined
  styleIconRight?: ImageStyle | undefined
  styleTitle?: TextStyle | undefined
  styleHeader?: ViewStyle | undefined
  onPressLeft?: () => void | undefined
  onPressRight?: () => void | undefined
  onLayoutHeader?: (e: LayoutChangeEvent | undefined) => void
  styleLeft?: ViewStyle | undefined
  styleRight?: ViewStyle | undefined
}) => {
  const {THEME} = useAppStyles()
  const styles = stylesWithTheme(THEME)
  const insets: EdgeInsets = useDebounce(useSafeAreaInsets(), 20)

  React.useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }, [insets])

  return (
    <AppViewBody
      onLayout={onLayoutHeader}
      horizontalInit={THEME.sizes.horizontal_13}
      style={[
        {
          paddingTop:
            Platform.OS === 'android'
              ? insets.top + 10
              : insets.top > 0
                ? insets.top
                : insets.top + (THEME.sizes.pd10 || 10),
        },
        styles.default_header,
        styleHeader,
      ]}>
      {componentLeft ? (
        <View style={[styles.container_left, styleLeft]}>{componentLeft}</View>
      ) : (
        <TouchableOpacity
          onPress={onPressLeft}
          style={[styles.container_left, styleLeft]}>
          <>
            {iconLeft && (
              <AppImage
                source={iconLeft ? iconLeft : {uri: undefined}}
                style={[styles.default_left, styleIconLeft]}
                resizeMode="contain"
              />
            )}
          </>
        </TouchableOpacity>
      )}
      {componentTitle ? (
        componentTitle
      ) : (
        <AppText style={[styles.default_title, styleTitle]} numberOfLines={2}>
          {title || ''}
        </AppText>
      )}
      {componentRight ? (
        <View style={[styles.container_right, styleRight]}>
          {componentRight}
        </View>
      ) : (
        <TouchableOpacity
          onPress={onPressRight}
          style={[styles.container_right, styleRight]}>
          <>
            {iconRight && (
              <AppImage
                source={iconRight ? iconRight : undefined}
                style={[styles.default_right, styleIconRight]}
                resizeMode="contain"
              />
            )}
          </>
        </TouchableOpacity>
      )}
    </AppViewBody>
  )
}

export default AppHeader

const stylesWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    default_header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: THEME.sizes.horizontal_13,
      borderBottomColor: THEME.colors.border,
      borderBottomWidth: 0.5,
      paddingBottom: THEME.sizes.pd10,
      backgroundColor: THEME.colors.background,
    },
    default_left: {},
    default_right: {},
    default_title: {
      flex: 1,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: THEME.sizes.h4,
      paddingVertical: 3,
    },
    container_right: {
      minWidth: 40,
      alignItems: 'flex-end',
    },
    container_left: {
      minWidth: 40,
    },
  })

/*
  Example:
    const handlePressLeft = () => {
      console.log('Left icon pressed!');
    };

    const handlePressRight = () => {
      console.log('Right icon pressed!');
    };

    <AppHeader
        title="My Custom Header"         // Title in the header
        iconLeft={iconLeft}              // Left icon (e.g., back icon)
        iconRight={iconRight}            // Right icon (e.g., settings icon)
        onPressLeft={handlePressLeft}    // Action on left icon press
        onPressRight={handlePressRight}  // Action on right icon press
        styleHeader={styles.customHeaderStyle}  // Custom styles for the header
      />
  
  */
