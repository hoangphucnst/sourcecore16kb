import {StyleSheet, View} from 'react-native'
import React, {useCallback} from 'react'
import {AppTheme} from '~/styles/Theme'
import {useAppStyles} from '~/hooks'
import AppText from '~/components/AppText'
import {FONTSFAMILY} from '~/styles/FontsFamily'
import {scale} from '~/utils/scaleScreen'
import utils from '~/utils'

type PersonHandleCardProps = {
  fullName?: string
  position?: string
  dept?: string
  no?: number
}

const PersonHandleCard = (props: PersonHandleCardProps) => {
  const {no = '', fullName = '', position = '', dept} = props
  const {THEME} = useAppStyles()
  const styles = useCallback(styleWithTheme, [THEME])(THEME)

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>
        {utils.isDefined(position)
          ? `${no}. ${fullName} - ${position}`
          : `${no}. ${fullName}`}
      </AppText>
      {utils.isDefined(dept) && (
        <AppText style={styles.sub_title}>{dept}</AppText>
      )}
    </View>
  )
}

export default PersonHandleCard

const styleWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    container: {
      gap: scale(3),
    },
    title: {
      fontFamily: FONTSFAMILY.NunitoExtraBold,
    },
    sub_title: {
      color: THEME.colors.text.secondary,
      fontFamily: FONTSFAMILY.NunitoSemiBold,
    },
  })
