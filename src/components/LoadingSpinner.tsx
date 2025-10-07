// components/LoadingSpinner.js
import React, {forwardRef, useEffect, useImperativeHandle} from 'react'
import {View, StyleSheet, Platform, StatusBar} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated'
import {useAppStyles} from '~/hooks'
import AppText from './AppText'
import {scale} from '~/utils/scaleScreen'

export type TypeRefLoading = {
  show?: (textLoading?: string) => void
  hide?: () => void
}

const LoadingSpinner = forwardRef<TypeRefLoading>((_, ref) => {
  const {THEME} = useAppStyles()
  const [loadingOption, setLoadingOption] = React.useState({
    show: false,
    text: '',
  })
  const rotation = useSharedValue(0)
  useImperativeHandle(ref, () => ({
    show: (textLoading?: string) => {
      setLoadingOption({
        show: true,
        text: typeof textLoading === 'string' ? textLoading : '',
      })
    },
    hide: () => {
      setLoadingOption({
        show: false,
        text: '',
      })
    },
  }))

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 600,
        easing: Easing.linear,
      }),
      -1,
    )
  }, [rotation])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotation.value}deg`}],
    }
  })

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent')
      StatusBar.setTranslucent(true)
      StatusBar.setBarStyle('light-content')
    }
    return () => {
      StatusBar.setBarStyle('light-content')
    }
  }, [loadingOption.show])

  if (loadingOption.show)
    return (
      <View style={styles.container}>
        <View style={styles.container_spiner}>
          <Animated.View
            style={[
              styles.spinner,
              animatedStyle,
              {
                borderTopColor: THEME.colors.primary,
                borderBottomColor: `${THEME.colors.primary}3a`,
                borderLeftColor: `${THEME.colors.primary}3a`,
                borderRightColor: `${THEME.colors.primary}3a`,
              },
            ]}
          />
          {loadingOption.text?.trim()?.length > 0 && (
            <AppText style={styles.textloading}>{loadingOption.text}</AppText>
          )}
        </View>
      </View>
    )
  return null
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  spinner: {
    width: 50,
    height: 50,
    borderWidth: 4,
    borderRadius: 25,
  },
  container_spiner: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  textloading: {
    marginTop: scale(10),
  },
})
LoadingSpinner.displayName = 'LoadingSpinner'
export default LoadingSpinner
