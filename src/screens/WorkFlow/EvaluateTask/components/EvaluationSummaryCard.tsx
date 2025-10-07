import {StyleSheet, View} from 'react-native'
import React, {useState} from 'react'
import AppText from '~/components/AppText'
import utils from '~/utils'
import {useAppStyles} from '~/hooks'
import {Fontsfamily} from '~/styles/FontsFamily'
import {scale} from '~/utils/scaleScreen'
import TouchDropDown from '../../../components/TouchDropDown'
import {TaskProgress} from '~/services/apis/taskService'
import {EVALUATION_TASK, STATUS_PROCESS_TASK_QTD} from '~/constants'
import {Screens} from '~/screens/Screens'

export interface EvaluationSummaryCardProps {
  data: TaskProgress | null
  index: number
  getChangedTaskProgress?: (taskProgress: TaskProgress) => void
}

export const LIST_EVALUATION_TASK = [
  'Chưa đánh giá',
  EVALUATION_TASK.PASSED,
  EVALUATION_TASK.FAILED,
]

const EvaluationSummaryCard: React.FC<EvaluationSummaryCardProps> = ({
  data = null,
  index = 0,
  getChangedTaskProgress = () => {},
}) => {
  const [statusTask, setStatusTask] = useState(
    data?.evaluationResult ? data?.evaluationResult : LIST_EVALUATION_TASK[0],
  )
  const styles = Styles()

  const onSelectStatusTask = () => {
    utils.navigate(Screens.name.Modal_DropdownPicker, {
      title: 'Hãy đánh giá công việc',
      data: LIST_EVALUATION_TASK,
      selectedOption: statusTask,
      callbackSelectOption: value => {
        console.log('value', value)
        setStatusTask(value)
        const updatedTaskProgress = {
          ...data,
          evaluationResult: value,
        }
        getChangedTaskProgress(updatedTaskProgress)

        // utils.log('Danh gia cong viec', {
        //   newData: updatedTaskProgress,
        // })
      },
    })
  }

  return (
    <View style={styles.container}>
      {/* Left Section */}
      <View style={styles.section}>
        <View>
          <AppText
            style={
              styles.text_name
            }>{`${index + 1}. ${utils.safeValue(data?.taskProgressPersonName)}`}</AppText>
          <AppText style={[styles.text_sub, {fontSize: scale(12)}]}>
            {utils.safeValue(data?.taskProgressPersonRole)}
          </AppText>
        </View>
        <View>
          <View style={styles.row}>
            <AppText style={styles.text_sub}>{`Loại xử lý: `}</AppText>
            <AppText
              style={
                styles.text_value
              }>{`${utils.safeValue(utils.getTaskProcessText(data?.progressType))}`}</AppText>
          </View>
          <View style={styles.row}>
            <AppText style={styles.text_sub}>{`Trạng thái: `}</AppText>
            <AppText
              style={
                styles.text_value
              }>{`${utils.safeValue(STATUS_PROCESS_TASK_QTD[data?.taskProgressStatus])}`}</AppText>
          </View>
        </View>
      </View>

      {/* Right Secion */}
      <View style={styles.section}>
        <AppText style={styles.title_sub}>Kết quả đánh giá</AppText>
        <TouchDropDown value={statusTask} onPress={onSelectStatusTask} />
      </View>
    </View>
  )
}

export default EvaluationSummaryCard

const Styles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
    },
    list_row: {
      gap: scale(8),
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    section: {
      flex: 1,
      gap: scale(4),
    },
    text_name: {
      fontFamily: Fontsfamily.Nunito.Bold,
      color: colors.text.primary,
    },
    text_sub: {
      fontFamily: Fontsfamily.Nunito.Regular,
      color: colors.text.secondary,
      fontSize: scale(12),
    },
    title_sub: {
      fontFamily: Fontsfamily.Nunito.Regular,
      color: colors.text.secondary,
    },
    text_value: {
      fontFamily: Fontsfamily.Nunito.SemiBold,
      color: colors.text.primary,
      fontSize: scale(12),
    },
  })
}
