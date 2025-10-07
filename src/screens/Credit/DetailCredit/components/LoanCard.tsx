import {StyleSheet, View} from 'react-native'
import React from 'react'
import AppText from '~/components/AppText'
import {useAppStyles} from '~/hooks'
import utils from '~/utils'
import {scale} from '~/utils/scaleScreen'
import {Fontsfamily} from '~/styles/FontsFamily'

type LoanCardProps = {
  fullName?: string
  idCitizen?: string
  customerCode?: string
  no?: number
}

const LoanCard = (props: LoanCardProps) => {
  const {no = '', fullName, idCitizen, customerCode} = props
  const styles = Styles()

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>
        {no}. {utils.safeValue(fullName)} - {utils.safeValue(idCitizen)}
      </AppText>
      <AppText style={styles.sub_title}>
        Mã khách hàng: {utils.safeValue(customerCode)}
      </AppText>
    </View>
  )
}

export default LoanCard

const Styles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    container: {
      gap: scale(3),
    },
    title: {
      fontFamily: Fontsfamily.Nunito.ExtraBold,
    },
    sub_title: {
      color: colors.text.secondary,
      fontFamily: Fontsfamily.Nunito.SemiBold,
    },
  })
}
