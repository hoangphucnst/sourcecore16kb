import {StyleSheet, View} from 'react-native'
import React from 'react'
import AppText from '~/components/AppText'
import RowInfo from './RowInfo'
import StyledContainer from '~/screens/Credit/components/StyledContainer'
import utils from '~/utils'
import {useAppStyles} from '~/hooks'
import {scale, scaleFont} from '~/utils/scaleScreen'
import {Fontsfamily} from '~/styles/FontsFamily'
import {MortgageContract} from '~/services/apis/creditService'

const MortgageContractCard = ({data = null}: {data: MortgageContract}) => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  const repItemStyles = useRepItemStyles()

  return (
    <StyledContainer
      container={{
        style: repItemStyles.container_icon,
      }}>
      <View style={repItemStyles.wrapper}>
        <View style={repItemStyles.topRow}>
          <View style={repItemStyles.nameContainer}>
            <AppText style={repItemStyles.nameText}>
              {utils.safeValue(data?.mortgageContractNumber)}
            </AppText>
          </View>
          <AppText style={repItemStyles.dateText}>{data?.date}</AppText>
        </View>

        <View style={repItemStyles.infoContainer}>
          <RowInfo
            label="Chủ tài sản thế chấp: "
            value={data?.mortgageOwnerString}
            valueColor={colors.text.primary}
          />
          <RowInfo
            label="Số tiền đề nghị vay (Đồng): "
            value={
              utils.isDefined(data?.loanAmount)
                ? utils.formatMoney(data?.loanAmount, {showCurrency: false})
                : null
            }
            valueColor={colors.text.primary}
          />
        </View>
      </View>
    </StyledContainer>
  )
}

export default MortgageContractCard

const useRepItemStyles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    wrapper: {
      gap: scale(5),
      paddingVertical: scale(4),
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    nameContainer: {
      gap: scale(2),
      flex: 1,
    },
    nameText: {
      fontFamily: Fontsfamily.Nunito.Bold,
      fontSize: scaleFont(16),
      color: colors.text.primary,
    },
    positionText: {
      fontFamily: Fontsfamily.Nunito.SemiBold,
      fontSize: scaleFont(12),
      color: colors.text.secondary,
    },
    dateText: {
      fontSize: scaleFont(12),
      color: colors.text.secondary,
    },
    infoContainer: {
      gap: scale(4),
    },
    bottomRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    statusBox: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: colors.primary,
      paddingVertical: scale(1),
      paddingHorizontal: scale(9),
      borderRadius: scale(100),
    },
    statusText: {
      color: colors.white,
      fontSize: scaleFont(12),
      fontFamily: Fontsfamily.Nunito.Medium,
    },
    container_icon: {
      backgroundColor: colors.icon.background_dark,
    },
  })
}
