import {StyleSheet, View} from 'react-native'
import React, {useRef, useState} from 'react'
import HeaderWithBack from '~/screens/components/HeaderWithBack'
import {useAppStyles} from '~/hooks'
import AppScrollViewBody from '~/components/AppScrollViewBody'
import BoxView from '~/hoc/BoxView'
import AppText from '~/components/AppText'
import AppInput from '~/components/AppInput'
import OptionSend from '../components/OptionSend'
import AppButton from '~/components/AppButton'
import utils from '~/utils'
import {Fontsfamily} from '~/styles/FontsFamily'
import {scale} from '~/utils/scaleScreen'
import EvaluationSummaryCard from './components/EvaluationSummaryCard'
import DashLine from '~/screens/components/DashLine'
import {DetailTaskQTD} from '~/services/apis/taskService'
import useActionTaskQTD from '../hooks/useActionTaskQTD'
import {REVIEW_TASK_TYPE_BUTTON} from '~/constants'

const EvaluateTaskScreen = props => {
  const detailTask: DetailTaskQTD = utils.ngetParam(props, 'detailTask', null)
  const styles = Styles()
  const refSend = useRef<OptionSendRef>(null)
  const refInput = useRef('')
  const [taskProgressList, setTaskProgressList] = useState(
    detailTask?.taskProgresses || [],
  )
  const {reviewTask} = useActionTaskQTD()

  const onChangeText = (value: string) => (refInput.current = value)

  const onSubmit = (typeButton: number) => {
    const isEvaluteDoneAll =
      taskProgressList.filter(_ => !utils.isDefined(_.evaluationResult))
        .length === 0

    if (!isEvaluteDoneAll) {
      utils.showMessageFlash({
        description: 'Hãy đánh giá đầy đủ trong danh sách người thực hiện',
        type: 'warning',
        icon: 'warning',
      })
      return
    }

    if (!utils.isDefined(refInput.current)) {
      utils.showMessageFlash({
        description: 'Ý kiến xử lý không được để trống',
        type: 'warning',
        icon: 'warning',
      })
      return
    }

    const type = refSend.current?.getValue()

    const {sms, email} = type
    const typeSend = [email && 'email', sms && 'sms'].filter(Boolean).join(',')

    reviewTask({
      id_task: detailTask?.taskId,
      feedback: refInput.current,
      typeSend: typeSend,
      taskProgress: taskProgressList,
      typeButton: typeButton,
    })
  }

  return (
    <View style={styles.container}>
      <HeaderWithBack title="Đánh giá công việc" />
      <AppScrollViewBody
        horizontalInit={scale(10)}
        contentContainerStyle={styles.list}>
        {/* {Danh sách người thực hiện} */}
        <BoxView>
          <AppText style={styles.title}>Người thực hiện</AppText>
          {taskProgressList.map((item, index) => (
            <View key={`${item?.taskId}_${index}`}>
              <EvaluationSummaryCard
                data={item}
                index={index}
                getChangedTaskProgress={updatedTask => {
                  utils.log('Check data outside', {
                    updatedTask: updatedTask,
                  })
                  setTaskProgressList(prev =>
                    prev.map(_task =>
                      _task.taskProgressId === updatedTask.taskProgressId
                        ? updatedTask
                        : _task,
                    ),
                  )
                }}
              />
              {index !== taskProgressList.length - 1 && <DashLine />}
            </View>
          ))}
        </BoxView>

        {/* {Ý kiến xử lý} */}
        <BoxView style={{marginTop: scale(10)}}>
          <AppText style={styles.title}>Ý kiến</AppText>
          <AppInput
            style={styles.input}
            placeholder="Nhập ý kiến xử lý"
            multiline
            onChangeText={onChangeText}
          />
          <OptionSend ref={refSend} />

          <View style={styles.submitBase}>
            <AppButton
              onPress={() => onSubmit(REVIEW_TASK_TYPE_BUTTON.ReProcessTask)}
              title="Xử lý lại"
              styleButton={styles.button}
              styleTitle={styles.textButton}
            />
            <AppButton
              onPress={() => onSubmit(REVIEW_TASK_TYPE_BUTTON.SaveEvaluteTask)}
              title="Đánh giá"
              styleButton={styles.button}
              styleTitle={styles.textButton}
            />
          </View>
        </BoxView>
      </AppScrollViewBody>
    </View>
  )
}

export default EvaluateTaskScreen

const Styles = () => {
  const {THEME} = useAppStyles()
  const {colors, sizes} = THEME
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    list: {
      paddingTop: sizes.pd10,
    },
    title: {
      fontFamily: Fontsfamily.Nunito.ExtraBold,
      color: colors.primary,
      marginBottom: sizes.mg10,
    },
    input: {
      borderWidth: 0.5,
      borderColor: colors.border,
      textAlignVertical: 'top',
      padding: sizes.pd10,
      paddingTop: scale(10),
      borderRadius: scale(10),
      height: scale(100),
    },
    button: {
      flex: 1,
    },
    textButton: {
      color: colors.white,
    },
    submitBase: {
      marginTop: scale(25),
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: scale(10),
    },
  })
}
