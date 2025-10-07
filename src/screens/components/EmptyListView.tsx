import React, {Image, StyleSheet, View} from 'react-native'
import {Icons} from '~/assets'

import AppText from '~/components/AppText'
import {useAppStyles} from '~/hooks'
import {Fontsfamily} from '~/styles/FontsFamily'
import {AppTheme} from '~/styles/Theme'
import {scale} from '~/utils/scaleScreen'

const EmptyListView = ({
  textEmpty = 'Không có dữ liệu',
  showImageEmpty = true,
  enableMargin = true,
  iconSize = 80,
}: {
  textEmpty: string
  showImageEmpty?: boolean
  enableMargin?: boolean
  iconSize?: number
}) => {
  const {THEME} = useAppStyles()
  const styles = EmptyListStyles(THEME, iconSize)
  return (
    <View style={styles.container}>
      {showImageEmpty && (
        <Image
          source={Icons.icEmptyList}
          style={[styles.icon, enableMargin ? {marginTop: scale(200)} : {}]}
        />
      )}
      <AppText style={styles.text}>{textEmpty}</AppText>
    </View>
  )
}

const EmptyListStyles = (theme: AppTheme, iconSize: number) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {colors, fonts} = theme
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      width: scale(iconSize),
      height: scale(iconSize),
    },
    text: {
      fontFamily: Fontsfamily.Nunito.Bold,
    },
  })
}

export default EmptyListView
