import {StyleSheet, View} from 'react-native'
import React from 'react'
import {Fontsfamily} from '~/styles/FontsFamily'
import AppText from '~/components/AppText'
import StyledContainer from '~/screens/Credit/components/StyledContainer'
import {useAppStyles} from '~/hooks'
import {scale} from '~/utils/scaleScreen'
import {Icons} from '~/assets'
import KeyValueRow from './KeyValueRow'
import GenericListSection from './GenericListSection'
import {IndirectCost} from '~/services/apis/creditService'
import utils from '~/utils'

export interface LoanCapitalItem {
  id: string
  title: string
  interestRate: string
  value: string
  cost: string
}

export const mockLoanCapitalData: LoanCapitalItem[] = [
  {
    id: '1',
    title: 'Khoản vay mua nhà',
    interestRate: '9%',
    value: '2.000.000.000 VNĐ',
    cost: '50.000.000 VNĐ',
  },
  {
    id: '2',
    title: 'Khoản vay mua xe',
    interestRate: '8%',
    value: '800.000.000 VNĐ',
    cost: '20.000.000 VNĐ',
  },
]

const LoanCapitalSection = ({data = []}: {data: IndirectCost[]}) => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  const styles = useLoanCapitalSectionStyles(colors)

  let finalList: IndirectCost[] = []

  try {
    if (Array.isArray(data)) {
      finalList = data
    } else if (typeof data === 'string') {
      finalList = JSON.parse(data)
    } else {
      finalList = []
    }
  } catch (error) {
    utils.log('ProjectCostSection -> Lỗi parse JSON:', error)
    finalList = []
  }

  return (
    <GenericListSection
      title="Chi phí trực tiếp"
      showTitle={false}
      data={finalList}
      renderItem={(item, index) => (
        <StyledContainer
          icon={{source: Icons.icLand}}
          key={`${item?.title}_${index}`}>
          <AppText style={styles.label}>{utils.safeValue(item?.name)}</AppText>
          <View style={styles.contentBlock}>
            <KeyValueRow
              title="Lãi vay"
              value={item?.interest ? `${item?.interest}%` : '---'}
            />
            <KeyValueRow
              title="Giá trị"
              value={utils.safeValue(
                utils.isDefined(item?.value)
                  ? utils.formatMoney(item?.value)
                  : null,
              )}
            />
            {/* <KeyValueRow
              title="Chi phí"
              value={utils.safeValue(
                utils.isDefined(item?.cost)
                  ? utils.formatMoney(item?.cost)
                  : null,
              )}
            /> */}
          </View>
        </StyledContainer>
      )}
    />
  )
}

export default LoanCapitalSection

const useLoanCapitalSectionStyles = (colors: any) => {
  return StyleSheet.create({
    label: {
      paddingTop: scale(8),
      color: colors.text.primary,
      fontFamily: Fontsfamily.Nunito.Bold,
    },
    contentBlock: {
      gap: scale(2),
    },
  })
}
