import {StyleSheet, View} from 'react-native'
import React, {useCallback} from 'react'
import {AppTheme} from '~/styles/Theme'
import {useAppStyles} from '~/hooks'
import AppText from '~/components/AppText'
import AppImage from '~/components/AppImage'
import {Icons} from '~/assets'
import {scale, scaleFont} from '~/utils/scaleScreen'
import {ViewProps} from 'react-native'

type Props = {
  fullname: string | null
  code: string | null
  id: string | null
  address: string | null
  styleContainer: ViewProps | null
}

const CardCollateralOwner = ({
  fullname = 'FullName',
  code = 'Code',
  id = 'IdPerson',
  address = 'Address',
  styleContainer = null,
}: Props) => {
  const {THEME} = useAppStyles()
  const styles = useCallback(styleWithTheme, [THEME])(THEME)

  return (
    <View style={[styles.container, styleContainer]}>
      <View style={styles.row}>
        <AppImage source={Icons.icRelative} style={styles.icon} />
        <View style={styles.content}>
          <AppText style={styles.primaryText}>
            {code} - {fullname}
          </AppText>
          <AppText style={styles.secondaryText}>{id}</AppText>
          <AppText style={styles.secondaryText}>{address}</AppText>
        </View>
      </View>
    </View>
  )
}

export default CardCollateralOwner

const styleWithTheme = (THEME: AppTheme) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {colors, fonts, sizes} = THEME
  return StyleSheet.create({
    container: {},
    row: {
      flexDirection: 'row',
    },
    icon: {
      width: scale(40),
      height: scale(40),
    },
    content: {
      flex: 1,
      marginLeft: scale(8),
      gap: scale(8),
    },
    primaryText: {
      color: colors.text.primary,
      fontSize: scaleFont(14),
    },
    secondaryText: {
      color: colors.text.secondary,
      fontSize: scaleFont(14),
    },
  })
}
