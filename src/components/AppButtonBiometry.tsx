import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import React from 'react'
import {useAppStyles} from '~/hooks'
import {AppTheme} from '~/styles/Theme'
import {Icons} from '~/assets'
import AppImage from './AppImage'
import AppText from './AppText'
import {TypeBiometry} from '~/hooks/useBiometry'

type TypeAppButtonBiometry = {
  title: string
  onPress?: () => void
  styleButton?: ViewStyle
  styleTitle?: TextStyle
  typeBio?: TypeBiometry
}

const AppButtonBiometry = (props: TypeAppButtonBiometry) => {
  const {THEME} = useAppStyles()
  const styles = stylesWithTheme(THEME)

  const onPressButton = () => {
    if (typeof props.onPress === 'function') {
      props.onPress()
    }
  }

  const IconsBio = () => {
    switch (props.typeBio) {
      case 'FaceID':
        return Icons.icFaceID
      case 'TouchID':
      case 'Biometrics':
        return Icons.icTouchID
      default:
        return {}
    }
  }

  return (
    <TouchableOpacity
      onPress={onPressButton}
      style={[styles.container, props.styleButton]}>
      <View style={styles.container_icon}>
        <AppImage
          source={IconsBio()}
          style={styles.icon_bio}
          resizeMode="contain"
        />
      </View>
      <AppText style={[styles.title, props.styleTitle]}>{props.title}</AppText>
    </TouchableOpacity>
  )
}

export default AppButtonBiometry

const stylesWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    container: {
      // paddingHorizontal: THEME.sizes.horizontal_10,
      paddingVertical: THEME.sizes.vertical_10,
      // backgroundColor: THEME.colors.primary,
      borderRadius: 50,
      alignItems: 'center',
      flexDirection: 'row',
    },
    title: {
      fontSize: THEME.sizes.h4,
      marginLeft: THEME.sizes.mg10,
      fontWeight: 'bold',
    },
    icon_bio: {
      width: THEME.sizes.icon_24,
      height: THEME.sizes.icon_24,
      tintColor: THEME.colors.primary,
    },
    container_icon: {
      // backgroundColor: THEME.colors.primary + '6A',
      padding: THEME.sizes.pd10,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: THEME.colors.primary,
    },
  })
