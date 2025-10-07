import {StyleSheet, View} from 'react-native'
import React from 'react'
import KeyValueRow from './KeyValueRow'
import AppText from '~/components/AppText'
import StyledContainer from '~/screens/Credit/components/StyledContainer'
import {Fontsfamily} from '~/styles/FontsFamily'
import {scale} from '~/utils/scaleScreen'
import {useAppStyles} from '~/hooks'
import {Icons} from '~/assets'
import utils from '~/utils'
import {EmptyFileView, StyledWarperSection} from '~/screens/components'
import {ProjectRevenue} from '~/screens/Credit/hooks/useDetailCreditContract'

interface ProjectRevenueSectionProps {
  data?: ProjectRevenue[]
}

const ProjectRevenueSection: React.FC<ProjectRevenueSectionProps> = ({
  data = [],
}) => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  const styles = useLoanCapitalSectionStyles(colors)

  let finalList: ProjectRevenue[] = []

  try {
    if (Array.isArray(data)) {
      finalList = data
    } else if (typeof data === 'string') {
      finalList = JSON.parse(data)
    } else {
      finalList = []
    }
  } catch (error) {
    utils.log('ProjectRevenueSection -> Lỗi parse JSON:', error)
    finalList = []
  }

  return (
    <StyledWarperSection style={styles.wrapper}>
      {finalList.length === 0 ? (
        <EmptyFileView />
      ) : (
        <>
          {finalList.map((item, index) => (
            <StyledContainer
              key={`${item?.name}_${index}`}
              icon={{source: Icons.icLand}}>
              <View style={styles.infoBlock}>
                <AppText style={styles.label}>
                  {utils.safeValue(item?.name)}
                </AppText>
                <View style={styles.contentBlock}>
                  <KeyValueRow
                    title="Số lượng"
                    value={utils.safeValue(item?.quantity)}
                  />
                  <KeyValueRow
                    title="Đơn vị tính"
                    // title={utils.safeValue(item?.unit?.label)}
                    value={utils.safeValue(item?.unit?.value)}
                  />
                  <KeyValueRow
                    title="Đơn giá"
                    value={
                      utils.isDefined(item?.price)
                        ? `${utils.formatMoney(item?.price)}`
                        : '---'
                    }
                  />
                  <KeyValueRow
                    title="Thành tiền"
                    value={
                      utils.isDefined(item?.total)
                        ? `${utils.formatMoney(item?.total)}`
                        : '---'
                    }
                  />
                  <KeyValueRow
                    title="Ghi chú"
                    value={utils.safeValue(item?.note)}
                    column={item?.note ? true : false}
                  />
                </View>
              </View>
            </StyledContainer>
          ))}
        </>
      )}
    </StyledWarperSection>
  )
}

export default ProjectRevenueSection

const useLoanCapitalSectionStyles = (colors: any) => {
  return StyleSheet.create({
    wrapper: {
      gap: scale(12),
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
      paddingTop: scale(8),
      color: colors.text.primary,
      fontSize: scale(16),
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
