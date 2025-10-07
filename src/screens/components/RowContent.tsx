import {StyleSheet, View} from 'react-native'
import React, {useCallback} from 'react'
import {AppTheme} from '~/styles/Theme'
import {useAppStyles} from '~/hooks'
import AppText from '~/components/AppText'
import {scale} from '~/utils/scaleScreen'
import AppCopyableText from '~/components/AppCopyableText'

type PropsRowContent = {
  label: string | null
  value: string | null
  labelComp: () => React.ReactNode | null
  valueComp: () => React.ReactNode | null
  styleLabel: StyleSheet
  styleValue: StyleSheet
}

const RowContent = ({
  label = 'label',
  value = '-',
  styleLabel = null,
  styleValue = null,
  labelComp = () => null,
  valueComp = () => null,
}: PropsRowContent) => {
  const {THEME} = useAppStyles()
  const styles = useCallback(styleWithTheme, [THEME])(THEME)

  return (
    <View style={styles.container}>
      {labelComp() != null ? (
        labelComp()
      ) : (
        <AppText style={[styles.label, styleLabel]}>{label}</AppText>
      )}
      {valueComp() != null ? (
        valueComp()
      ) : (
        <>
          {/* <AppText style={[styles.value, styleValue]}>{value ?? ''}</AppText> */}
          <AppCopyableText
            content={value}
            style={{
              ...styles.value,
              ...styleValue,
            }}
          />
        </>
      )}
    </View>
  )
}

export default RowContent

const styleWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: scale(7),
    },
    label: {
      flex: 0.5,
      color: THEME.colors.text.secondary,
    },
    value: {
      flex: 0.5,
      color: THEME.colors.text.primary,
      textAlign: 'right',
      flexWrap: 'wrap',
    },
  })
