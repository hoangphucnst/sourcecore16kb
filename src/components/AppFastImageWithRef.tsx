import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react'
import {
  ActivityIndicator,
  ImageRequireSource,
  StyleSheet,
  TouchableOpacity,
  View,
  StyleProp,
} from 'react-native'
import FastImage, {
  ImageStyle,
  Source,
  FastImageProps,
} from 'react-native-fast-image'
import AppIconVector from './AppIconVector'
import {Icons} from '~/assets'
/*

  // 1️⃣ Tạo ref để điều khiển ảnh
  const imageRef = useRef<AppFastImageRef>(null)

  // Optional: sử dụng reloadImage()
  imageRef.current?.reloadImage()

  return (
    <AppFastImageWithRef
      // 2️⃣ Gắn ref vào để dùng reloadImage()
      ref={imageRef}

      // 3️⃣ Nguồn ảnh chính cần hiển thị
      source={{ uri: 'https://example.com/image.jpg' }}

      // 4️⃣ Ảnh fallback nếu load thất bại (optional)
      defaultSourceCus={require('~/assets/images/fallback.png')}

      // 5️⃣ Hiển thị nút reload nếu ảnh lỗi (optional)
      showReloadButton={true}

      // 6️⃣ Styling ảnh
      style={{ width: 100, height: 100, borderRadius: 10 }}
    />

*/
export interface AppFastImageRef {
  reloadImage: () => void
}

type AppFastImageWithRefProps = {
  source: Source | ImageRequireSource
  style?: StyleProp<ImageStyle>
  showReloadButton?: boolean
  defaultSourceCus?: Source | ImageRequireSource
} & FastImageProps

const AppFastImageWithRef = forwardRef<
  AppFastImageRef,
  AppFastImageWithRefProps
>((props, ref) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)
  const [hasTriedSource, setHasTriedSource] = useState(false)

  const {
    source,
    style,
    showReloadButton = true,
    defaultSourceCus = Icons.icNoImage,
    ...restProps
  } = props

  useEffect(() => {
    setHasTriedSource(false)
    setError(false)
  }, [source])

  useImperativeHandle(ref, () => ({
    reloadImage,
  }))

  const reloadImage = () => {
    setLoading(true)
    setError(false)
    setHasTriedSource(false)
    setReloadKey(prevKey => prevKey + 1)
  }

  const onLoadStart = () => {
    setLoading(true)
    setError(false)
    setHasTriedSource(true)
  }

  const onLoadEnd = () => setLoading(false)
  const onError = () => {
    setLoading(false)
    setError(true)
  }

  const imageSource = !error && !hasTriedSource ? source : defaultSourceCus

  return (
    <View style={[styles.container, style]}>
      {loading && !error && (
        <View style={[styles.skeletonContainer, style]}>
          <ActivityIndicator size="large" color="#ccc" />
        </View>
      )}

      <FastImage
        key={reloadKey}
        source={imageSource}
        onLoadStart={onLoadStart}
        onLoad={onLoadEnd}
        onError={onError}
        resizeMode={FastImage.resizeMode.cover}
        {...restProps}
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
})

AppFastImageWithRef.displayName = 'AppFastImageWithRef'

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

export default AppFastImageWithRef
