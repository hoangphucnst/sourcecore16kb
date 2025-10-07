import {StyleSheet, TouchableOpacity, View} from 'react-native'
import React from 'react'
import AppText from '~/components/AppText'
import TaskStatus from '~/screens/components/TaskStatus'
import {scale} from '~/utils/scaleScreen'
import {useAppStyles} from '~/hooks'
import {Fontsfamily} from '~/styles/FontsFamily'
import {TaskQTD} from '~/services/apis/taskService'
import utils from '~/utils'
import {
  STATUS_TASK_QTD,
  TYPE_PROCESSS_TASK_QTD,
  TYPE_TASK_QTD,
} from '~/constants'

const TaskCard = ({
  data,
  onPress = () => {},
}: {
  data: TaskQTD
  onPress: (task: TaskQTD) => void
}) => {
  const styles = useTaskCardStyles()

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.container_inner}
        onPress={() => {
          onPress(data)
        }}>
        <AppText numberOfLines={2} style={styles.contractCode_text}>
          {utils.safeValue(data?.taskName)}
        </AppText>
        <View style={styles.lineB}>
          <View style={styles.row}>
            <AppText style={styles.subLabel}>{`Loại công việc: `}</AppText>
            <AppText style={styles.subValue}>
              {utils.safeValue(TYPE_TASK_QTD[data?.taskType])}
            </AppText>
          </View>
          <View style={styles.row}>
            <AppText style={styles.subLabel}>{`Trạng thái cá nhân: `}</AppText>
            <AppText style={styles.subValue}>
              {data?.personalStatus === 0
                ? '---'
                : utils.safeValue(TYPE_PROCESSS_TASK_QTD[data?.personalStatus])}
            </AppText>
          </View>
          <View style={styles.status_view}>
            <View style={styles.row}>
              <AppText style={styles.date_title}>{`Hạn xử lý: `}</AppText>
              <AppText
                style={
                  styles.date_text
                }>{`${utils.safeValue(utils.convertDateFormat(data?.dueDate, 'YYYY-MM-DD', 'DD/MM/YYYY'))}`}</AppText>
            </View>
            <TaskStatus
              text={utils.safeValue(STATUS_TASK_QTD[data?.taskStatus])}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default TaskCard

const useTaskCardStyles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: scale(10),
      marginVertical: scale(5),
      borderRadius: scale(8),
      backgroundColor: colors.white,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    container_inner: {
      flex: 1,
      paddingHorizontal: scale(10),
      paddingVertical: scale(8),
      gap: scale(3),
      borderRadius: scale(8),
    },
    lineA: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    lineB: {
      gap: scale(3),
    },
    date_view: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      // gap: scale(4),
    },
    date_title: {
      fontFamily: Fontsfamily.Nunito.Regular,
    },
    date_text: {
      color: colors.primary,
      fontFamily: Fontsfamily.Nunito.SemiBold,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    contractCode_text: {
      fontFamily: Fontsfamily.Nunito.Bold,
      fontSize: scale(16),
    },
    subLabel: {
      fontFamily: Fontsfamily.Nunito.Regular,

      color: colors.text.secondary,
    },
    subValue: {
      fontFamily: Fontsfamily.Nunito.SemiBold,

      color: colors.primary,
    },
    icon: {
      width: scale(20),
      height: scale(20),
      tintColor: colors.primary,
    },
    status_view: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
  })
}
