import {StyleSheet, TouchableOpacity, View} from 'react-native'
import React, {useCallback} from 'react'
import {AppTheme} from '~/styles/Theme'
import {useAppStyles} from '~/hooks'
import {scale} from '~/utils/scaleScreen'
import AppText from '~/components/AppText'
import AppImage from '~/components/AppImage'
import {Icons} from '~/assets'
import {Customer} from '~/services/apis/customerService'
import {FONTSFAMILY} from '~/styles/FontsFamily'

type PropsCardCustomer = {
  customer: Customer
  onPress: () => void
}

const CardCustomer = ({
  customer = null,
  onPress = () => {},
}: PropsCardCustomer) => {
  const {THEME} = useAppStyles()
  const styles = useCallback(styleWithTheme, [THEME])(THEME)

  // console.log('customer?.status', customer?.status)

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.row_content_header}>
            <AppText
              numberOfLines={1}
              style={{
                color: THEME.colors.text.primary,
                fontFamily: FONTSFAMILY.NunitoExtraBold,
              }}>
              {customer?.fullName}
            </AppText>
            <AppImage
              source={customer?.status === 0 ? Icons.icLock : Icons.icUnLock}
              style={[
                styles.icon,
                customer?.status !== 0 && {tintColor: THEME.colors.primary},
              ]}
            />
          </View>
          <AppText style={styles.row_left}>
            Mã khách hàng:{' '}
            <AppText style={styles.row_right}>{customer?.customerCode}</AppText>
          </AppText>
          <AppText style={styles.row_left_value}>
            CCCD:
            <AppText style={styles.row_right_value}> {customer?.cccd}</AppText>
          </AppText>
          <AppText numberOfLines={2}>{customer?.address}</AppText>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default CardCustomer

const styleWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    card: {
      backgroundColor: THEME.colors.white,
      borderRadius: scale(8),
      // padding: scale(8),
      shadowColor: THEME.colors.black,
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    container: {
      backgroundColor: THEME.colors.white,
      padding: scale(10),
      borderRadius: scale(8),
      gap: scale(5),
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 4, // do itemdanhsach shadow k hiện rõ trên android,
      shadowColor: THEME.colors.shadow,
    },
    row_content: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    row_right: {
      color: THEME.colors.text.primary,
    },
    row_left: {
      color: THEME.colors.text.secondary,
    },
    row_right_value: {
      flex: 0.5,
      color: THEME.colors.text.primary,
    },
    row_left_value: {
      flex: 0.5,
      color: THEME.colors.text.secondary,
    },
    icon: {
      width: scale(18),
      height: scale(18),
    },
    row_content_header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  })
