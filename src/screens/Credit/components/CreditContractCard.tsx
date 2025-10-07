import React, {useState} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {useAppStyles} from '~/hooks'
import AppText from '~/components/AppText'
import {scale} from '~/utils/scaleScreen'
import AppImage from '~/components/AppImage'
import {Icons} from '~/assets'
import {Fontsfamily} from '~/styles/FontsFamily'
import utils from '~/utils'
import StatusCard from '~/screens/components/CreditStatus'
import {CreditContract} from '~/services/apis/creditService'

const CreditContractCard = ({
  item,
  onPress,
}: {
  item: CreditContract
  onPress: () => void
}) => {
  const styles = useCreditContractCardStyles()
  const [height, setHeight] = useState(scale(22.2))
  const isBreakLine = Math.round(height) !== Math.round(scale(22.2))

  return (
    <View style={styles.base}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.rowBetween}>
            <AppText
              style={styles.nameText}
              numberOfLines={2}
              onLayout={event => {
                const _height = event.nativeEvent.layout.height
                setHeight(_height ?? 0)
              }}>
              {utils.safeValue(item?.customerString)}
            </AppText>
            <View style={isBreakLine ? styles.fullTextView : null}>
              <AppText style={styles.creationDateText}>
                Hạn chót {utils.safeValue(item?.loanEndDateStr)}
              </AppText>
            </View>
          </View>

          <View style={styles.gap5}>
            <View style={styles.rowGap6}>
              <AppText style={styles.titleText}>Mã Hồ Sơ</AppText>
              <AppText style={styles.contractNumberText}>
                {utils.safeValue(item?.creditCode)}
              </AppText>
            </View>
            <View style={styles.rowGap6}>
              <AppText style={styles.titleText}>Số HĐTD</AppText>
              <AppText style={styles.contractNumberText}>
                {utils.safeValue(item?.numberCreditStr)}
              </AppText>
            </View>

            <View style={styles.rowSpaceBetween}>
              <View style={styles.amountRow}>
                <AppImage source={Icons.icMoney} style={styles.icon} />
                <AppText style={styles.amountText}>
                  {`${utils.convertAmount(item?.loanAmount || 0)} VNĐ`}
                </AppText>
              </View>
              <StatusCard text={item?.statusName} status={item?.status} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default CreditContractCard

const useCreditContractCardStyles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME

  return StyleSheet.create({
    base: {
      marginHorizontal: scale(10),
      marginTop: scale(10),
      backgroundColor: colors.white,
      shadowColor: colors.black,
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      borderRadius: scale(8),
    },
    container: {
      flex: 1,
      gap: scale(8),
      padding: scale(10),
    },
    nameText: {
      fontSize: scale(16),
      fontFamily: Fontsfamily.Nunito.Bold,
      color: colors.text.primary,
    },
    fullTextView: {width: '100%', alignItems: 'flex-end'},
    creationDateText: {
      fontFamily: Fontsfamily.Nunito.Medium,
      color: colors.text.secondary,
      textAlign: 'right',
    },
    titleText: {
      fontSize: scale(14),
      fontFamily: Fontsfamily.Nunito.Medium,
      color: colors.text.secondary,
    },
    contractNumberText: {
      fontFamily: Fontsfamily.Nunito.Bold,
    },
    amountRow: {
      flexDirection: 'row',
    },
    amountText: {
      fontFamily: Fontsfamily.Nunito.Bold,
      color: colors.primary,
    },
    icon: {
      width: scale(20),
      height: scale(20),
      marginRight: scale(6),
    },
    pressed: {
      opacity: 0.2,
    },
    // 🆕 Added styles from inline
    rowBetween: {
      flex: 1,
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    gap5: {
      gap: scale(5),
    },
    rowGap6: {
      flexDirection: 'row',
      gap: scale(6),
    },
    rowSpaceBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  })
}
