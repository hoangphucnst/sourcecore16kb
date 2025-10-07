import {StyleSheet, View} from 'react-native'
import AppText from '~/components/AppText'
import React from 'react'
import {useAppStyles} from '~/hooks'
import {scale} from '~/utils/scaleScreen'
import {Fontsfamily} from '~/styles/FontsFamily'
import utils from '~/utils'

interface RowInfoProps {
  label: string
  value: string
  valueColor: string
  bold?: boolean
  column?: boolean
}

const RowInfo = ({
  label,
  value,
  valueColor,
  bold,
  column = false,
}: RowInfoProps) => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  const styles = Styles()

  return (
    <View style={[styles.fieldInfo, column ? styles.column : styles.row]}>
      <AppText style={[styles.labelText, {color: colors.text.secondary}]}>
        {label}
      </AppText>
      <AppText
        style={[
          bold ? styles.valueTextBold : styles.valueText,
          {color: valueColor},
        ]}>
        {utils.safeValue(value)}
      </AppText>
    </View>
  )
}

export default RowInfo

const Styles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    fieldInfo: {
      width: '100%',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
    },
    row: {flexDirection: 'row'},
    column: {flexDirection: 'column', gap: scale(4)},
    labelText: {
      fontFamily: Fontsfamily.Nunito.Medium,
      fontSize: scale(14),
      color: colors.text.secondary,
    },
    valueText: {
      flex: 1,
      flexShrink: 1,
      fontFamily: Fontsfamily.Nunito.Medium,
      fontSize: scale(14),
      color: colors.text.primary,
    },
    valueTextBold: {
      flex: 1,
      flexShrink: 1,
      fontFamily: Fontsfamily.Nunito.Bold,
      fontSize: scale(14),
      color: colors.text.primary,
    },
  })
}
