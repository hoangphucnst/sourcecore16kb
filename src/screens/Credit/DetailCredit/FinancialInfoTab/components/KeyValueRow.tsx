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

const KeyValueRow = ({title, value, column = false}: KeyValueRowProps) => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  const styles = KeyValueRowStyles()

  const renderValue = (rawValue: any): string => {
    if (rawValue === null || rawValue === undefined) return '---'
    if (typeof rawValue === 'object') {
      if ('value' in rawValue) {
        console.log(title, rawValue)
        return rawValue.value ?? '---'
      }
      return JSON.stringify(rawValue)
    }
    return String(rawValue)
  }

  const renderTitle = (rawTitle: any): string => {
    if (rawTitle === null || rawTitle === undefined) return '---'
    if (typeof rawTitle === 'object') {
      if ('label' in rawTitle) {
        rawTitle.log(title, rawTitle)
        return rawTitle.label ?? '---'
      }
      return JSON.stringify(rawTitle)
    }
    return String(rawTitle)
  }

  return (
    <View style={[styles.item, column ? styles.column : styles.row]}>
      {column ? (
        <>
          <AppText style={[styles.title, {color: colors.text.secondary}]}>
            {renderTitle(title)}:
          </AppText>
          <AppText style={[styles.value, {color: colors.text.primary}]}>
            {`${renderValue(value)}`}
          </AppText>
        </>
      ) : (
        <AppText style={[styles.title, {color: colors.text.secondary}]}>
          {renderTitle(title)}:
          <AppText style={[styles.value, {color: colors.text.primary}]}>
            {` ${renderValue(value)}`}
          </AppText>
        </AppText>
      )}
    </View>
  )
}

export default KeyValueRow

const KeyValueRowStyles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    item: {
      width: '100%',
      gap: scale(4),
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-end',
    },
    column: {
      flexDirection: 'column',
    },
    title: {
      fontFamily: Fontsfamily.Nunito.Regular,
      color: colors.text.secondary,
    },
    value: {
      fontFamily: Fontsfamily.Nunito.SemiBold,
      color: colors.text.primary,
    },
    base: {
      maxWidth: '80%',
    },
  })
}
