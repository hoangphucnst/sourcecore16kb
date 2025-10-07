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
import {STATUS_PROCESS_TASK_QTD} from '~/constants'
import {SectionWrapper} from '~/screens/components'

export interface ProcessItem {
  taskProgressId: number
  taskId: number
  taskProgressPerson: number
  progressType: number | null
  progressContent: string
  taskProgressPersonName: string
  taskProgressPersonRole: string
  taskProgressStatus: number | null
  progressPercentage: number | null
  progressResultContent: string | null
  evaluationResult: string | null
  isActive: number
}

interface ProcessSectionProps {
  data?: ProcessItem[]
}

const ProcessSection: React.FC<ProcessSectionProps> = ({data}) => {
  const styles = useLocalStyles()

  return (
    <SectionWrapper>
      <View style={styles.title_container}>
        <AppText style={styles.title_section}>Tiến độ thực hiện</AppText>
      </View>
      <View style={styles.item_container}>
        {data?.length === 0 && (
          <View style={styles.emptyTextBlock}>
            <AppText>Không có dữ liệu</AppText>
          </View>
        )}
        {data?.map((item, index) => {
          return (
            <StyledContainer key={index} icon={{source: Icons.icProcess}}>
              <View>
                <AppText style={styles.title_item}>
                  {utils.safeValue(item?.taskProgressPersonName)}
                </AppText>
                <KeyValueRow
                  title="Vai trò"
                  value={utils.safeValue(item?.taskProgressPersonRole)}
                />
              </View>

              <KeyValueRow
                title="Loại xử lý"
                value={utils.safeValue(
                  utils.getTaskProcessText(item?.progressType),
                )}
              />
              <KeyValueRow
                title="Trạng thái"
                value={utils.safeValue(
                  STATUS_PROCESS_TASK_QTD[item?.taskProgressStatus],
                )}
              />
              <KeyValueRow
                title="Tiến độ"
                value={utils.safeValue(
                  utils.isDefined(item?.progressPercentage)
                    ? `${item?.progressPercentage}%`
                    : null,
                )}
              />
              <KeyValueRow
                title="Kết quả công việc"
                value={utils.safeValue(item?.progressResultContent)}
              />
              <KeyValueRow
                title="Kết quả đánh giá"
                value={utils.safeValue(item?.evaluationResult)}
              />
              <KeyValueRow
                title="Nội dung thực hiện"
                value={utils.safeValue(item?.progressContent)}
                column={item?.progressContent ? true : false}
              />
            </StyledContainer>
          )
        })}
      </View>
    </SectionWrapper>
  )
}

export default ProcessSection

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
