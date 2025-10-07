import {StyleSheet, View} from 'react-native'
import React from 'react'
import AppText from '~/components/AppText'
import StyledContainer from '~/screens/Credit/components/StyledContainer'
import {useAppStyles} from '~/hooks'
import {scale} from '~/utils/scaleScreen'
import {Fontsfamily} from '~/styles/FontsFamily'
import RowInfo from './RowInfo'
import utils from '~/utils'
import {Icons} from '~/assets'
import {RepayPlanItem as TypeRepayPlanItem} from '~/services/apis/creditService'
import {DEBT_REPAY_METHOD} from '~/constants'

const RepayPlanItem = ({
  data = null,
  index = 0,
}: {
  data: TypeRepayPlanItem
  index: string
}) => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  const styles = useItemStyles()

  return (
    <StyledContainer
      icon={{
        source: Icons.icCashPay,
      }}
      container={{
        style: styles.container_icon,
      }}>
      <View style={styles.wrapper}>
        <AppText style={styles.name}>{`Trả lần ${index}`}</AppText>
        <View style={styles.infoContainer}>
          <RowInfo
            label="Ngày: "
            value={utils.safeValue(data?.date)}
            valueColor={colors.text.primary}
          />
          <RowInfo
            label="Số tiền: "
            value={utils.safeValue(
              utils.isDefined(data?.amount)
                ? `${utils.formatMoney(data?.amount)}`
                : null,
            )}
            valueColor={colors.text.primary}
          />
          <RowInfo
            label="Phương thức: "
            value={utils.safeValue(DEBT_REPAY_METHOD[data?.method])}
            valueColor={colors.text.primary}
          />
          <RowInfo
            column={utils.safeValue(data?.content)}
            label="Nội dung: "
            value={utils.safeValue(data?.content)}
            valueColor={colors.text.primary}
          />
        </View>
      </View>
    </StyledContainer>
  )
}

export default RepayPlanItem

const useItemStyles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME

  return StyleSheet.create({
    name: {
      fontSize: scale(16),
      fontFamily: Fontsfamily.Nunito.Bold,
      color: colors.text.primary,
    },
    wrapper: {
      width: '100%',
      gap: scale(8),
    },
    infoContainer: {
      gap: scale(4),
    },
    infoText: {
      fontSize: scale(12),
      color: colors.text.secondary,
    },
    container_icon: {
      backgroundColor: colors.icon.background_dark,
    },
  })
}
