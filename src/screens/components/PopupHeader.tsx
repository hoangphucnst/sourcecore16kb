import {StyleSheet, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {AppTheme} from '~/styles/Theme'
import {useAppStyles} from '~/hooks'
import {Icons} from '~/assets'
import {scale, scaleFont} from '~/utils/scaleScreen'
import AppText from '~/components/AppText'
import {Fontsfamily} from '~/styles/FontsFamily'
import AppImage from '~/components/AppImage'

interface PopupHeaderProps {
  text: string
  onClose: () => void
  styleText?: StyleSheet
}

const PopupHeader: React.FC<PopupHeaderProps> = ({
  text = 'Title',
  onClose = () => {},
  styleText,
}) => {
  const {THEME} = useAppStyles()
  const styles = PopupHeaderStyles(THEME)
  return (
    <View style={styles.container}>
      <AppText style={[styles.text, styleText]}>{text}</AppText>
      <TouchableOpacity onPress={onClose}>
        <View style={styles.container_icon}>
          <AppImage source={Icons.icClose} style={styles.iconClose} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default PopupHeader

const PopupHeaderStyles = (theme: AppTheme) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {colors, fonts} = theme
  return StyleSheet.create({
    container: {
      paddingTop: scale(8),
      paddingBottom: scale(16),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    container_icon: {
      width: scale(30),
      height: scale(22),
      alignItems: 'flex-end',
    },
    iconClose: {
      width: scale(22),
      height: scale(22),
      tintColor: colors.primary,
    },
    text: {
      fontSize: scaleFont(18),
      color: colors.primary,
      // fontWeight: fonts.semibold,
      fontFamily: Fontsfamily.OpenSans.SemiBold,
    },
  })
}
