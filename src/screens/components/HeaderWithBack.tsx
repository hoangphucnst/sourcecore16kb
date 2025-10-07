import {StyleSheet} from 'react-native'
import React from 'react'
import AppHeader from '~/components/AppHeader'
import {Icons} from '~/assets'
import {useAppStyles} from '~/hooks'
import {Fontsfamily} from '~/styles/FontsFamily'
import {scale} from '~/utils/scaleScreen'
import utils from '~/utils'

const HeaderWithBack = ({title = 'Test_Header'}: {title: string}) => {
  const styles = Styles()
  const onBack = () => {
    utils.goBackNavigation()
  }
  return (
    <AppHeader
      title={title}
      styleTitle={styles.text_title}
      styleHeader={styles.container_title}
      iconLeft={Icons.icBack}
      styleIconLeft={styles.iconLeft}
      onPressLeft={onBack}
    />
  )
}

export default HeaderWithBack

const Styles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    text_title: {
      color: colors.white,
      fontFamily: Fontsfamily.OpenSans.SemiBold,
    },
    container_title: {
      backgroundColor: colors.primary,
    },
    iconLeft: {
      width: scale(24),
      height: scale(24),
      tintColor: colors.white,
    },
  })
}
