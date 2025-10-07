import {StyleSheet, View} from 'react-native'
import React from 'react'
import AppText from '~/components/AppText'
import {scale} from '~/utils/scaleScreen'
import {Fontsfamily} from '~/styles/FontsFamily'
import {useAppStyles} from '~/hooks'

const StyledTitleOfSection = ({
  title = 'Title Of Section',
  style,
}: {
  title: string
  style: StyleSheet
}) => {
  const styles = Styles()
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.column]} />
      <AppText style={styles.sectionTitle} numberOfLines={2}>
        {title}
      </AppText>
    </View>
  )
}

export default StyledTitleOfSection

const Styles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(8),
    },
    column: {
      height: '100%',
      width: scale(3),
      backgroundColor: '#F55456',
    },
    sectionTitle: {
      fontSize: scale(16),
      fontFamily: Fontsfamily.OpenSans.Bold,
      color: colors.primary,
    },
  })
}
