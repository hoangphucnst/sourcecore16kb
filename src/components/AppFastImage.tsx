import React, {useState} from 'react'
import {
  ActivityIndicator,
  ImageRequireSource,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import FastImage, {
  ImageStyle,
  Source,
  FastImageProps,
} from 'react-native-fast-image'
import AppIconVector from './AppIconVector'
import {StyleProp} from 'react-native'
import {Icons} from '~/assets'

type AppFastImageProps = {
  source: Source | ImageRequireSource
  style?: StyleProp<ImageStyle>
  showReloadButton?: boolean
  defaultSourceCus?: Source | ImageRequireSource
} & FastImageProps

const AppFastImage: React.FC<AppFastImageProps> = props => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)
  const [hasTriedSource, setHasTriedSource] = useState(false)
  const [currentSource, setCurrentSource] = useState<
    Source | ImageRequireSource
  >(props.source)

  const {
    source,
    style,
    showReloadButton = true,
    defaultSourceCus = Icons.icNoImage,
    ...restProps
  } = props

  const onLoadStart = () => {
    setLoading(true)
    setError(false)
  }

  const onLoadEnd = () => {
    setLoading(false)
  }

  const onError = () => {
    setLoading(false)

    if (!hasTriedSource && defaultSourceCus) {
      setHasTriedSource(true)
      setCurrentSource(defaultSourceCus)
    } else {
      setError(true)
    }
  }

  const reloadImage = () => {
    setLoading(true)
    setError(false)
    setHasTriedSource(false)
    setCurrentSource(source)
    setReloadKey(prevKey => prevKey + 1)
  }

  return (
    <View style={[styles.container, style]}>
      {loading && !error && (
        <View style={[styles.skeletonContainer, style]}>
          <ActivityIndicator size="large" color="#ccc" />
        </View>
      )}

      <FastImage
        key={reloadKey}
        onLoadStart={onLoadStart}
        onLoad={onLoadEnd}
        onError={onError}
        resizeMode={FastImage.resizeMode.cover}
        {...restProps}
        source={currentSource}
        style={[styles.image, style]}
      />

      {error && showReloadButton && (
        <View style={styles.reloadButton}>
          <TouchableOpacity onPress={reloadImage}>
            <AppIconVector.Ionicons name="reload" color="gray" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skeletonContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  reloadButton: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
})

export default AppFastImage
