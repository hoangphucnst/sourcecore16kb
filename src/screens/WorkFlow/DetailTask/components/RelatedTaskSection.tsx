import {StyleSheet, View} from 'react-native'
import React from 'react'
import {scale} from '~/utils/scaleScreen'
import {Fontsfamily} from '~/styles/FontsFamily'
import {useAppStyles} from '~/hooks'
import StyledContainer from '~/screens/Credit/components/StyledContainer'
import AppText from '~/components/AppText'
import KeyValueRow from '../../components/KeyValeRow'
import {Icons} from '~/assets'
import utils from '~/utils'
import {STATUS_TASK_QTD} from '~/constants'

export interface RelatedTaskItem {
  taskName: string
  assignmentNames: string // người thực hiện
  taskStatus: number // trạng thái dạng số
  taskContent: string // mô tả
}

interface RelatedTaskSectionProps {
  data: RelatedTaskItem[]
}

const RelatedTaskSection: React.FC<RelatedTaskSectionProps> = ({data}) => {
  const styles = useLocalStyles()

  return (
    <View style={styles.container}>
      <View style={styles.title_container}>
        <AppText style={styles.title_section}>Công việc liên quan</AppText>
      </View>
      <View style={styles.item_container}>
        {data.length === 0 && (
          <View style={styles.emptyTextBlock}>
            <AppText>Không có dữ liệu</AppText>
          </View>
        )}
        {data.map((item, index) => (
          <StyledContainer key={index} icon={{source: Icons.icGear}}>
            <AppText style={styles.title_item}>
              {utils.safeValue(item?.taskName)}
            </AppText>
            <KeyValueRow
              title="Người thực hiện"
              value={utils.safeValue(item?.assignmentNames)}
            />
            <KeyValueRow
              title="Trạng thái"
              value={utils.safeValue(STATUS_TASK_QTD[item.taskStatus])}
            />
            <KeyValueRow
              title="Nội dung công việc"
              value={utils.safeValue(item?.taskContent)}
              column
            />
          </StyledContainer>
        ))}
      </View>
    </View>
  )
}

export default RelatedTaskSection

const useLocalStyles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      padding: scale(10),
      gap: scale(8),
    },
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
    title_container: {
      paddingLeft: scale(4),
      borderLeftWidth: scale(2),
      borderColor: colors.bookmark,
    },
    title_item: {
      fontSize: scale(16),
      fontFamily: Fontsfamily.Nunito.Bold,
    },
    emptyTextBlock: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
}
