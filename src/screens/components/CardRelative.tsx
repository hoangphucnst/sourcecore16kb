import {StyleSheet, View} from 'react-native'
import React, {useCallback} from 'react'
import {AppTheme} from '~/styles/Theme'
import {useAppStyles} from '~/hooks'
import AppText from '~/components/AppText'
import AppImage from '~/components/AppImage'
import {Icons} from '~/assets'
import {scale} from '~/utils/scaleScreen'
import {ViewProps} from 'react-native'

type PropsCardRelative = {
  fullname: string | null
  code: string | null
  relationship: string | null
  birthday: string | null
  id: string | null
  address: string | null
  styleContainer: ViewProps | null
}

const CardRelative = ({
  fullname = 'FullName',
  code = 'Code',
  relationship = 'Relationship',
  birthday = 'Birthday',
  id = 'IdPerson',
  address = 'Address',
  styleContainer = null,
}: PropsCardRelative) => {
  const {THEME} = useAppStyles()
  const styles = useCallback(styleWithTheme, [THEME])(THEME)

  return (
    <View style={[styles.container, styleContainer]}>
      <View style={styles.row}>
        <AppImage source={Icons.icRelative} style={styles.icon} />
        <View style={styles.content}>
          <AppText>
            {code} - {fullname} - {relationship}
          </AppText>
          <AppText style={styles.secondaryText}>{birthday}</AppText>
          <AppText style={styles.secondaryText}>{id}</AppText>
          <AppText style={styles.secondaryText}>{address}</AppText>
        </View>
      </View>
    </View>
  )
}

export default CardRelative

const styleWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    container: {},
    row: {
      flexDirection: 'row',
    },
    icon: {
      width: scale(40),
      height: scale(40),
      // tintColor: THEME.colors.primary,
    },
    content: {
      flex: 1,
      marginLeft: scale(8),
      gap: scale(8),
    },
    secondaryText: {
      color: THEME.colors.text.secondary,
    },
  })
