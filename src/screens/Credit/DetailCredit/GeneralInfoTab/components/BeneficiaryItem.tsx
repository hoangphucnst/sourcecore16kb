import {StyleSheet, View} from 'react-native'
import React from 'react'
import AppText from '~/components/AppText'
import StyledContainer from '~/screens/Credit/components/StyledContainer'
import {useAppStyles} from '~/hooks'
import {scale, scaleFont} from '~/utils/scaleScreen'
import {Fontsfamily} from '~/styles/FontsFamily'
import {BeneficiaryInfo} from '~/screens/Credit/hooks/useDetailCreditContract'
import utils from '~/utils'

const BeneficiaryItem = ({data}: {data: BeneficiaryInfo}) => {
  const styles = useItemStyles()
  return (
    <StyledContainer
      container={{
        style: styles.container_icon,
      }}>
      <View style={styles.wrapper}>
        <AppText style={styles.name}>
          {utils.safeValue(data?.beneficiaryName)}
        </AppText>
        <AppText style={styles.label}>
          {`STK: `}
          <AppText style={styles.value}>
            {utils.safeValue(data?.accountNumber)}
          </AppText>
        </AppText>
        <AppText style={styles.label}>
          {`Ngân hàng: `}
          <AppText style={styles.value}>{utils.safeValue(data?.bank)}</AppText>
        </AppText>
        <AppText style={styles.label}>
          {`Số tiền: `}
          <AppText style={styles.value}>
            {utils.safeValue(
              utils.isDefined(data?.amount)
                ? `${utils.formatMoney(data?.amount)}`
                : null,
            )}
          </AppText>
        </AppText>

        <AppText style={styles.label}>
          {`Phương thức: `}
          <AppText style={styles.value}>
            {utils.safeValue(data?.method)}
          </AppText>
        </AppText>

        <AppText style={styles.label}>
          {`Nội dung: `}
          <AppText style={styles.value}>
            {utils.safeValue(data?.content)}
          </AppText>
        </AppText>

        <AppText style={styles.label}>
          {`Ngày: `}
          <AppText style={styles.value}>{utils.safeValue(data?.date)}</AppText>
        </AppText>
      </View>
    </StyledContainer>
  )
}

export default BeneficiaryItem

const useItemStyles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    wrapper: {
      gap: scale(4),
    },
    name: {
      fontSize: scaleFont(16),
      fontFamily: Fontsfamily.Nunito.Bold,
      color: colors.text.primary,
    },
    label: {
      fontSize: scaleFont(14),
      fontFamily: Fontsfamily.Nunito.Medium,
      color: colors.text.secondary,
    },
    value: {
      fontSize: scaleFont(14),
      fontFamily: Fontsfamily.Nunito.Medium,
      color: colors.text.primary,
    },
    container_icon: {
      backgroundColor: colors.icon.background_dark,
    },
  })
}
