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
import {DirectCost} from '~/services/apis/creditService'
import utils from '~/utils'

export interface LoanCapitalItem {
  id: string
  title: string
  interestRate: string
  value: string
  cost: string
}

export const mockProjectCostData: ProjectCostItem[] = [
  {
    id: '1',
    title: 'Mua đất nền khu A',
    interestRate: '7.5%',
    value: '3.200.000.000 VNĐ',
    cost: '150.000.000 VNĐ',
  },
  {
    id: '2',
    title: 'Xây dựng phần thô',
    interestRate: '8.2%',
    value: '5.500.000.000 VNĐ',
    cost: '320.000.000 VNĐ',
  },
]

const ProjectCostSection = ({data = []}: {data: DirectCost[]}) => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  const styles = useProjectCostSectionStyles(colors)

  let finalList: DirectCost[] = []

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
          key={`${item?.title}_${index}`}
          icon={{source: Icons.icLand}}>
          <AppText style={styles.label}>
            {utils.isDefined(item?.unit?.label)
              ? `${utils.safeValue(item?.name)} - [${utils.safeValue(item?.unit?.label)}]`
              : `${utils.safeValue(item?.name)}`}
          </AppText>
          <View style={styles.contentBlock}>
            {/* <KeyValueRow title="Lãi vay" value={item?.} /> */}
            <KeyValueRow
              title="Số lượng"
              value={utils.safeValue(
                utils.isDefined(item?.quantity)
                  ? utils.formatMoney(item?.quantity, {showCurrency: false})
                  : null,
              )}
            />
            <KeyValueRow
              title="Đơn giá"
              value={utils.safeValue(
                utils.isDefined(item?.price)
                  ? utils.formatMoney(item?.price)
                  : null,
              )}
            />
            <KeyValueRow
              title="Thành tiền"
              value={utils.safeValue(
                utils.isDefined(item?.total)
                  ? utils.formatMoney(item?.total)
                  : null,
              )}
            />
            <KeyValueRow title="Ghi chú" value={utils.safeValue(item?.note)} />
          </View>
        </StyledContainer>
      )}
    />
  )
}

export default ProjectCostSection

const useProjectCostSectionStyles = (colors: any) => {
  return StyleSheet.create({
    wrapper: {
      gap: scale(12),
      marginTop: scale(8),
    },
    subTitle: {
      fontFamily: Fontsfamily.OpenSans.Bold,
      fontSize: scale(14),
    },
    listWrapper: {
      gap: scale(12),
      paddingLeft: scale(8),
    },
    label: {
      color: colors.text.primary,
      fontFamily: Fontsfamily.Nunito.Bold,
    },
    value: {
      color: colors.text.secondary,
      fontFamily: Fontsfamily.Nunito.Regular,
    },
    infoBlock: {
      gap: scale(6),
    },
    contentBlock: {
      gap: scale(2),
    },
  })
}
