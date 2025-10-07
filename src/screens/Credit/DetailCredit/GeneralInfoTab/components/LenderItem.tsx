import {StyleSheet, View} from 'react-native'
import React from 'react'
import AppText from '~/components/AppText'
import StyledContainer from '~/screens/Credit/components/StyledContainer'
import {useAppStyles} from '~/hooks'
import {scale} from '~/utils/scaleScreen'
import {Fontsfamily} from '~/styles/FontsFamily'
import RowInfo from './RowInfo'
import {BorrowerInfo} from '~/screens/Credit/hooks/useDetailCreditContract'
import utils from '~/utils'

const LenderItem = ({data}: {data: BorrowerInfo}) => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  const styles = useItemStyles()

  return (
    <StyledContainer
      container={{
        style: styles.container_icon,
      }}>
      <View style={styles.wrapper}>
        <AppText
          style={
            styles.name
          }>{`${utils.safeValue(data?.fullName)} - ${utils.safeValue(data.identityNumber)}`}</AppText>
        <View style={styles.infoContainer}>
          <RowInfo
            label="Mã KH: "
            value={utils.safeValue(data?.customerCode)}
            valueColor={colors.text.primary}
          />
          <RowInfo
            label="Ngày sinh: "
            value={utils.safeValue(data?.dateOfBirth)}
            valueColor={colors.text.primary}
          />
          <RowInfo
            label="Địa chỉ: "
            value={utils.safeValue(data?.address)}
            valueColor={colors.text.primary}
          />
        </View>
      </View>
    </StyledContainer>
  )
}

export default LenderItem

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
