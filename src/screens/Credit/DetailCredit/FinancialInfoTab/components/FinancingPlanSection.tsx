import {StyleSheet, View} from 'react-native'
import React from 'react'
import {scale} from '~/utils/scaleScreen'
import KeyValueRow from './KeyValueRow'
import {LoanPlan} from '~/screens/Credit/hooks/useDetailCreditContract'
import utils from '~/utils'

const FinancingPlanSection = ({data}: {data: LoanPlan}) => {
  const styles = useFinancingPlanSectionStyles()

  // utils.log('FinancingPlanSection', data)

  return (
    <View style={styles.container}>
      <View style={styles.itemWrapper}>
        <KeyValueRow
          title="Tổng nhu cầu dự án"
          value={utils.formatSafeValue(data?.totalCost, {isCurrency: true})}
          column
        />
      </View>
      <View style={styles.itemWrapper}>
        <KeyValueRow
          title="Vốn tự có"
          value={utils.formatSafeValue(data?.ownCapital, {isCurrency: true})}
          column
        />
      </View>
      <View style={styles.itemWrapper}>
        <KeyValueRow
          title="Vốn vay"
          value={utils.formatSafeValue(data?.loanCapital, {isCurrency: true})}
          column
        />
      </View>
      <View style={styles.itemWrapper}>
        <KeyValueRow
          title="Thời gian tính lãi (tháng)"
          value={utils.formatSafeValue(data?.interestTime)}
          column
        />
      </View>
      <View style={styles.itemWrapper}>
        <KeyValueRow
          title="Đơn vị tính của 1 chu kỳ dự án"
          value={utils.formatSafeValue(data?.cycleUnit)}
          column
        />
      </View>
      <View style={styles.itemWrapper}>
        <KeyValueRow
          title="Tỷ suất lợi nhuận/Tổng vốn đầu tư (%/năm)"
          value={utils.formatSafeValue(data?.profitRate, {isPercent: true})}
          column
        />
      </View>
      <View style={styles.itemWrapper}>
        <KeyValueRow
          title="Tỷ suất lợi nhuận/Vốn tự có (%/năm)"
          value={utils.formatSafeValue(data?.equityProfitRate, {
            isPercent: true,
          })}
          column
        />
      </View>
      <View style={styles.itemWrapper}>
        <KeyValueRow
          title="Vốn vay/vốn tự có của quỹ (tối đa 14%)"
          value={utils.formatSafeValue(data?.loanToOwnRatio, {isPercent: true})}
          column
        />
      </View>
      <View style={styles.itemWrapper}>
        <KeyValueRow
          title="Vốn vay của nhóm/vốn tự có của quỹ (Tối đa 23%)"
          value={utils.formatSafeValue(data?.groupLoanToOwnRatio, {
            isPercent: true,
          })}
          column
        />
      </View>
      <View style={styles.itemWrapper}>
        <KeyValueRow
          title="Tỷ lệ cho vay trung - dài hạn bằng nguồn vốn ngắn hạn (%)"
          value={utils.formatSafeValue(
            data?.shortTermFundingForLongTermLoanRatio,
            {
              isPercent: true,
            },
          )}
          column
        />
      </View>
      <View style={styles.itemWrapper}>
        <KeyValueRow
          title="Tỷ lệ cho vay trên nhu cầu vốn"
          value={utils.formatSafeValue(data?.loanProfitRatio, {
            isPercent: true,
          })}
          column
        />
      </View>
      <View style={styles.itemWrapper}>
        <KeyValueRow
          title="Đối tượng vay vốn"
          value={utils.safeValue(data?.loanClient)}
          column
        />
      </View>
      <View style={styles.itemWrapper}>
        <KeyValueRow
          title="Dự kiến nguồn trả nợ"
          value={utils.safeValue(data?.loanRepaymentPlan)}
          column
        />
      </View>
    </View>
  )
}

export default FinancingPlanSection

const useFinancingPlanSectionStyles = () => {
  return StyleSheet.create({
    container: {
      gap: scale(8),
    },
    itemWrapper: {
      gap: scale(4),
    },
  })
}
