import {StyleSheet, View} from 'react-native'
import React from 'react'
import AppText from '~/components/AppText'
import {scale} from '~/utils/scaleScreen'
import {useAppStyles} from '~/hooks'
import {Fontsfamily} from '~/styles/FontsFamily'
import StyledContainer from '../../../components/StyledContainer'
import KeyValueRow from './KeyValueRow'
import {
  RelatedDebtInfo,
  RelatedGroupDebtInfo,
} from '~/screens/Credit/hooks/useDetailCreditContract'
import utils from '~/utils'

const RelatedLoanSection = ({data}: {data: RelatedGroupDebtInfo[]}) => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  const styles = useRelatedLoanStyles(colors)
  const title = 'Thông tin tổng dư nợ của nhóm khách hàng có liên quan tại QTD'

  let finalList: RelatedDebtInfo[] = []

  try {
    if (Array.isArray(data)) {
      finalList = data
    } else if (typeof data === 'string') {
      finalList = JSON.parse(data)
    } else {
      finalList = []
    }
  } catch (error) {
    utils.log('RelatedLoanSection -> Lỗi parse JSON:', error)
    finalList = []
  }

  if (!Array.isArray(finalList)) {
    return (
      <View style={styles.wrapper}>
        <AppText style={styles.subTitle}>{title}</AppText>
        <View style={styles.listWrapper}>
          <AppText>Lỗi định dạng dữ liệu</AppText>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.wrapper}>
      <AppText style={styles.subTitle}>{title}</AppText>
      <View style={styles.listWrapper}>
        {finalList.map((item, index) => {
          return (
            <StyledContainer key={`${item?.group}_${index}`}>
              <View style={{gap: scale(2)}}>
                <AppText style={[styles.label, {color: colors.text.primary}]}>
                  {utils.safeValue(item?.fullName)}
                </AppText>
                <View style={styles.infoBlock}>
                  <KeyValueRow
                    title="CCCD"
                    value={utils.safeValue(item?.cccd)}
                  />
                  <KeyValueRow
                    title="Quan hệ"
                    value={utils.safeValue(item?.relationType)}
                  />
                </View>
                <View style={styles.infoBlock}>
                  <KeyValueRow
                    title="Dư nợ"
                    value={utils.safeValue(
                      utils.isDefined(item?.debtAmount)
                        ? `${utils.formatMoney(item?.debtAmount)}`
                        : null,
                    )}
                  />
                  <KeyValueRow
                    title="Lãi suất"
                    value={utils.safeValue(
                      utils.isDefined(item?.interestRate)
                        ? `${item?.interestRate}%`
                        : null,
                    )}
                  />
                  <KeyValueRow
                    title="Nhóm nợ"
                    value={utils.safeValue(item?.debtGroup)}
                  />
                  <KeyValueRow
                    title="Mục đích vay vốn"
                    value={utils.safeValue(item?.purpose)}
                  />
                  <KeyValueRow
                    title="Tính chất liên quan về tài chính đến khách hàng vay vốn"
                    value={utils.safeValue(item?.relatedInfo)}
                  />
                </View>
              </View>
            </StyledContainer>
          )
        })}
      </View>
    </View>
  )
}

export default RelatedLoanSection

const useRelatedLoanStyles = (colors: any) => {
  return StyleSheet.create({
    wrapper: {
      gap: scale(8),
      marginTop: scale(8),
    },
    subTitle: {
      color: colors.primary,
      fontFamily: Fontsfamily.OpenSans.Bold,
      fontSize: scale(14),
    },
    listWrapper: {
      gap: scale(8),
      paddingLeft: scale(8),
    },
    label: {
      paddingTop: scale(6),
      fontSize: scale(15),
      fontFamily: Fontsfamily.Nunito.Bold,
    },
    infoBlock: {
      width: '100%',
      gap: scale(4),
      marginTop: scale(6),
    },
    value: {
      fontSize: scale(13),
      color: colors.text.secondary,
      fontFamily: Fontsfamily.Nunito.Regular,
    },
  })
}
