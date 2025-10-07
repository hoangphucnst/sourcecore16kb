import {StyleSheet, View} from 'react-native'
import React from 'react'
import AppText from '~/components/AppText'
import {scale, scaleFont} from '~/utils/scaleScreen'
import {Fontsfamily} from '~/styles/FontsFamily'
import {useAppStyles} from '~/hooks'
import StyledTitleOfSection from '~/screens/components/StyledTitleOfSection'
import StyledWarperSection from '~/screens/components/StyledWarperSection'
import {SectionWrapper} from '~/screens/components'
import utils from '~/utils'
import {GeneralInfo} from '~/screens/Credit/hooks/useDetailCreditContract'

const GeneralInfoSection = ({data}: {data: GeneralInfo}) => {
  return (
    <SectionWrapper>
      <StyledTitleOfSection title="Tổng quan" />

      <StyledWarperSection>
        {/* <RowContent
          label="Mã hồ sơ"
          value={utils.safeValue(data?.creditCode)}
        /> */}
        <RowContent
          label="Số HĐTD"
          value={utils.safeValue(data?.numberCreditStr)}
        />
        <RowContent
          // label="Ngày lập hồ sơ"
          label="Ngày lập HĐTD"
          value={utils.safeValue(data?.dateCreate)}
        />
        <RowContent
          // label="Đề xuất vay ngày"
          label="Ngày vay"
          value={utils.safeValue(data?.loanStartDate)}
        />
        <RowContent
          label="Thời hạn vay (Tháng)"
          value={utils.safeValue(data?.loanTerm)}
        />
        <RowContent
          label="Ngày trả nợ cuối cùng"
          value={utils.safeValue(data?.loanEndDate)}
        />
        <RowContent
          // label="Số tiền vay"
          label="Số tiền đề nghị vay (Đồng)"
          value={utils.formatMoney(utils.safeValue(data?.loanAmount))}
        />
        <RowContent
          // label="Lãi suất"
          label="Lãi suất vay (%)"
          value={
            data?.interestRate
              ? `${utils.safeValue(data?.interestRate)}%`
              : '---'
          }
        />
        <RowContent
          label="HĐ thế chấp tài sản"
          value={utils.safeValue(data?.mortgageContractNumber)}
        />
        <RowContent
          label="Phương thức cho vay"
          value={utils.safeValue(data?.loanMethod)}
        />
        <RowContent
          // label="Hình thức ĐB tiền vay"
          label="Hình thức đảm bảo"
          value={utils.safeValue(data?.collateralType)}
        />
        <RowContent
          // label="Tổng nợ dư của khách hàng"
          label="Tổng dư nợ khách hàng"
          value={utils.formatMoney(data?.totalCustomerDebt)}
        />
        <RowContent
          label="Tổng dư nợ của người liên quan"
          value={utils.formatMoney(data?.relatedPersonTotalDebt)}
        />
        <RowContent
          // label="Vốn tự có của quỹ (hiện tại)"
          label="Vốn tự có của quỹ"
          value={utils.formatMoney(data?.currentFundEquity)}
        />

        <RowContent
          label="Mục đích vay vốn"
          value={utils.safeValue(data?.loanPurposeLabel)}
        />
        <RowContent
          label="Loại cho vay"
          value={utils.safeValue(data?.loanType)}
        />
        <RowContent
          label="Thời hạn giải ngân (Tháng)"
          value={utils.safeValue(data?.disbursementTime)}
        />
        <RowContent
          label="Lãi suất cho vay"
          value={utils.safeValue(data?.interestMethod)}
        />
        <RowContent
          label="HĐTD được thừa hưởng"
          value={utils.safeValue(data?.inheritedContract)}
        />
        <RowContent
          label="Ngày bắt đầu tính lãi"
          value={utils.safeValue(data?.billingTime)}
        />
        <RowContent
          label="Kế hoạch trả nợ lãi và gốc"
          value={utils.safeValue(data?.debtRepaymentPlan)}
        />
        {/* <RowContent
          label="Tổng dư nợ/Vốn tự có"
          value={utils.formatMoney(data?.debtToEquityRatio, {
            mode: 'decimal',
          })}
        /> */}
        {/* <RowContent
          label="Tổng dư nợ của nhóm/Vốn tự có"
          value={utils.formatMoney(data?.groupDebtToEquityRatio, {
            mode: 'decimal',
          })}
        /> */}
      </StyledWarperSection>
    </SectionWrapper>
  )
}

export default GeneralInfoSection

const RowContent = ({label, value}: {label: string; value: string}) => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  const styles = useStyles(colors)

  return (
    <View style={styles.row}>
      <AppText style={styles.label}>{label}</AppText>
      <View style={styles.spaceText} />
      <AppText style={styles.value}>{value}</AppText>
    </View>
  )
}

const useStyles = (colors: any) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingVertical: scale(6),
    },
    label: {
      fontSize: scaleFont(14),
      fontFamily: Fontsfamily.Nunito.Medium,
      color: colors.text.secondary,
      flex: 0.45,
    },
    value: {
      fontSize: scaleFont(14),
      fontFamily: Fontsfamily.Nunito.SemiBold,
      color: colors.text.primary,
      flex: 0.45,
      textAlign: 'right',
    },
    spaceText: {
      flex: 0.2,
    },
  })
