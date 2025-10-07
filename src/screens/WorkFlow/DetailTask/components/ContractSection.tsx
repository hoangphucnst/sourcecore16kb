import {StyleSheet, View} from 'react-native'
import React from 'react'
import {scale} from '~/utils/scaleScreen'
import {Fontsfamily} from '~/styles/FontsFamily'
import {useAppStyles} from '~/hooks'
import StyledContainer from '~/screens/Credit/components/StyledContainer'
import AppText from '~/components/AppText'
import KeyValueRow from '../../components/KeyValeRow'
import utils from '~/utils'
import {Icons} from '~/assets'
import DashLine from '~/screens/components/DashLine'
import {SectionWrapper} from '~/screens/components'

export interface RelatedProfileItem {
  id: string
  customerName: string
  profileCode: string
  contractNumber: string
}

export interface RelatedProfileGroup {
  type: 'Thế chấp' | 'Tín dụng'
  items: RelatedProfileItem[]
}

export interface ContractSectionProps {
  data: RelatedProfileGroup[]
}

const ContractSection: React.FC<ContractSectionProps> = ({data = []}) => {
  const styles = useLocalStyles()

  return (
    <SectionWrapper>
      <View style={styles.blockTtitle}>
        <AppText style={styles.title_section}>Hồ sơ liên quan</AppText>
      </View>
      <View style={styles.item_container}>
        {data.map((group, index) => (
          <View key={`${group.type}_${index}`}>
            <AppText style={styles.smolTitle}>{group.type}</AppText>

            <View style={{padding: scale(10), gap: scale(10)}}>
              {group.items.length === 0 && (
                <View style={styles.emptyTextBlock}>
                  <AppText>Không có dữ liệu</AppText>
                </View>
              )}
              {group.items.map(item => (
                <StyledContainer
                  key={item.id}
                  icon={{
                    source:
                      group.type === 'Thế chấp'
                        ? Icons.icMortgageSolid
                        : Icons.icCreditSolid,
                  }}>
                  <AppText style={styles.title_item}>
                    {utils.safeValue(item.customerName)}
                  </AppText>
                  {/* <KeyValueRow
                    title="Mã hồ sơ"
                    value={utils.safeValue(item.profileCode)}
                  /> */}
                  <KeyValueRow
                    // title="Số HĐTD"
                    title="Số HĐTC"
                    value={utils.safeValue(item.contractNumber)}
                  />
                </StyledContainer>
              ))}
            </View>
            {index === 0 && <DashLine unit={6} />}
          </View>
        ))}
      </View>
    </SectionWrapper>
  )
}

export default ContractSection

const useLocalStyles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    item_container: {
      padding: scale(10),
      gap: scale(10),
      backgroundColor: colors.white,
      borderRadius: scale(10),
    },
    title_section: {
      fontSize: scale(16),
      color: colors.primary,
      fontFamily: Fontsfamily.OpenSans.Bold,
    },
    blockTtitle: {
      paddingLeft: scale(4),
      borderLeftWidth: scale(2),
      borderColor: colors.bookmark,
    },
    title_item: {
      fontSize: scale(16),
      fontFamily: Fontsfamily.Nunito.Bold,
    },
    smolTitle: {
      fontFamily: Fontsfamily.Nunito.Bold,
      fontSize: scale(16),
      color: colors.primary,
    },
    emptyTextBlock: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
}
