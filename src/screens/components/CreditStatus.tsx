import {StyleSheet, View} from 'react-native'
import React from 'react'
import AppText from '~/components/AppText'
import {useAppStyles} from '~/hooks'
import {Fontsfamily} from '~/styles/FontsFamily'
import {scale} from '~/utils/scaleScreen'
import {STATUS_CONTRACT_COLORS} from '~/constants'
import utils from '~/utils'

const CreditStatus = ({
  text = '',
  status = '',
}: {
  text: string
  status: string
}) => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  const styles = CreditStatusStyles()
  const bgColor = STATUS_CONTRACT_COLORS[status] || colors.primary

  return (
    <View style={[{backgroundColor: bgColor}, styles.container]}>
      <AppText style={styles.text}>{utils.safeValue(text)}</AppText>
    </View>
  )
}

export default CreditStatus

const CreditStatusStyles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    container: {
      // width: scale(120),
      paddingHorizontal: scale(15),
      height: scale(26),
      borderRadius: scale(50),
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: colors.white,
      fontFamily: Fontsfamily.Nunito.Medium,
      fontSize: scale(14),
    },
  })
}
