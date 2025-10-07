import {StyleSheet, View} from 'react-native'
import AppText from '~/components/AppText'
import React from 'react'
import {scale} from '~/utils/scaleScreen'
import {useAppStyles} from '~/hooks'
import {Fontsfamily} from '~/styles/FontsFamily'

interface KeyValueRowProps {
  title: string
  value: string
  column: boolean
}

const KeyValueRow = ({title, value, column}: KeyValueRowProps) => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  const styles = KeyValueRowStyles()

  return (
    <View style={[styles.row, column && styles.column]}>
      <AppText style={[styles.title, {color: colors.text.secondary}]}>
        {title}:
      </AppText>
      <AppText style={[styles.value, {color: colors.text.primary}]}>
        {value}
      </AppText>
    </View>
  )
}

export default KeyValueRow

const KeyValueRowStyles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    row: {
      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: scale(2),
    },
    column: {
      flexDirection: 'column',
      gap: scale(0),
    },
    title: {
      fontFamily: Fontsfamily.Nunito.Regular,
      color: colors.text.secondary,
    },
    value: {
      fontFamily: Fontsfamily.Nunito.SemiBold,
      color: colors.text.primary,
    },
  })
}
