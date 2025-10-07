import {StyleSheet, TouchableOpacity} from 'react-native'
import React, {useCallback} from 'react'
import {AppTheme} from '~/styles/Theme'
import {useAppStyles} from '~/hooks'
import AppImage from '~/components/AppImage'
import {Icons} from '~/assets'
import {scale} from '~/utils/scaleScreen'
import AppText from '~/components/AppText'
import utils from '~/utils'

type PropsCardFile = {
  nameFile: string | null
  showSign: boolean
  isSigned: boolean
  signedName: string
  showStatusSign?: boolean
  onPress: () => void
  onSignFile: () => void
}

const CardFile = ({
  nameFile = 'NameFile',
  showSign = false,
  isSigned = true,
  signedName = null,
  showStatusSign = true,
  onPress = () => {},
  onSignFile = () => {},
}: PropsCardFile) => {
  const {THEME} = useAppStyles()
  const styles = useCallback(styleWithTheme, [THEME])(THEME)

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <AppImage
        source={utils.getFileIconByExtension(nameFile)}
        style={styles.icon_file}
      />
      <AppText numberOfLines={1} style={styles.name_file}>
        {nameFile}
      </AppText>
      {showSign ? (
        <TouchableOpacity
          onPress={onSignFile}
          hitSlop={{
            top: scale(10),
            left: scale(20),
            right: scale(10),
            bottom: scale(10),
          }}>
          <AppImage source={Icons.icSignFile} style={styles.icon_file_sign} />
        </TouchableOpacity>
      ) : (
        <AppText
          style={{
            color: isSigned
              ? THEME.colors.statusFile.signed
              : THEME.colors.statusFile.unsign,
          }}>
          {showStatusSign &&
            (isSigned ? (signedName ? signedName : 'Đã ký') : 'Chưa ký')}
        </AppText>
      )}
    </TouchableOpacity>
  )
}

export default CardFile

const styleWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      // backgroundColor: THEME.colors.white,
      padding: scale(8),
    },
    icon_file: {
      width: scale(30),
      height: scale(30),
    },
    icon_file_sign: {
      width: scale(20),
      height: scale(20),
      tintColor: THEME.colors.primary,
    },
    name_file: {
      flex: 1,
      marginHorizontal: 5,
    },
  })
