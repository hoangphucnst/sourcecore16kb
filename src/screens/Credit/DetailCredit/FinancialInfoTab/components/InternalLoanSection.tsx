import {StyleSheet, View} from 'react-native'
import React from 'react'
import AppText from '~/components/AppText'
import {scale} from '~/utils/scaleScreen'
import {useAppStyles} from '~/hooks'
import {Fontsfamily} from '~/styles/FontsFamily'
import StyledContainer from '../../../components/StyledContainer'
import KeyValueRow from './KeyValueRow'
import {RelatedDebtInfo} from '~/screens/Credit/hooks/useDetailCreditContract'
import {EmptyFileView} from '~/screens/components'
import utils from '~/utils'

const InternalLoanSection = ({data = []}: {data: RelatedDebtInfo[]}) => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  const styles = useInternalLoanStyles(colors)

  const finalList: RelatedDebtInfo[] = Array.isArray(data)
    ? data
    : JSON.parse(data)

  if (!Array.isArray(finalList)) {
    return (
      <View style={styles.wrapper}>
        <AppText style={styles.subTitle}>
          Thông tin tổng dư nợ của khách hàng tại QTD
        </AppText>
        <View style={styles.listWrapper}>
          <AppText>Lỗi định dạng dữ liệu</AppText>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.wrapper}>
      <AppText style={styles.subTitle}>
        Thông tin tổng dư nợ của khách hàng tại QTD
      </AppText>
      <View style={styles.listWrapper}>
        {finalList.length === 0 ? (
          <EmptyFileView />
        ) : (
          <>
            {finalList?.map((item, index) => (
              <StyledContainer key={`Tong_DN_${index}`}>
                <AppText style={[styles.label, {color: colors.text.primary}]}>
                  {utils.safeValue(item?.status)}
                </AppText>
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
                    title="Ngày đến hạn"
                    value={utils.safeValue(item?.dueDate)}
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
                    value={utils.safeValue(item?.dueDate)}
                  />
                </View>
              </StyledContainer>
            ))}
          </>
        )}
      </View>
    </View>
  )
}

export default InternalLoanSection

const useInternalLoanStyles = (colors: any) => {
  return StyleSheet.create({
    wrapper: {
      gap: scale(8),
      marginTop: scale(8),
    },
    subTitle: {
      fontFamily: Fontsfamily.OpenSans.Bold,
      fontSize: scale(14),
      color: colors.primary,
    },
    listWrapper: {
      gap: scale(8),
      paddingLeft: scale(8),
    },
    label: {
      paddingTop: scale(6),
      fontFamily: Fontsfamily.Nunito.Bold,
      fontSize: scale(16),
    },
    infoBlock: {
      gap: scale(4),
      marginTop: scale(6),
    },
    value: {
      color: colors.text.secondary,
      fontFamily: Fontsfamily.Nunito.Regular,
    },
  })
}
