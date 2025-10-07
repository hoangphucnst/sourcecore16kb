import {View, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import AppText from '~/components/AppText'
import {scale} from '~/utils/scaleScreen'
import {useAppStyles} from '~/hooks'
import {Fontsfamily} from '~/styles/FontsFamily'
import {AppTheme} from '~/styles/Theme'

type Props = {
  customerName: string
  profileCode: string
  contractNumber: string
  loanAmount: number
  createdAt: string
  onPress: () => void
}

const LoanCard = ({
  customerName,
  // profileCode,
  contractNumber,
  loanAmount,
  createdAt,
  onPress = () => {},
}: Props) => {
  const {THEME} = useAppStyles()
  const styles = styleWithTheme(THEME)

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress}>
        <>
          <AppText numberOfLines={2} style={styles.name}>
            {customerName}
          </AppText>
          <View style={styles.row}>
            {/* <View style={styles.col}>
              <AppText style={styles.label}>Mã hồ sơ</AppText>
              <AppText style={styles.text}>{profileCode}</AppText>
            </View> */}
            <View style={styles.col}>
              <AppText style={styles.label}>Số HĐTC</AppText>
              <AppText style={styles.text}>{contractNumber}</AppText>
            </View>
            <View style={styles.col}>
              <AppText style={styles.label}>Ngày tạo</AppText>
              <AppText style={styles.text}>{createdAt}</AppText>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.col}>
              <AppText style={styles.label}>ĐB số tiền vay</AppText>
              <AppText style={styles.text}>
                {loanAmount?.toLocaleString('vi-VN') || ''}
              </AppText>
            </View>
          </View>
        </>
      </TouchableOpacity>
    </View>
  )
}

export default LoanCard

const styleWithTheme = (THEME: AppTheme) => {
  const {sizes, colors} = THEME
  return StyleSheet.create({
    card: {
      backgroundColor: colors.white,
      borderRadius: scale(8),
      padding: scale(8),
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    name: {
      fontSize: sizes.h5,
      fontFamily: Fontsfamily.Nunito.Bold,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: scale(8),
    },
    col: {
      flex: 1,
      // gap: scale(8),
    },
    label: {
      color: colors.text.secondary,
      fontSize: sizes.h5,
      fontFamily: Fontsfamily.Nunito.Regular,
    },
    text: {
      color: colors.text.primary,
      fontSize: sizes.h5,
      fontFamily: Fontsfamily.Nunito.Regular,
    },
  })
}
