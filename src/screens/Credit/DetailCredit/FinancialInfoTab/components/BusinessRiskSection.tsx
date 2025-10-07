import {StyleSheet, View} from 'react-native'
import React from 'react'
import KeyValueRow from './KeyValueRow'
import AppText from '~/components/AppText'
import StyledContainer from '~/screens/Credit/components/StyledContainer'
import {Fontsfamily} from '~/styles/FontsFamily'
import {scale} from '~/utils/scaleScreen'
import {useAppStyles} from '~/hooks'
import {Icons} from '~/assets'
import {EmptyFileView, StyledWarperSection} from '~/screens/components'
import {BusinessRisk} from '~/screens/Credit/hooks/useDetailCreditContract'
import utils from '~/utils'

const BusinessRiskSection = ({data = []}: {data: BusinessRisk[]}) => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  const styles = useBusinessRiskStyles(colors)

  let finalList: BusinessRisk[] = []

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

  return (
    <StyledWarperSection style={styles.wrapper}>
      {finalList?.length === 0 ? (
        <EmptyFileView />
      ) : (
        <>
          {finalList.map((item, index) => (
            <StyledContainer
              key={`BusinessRiskSection_${index}`}
              icon={{
                source: Icons.icLand,
              }}>
              <View style={styles.infoBlock}>
                <AppText style={styles.label}>
                  {utils.safeValue(item?.riskType)}
                </AppText>
                <View style={styles.contentBlock}>
                  <KeyValueRow
                    column
                    title="Biện pháp kiểm soát:"
                    value={utils.safeValue(item?.solution)}
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

export default BusinessRiskSection

const useBusinessRiskStyles = (colors: any) => {
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
      paddingTop: scale(8),
      color: colors.text.primary,
      fontFamily: Fontsfamily.Nunito.Bold,
      fontSize: scale(16),
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
