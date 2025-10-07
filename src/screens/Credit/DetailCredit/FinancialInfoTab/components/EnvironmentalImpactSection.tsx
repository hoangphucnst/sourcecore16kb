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
import {EnvironmentalImpact} from '~/screens/Credit/hooks/useDetailCreditContract'

interface EnvironmentalImpactSectionProps {
  data?: EnvironmentalImpact[]
}

const EnvironmentalImpactSection: React.FC<EnvironmentalImpactSectionProps> = ({
  data = [],
}) => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  const styles = useLocalStyles(colors)

  let finalList: EnvironmentalImpact[] = []

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
      {finalList.length === 0 ? (
        <EmptyFileView />
      ) : (
        <>
          {finalList.map((item, index) => (
            <StyledContainer
              key={`${item.id}_${index}`}
              showLine={false}
              icon={{source: Icons.icLand}}>
              <View style={styles.infoBlock}>
                <AppText style={styles.label}>
                  {utils.safeValue(item?.impact)}
                </AppText>
                <View style={styles.contentBlock}>
                  <KeyValueRow
                    // title="Biện pháp kiểm soát:"
                    title="Biện pháp xử lý"
                    value={utils.safeValue(item?.solutionEI)}
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

export default EnvironmentalImpactSection

const useLocalStyles = (colors: any) => {
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
