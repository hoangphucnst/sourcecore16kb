import {StyleSheet, View} from 'react-native'
import React from 'react'
import AppText from '~/components/AppText'
import {scale} from '~/utils/scaleScreen'
import {useAppStyles} from '~/hooks'
import {Fontsfamily} from '~/styles/FontsFamily'
import StyledContainer from '../../../components/StyledContainer'
import {Icons} from '~/assets'
import KeyValueRow from './KeyValueRow'
import {CreditInfo} from '~/screens/Credit/hooks/useDetailCreditContract'
import utils from '~/utils'
import {EmptyFileView} from '~/screens/components'

const CICCreditSection = ({data = []}: {data: CreditInfo[]}) => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  const styles = useCICStyles(colors)

  let finalList: CreditInfo[] = []

  try {
    if (Array.isArray(data)) {
      finalList = data
    } else if (typeof data === 'string') {
      finalList = JSON.parse(data)
    } else {
      finalList = []
    }
  } catch (error) {
    utils.log('CICCreditSection -> Lỗi parse JSON:', error)
    finalList = []
  }

  if (!Array.isArray(finalList)) {
    return (
      <View style={styles.wrapper}>
        <AppText style={styles.subTitle}>Thông tin CIC cá nhân</AppText>
        <View style={styles.listWrapper}>
          <AppText>Lỗi định dạng dữ liệu</AppText>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.wrapper}>
      <AppText style={styles.subTitle}>Thông tin CIC cá nhân</AppText>
      <View style={styles.listWrapper}>
        {finalList.length === 0 ? (
          <EmptyFileView />
        ) : (
          <>
            {finalList?.map((item, index) => (
              <StyledContainer
                key={`CIC_${index}`}
                sizeCircle={30}
                sizeIcon={18}
                icon={Icons.icMortgage}>
                <AppText style={[styles.label, {color: colors.text.primary}]}>
                  {utils.safeValue(item?.institutionName)}
                </AppText>
                <View style={styles.infoBlock}>
                  <KeyValueRow
                    title="Mục đích vay vốn"
                    value={utils.safeValue(item?.purpose)}
                  />
                  <KeyValueRow
                    title="Dư nợ"
                    value={item?.amount ? `${item?.amount} VND` : '---'}
                  />
                  <KeyValueRow
                    title="Lãi suất"
                    value={
                      item?.interestRate ? `${item?.interestRate}%` : '---'
                    }
                  />
                  <KeyValueRow
                    title="Nhóm nợ"
                    value={utils.safeValue(item?.group)}
                  />
                  <KeyValueRow
                    title="Ngày đến hạn"
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

export default CICCreditSection

const useCICStyles = (colors: any) => {
  return StyleSheet.create({
    wrapper: {
      gap: scale(8),
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
      fontFamily: Fontsfamily.Nunito.Bold,
      fontSize: scale(16),
      paddingTop: scale(6),
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
