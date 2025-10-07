import {Platform, StyleSheet, View} from 'react-native'
import React, {useCallback, useRef, useState} from 'react'
import {AppTheme} from '~/styles/Theme'
import {useAppStyles} from '~/hooks'
import AppHeader from '~/components/AppHeader'
import {Icons} from '~/assets'
import {scale} from '~/utils/scaleScreen'
import utils from '~/utils'
import AppScrollViewBody from '~/components/AppScrollViewBody'
import BoxView from '~/hoc/BoxView'
import AppText from '~/components/AppText'
import {FONTSFAMILY} from '~/styles/FontsFamily'
import AppInput from '~/components/AppInput'
import AppButton from '~/components/AppButton'
import TouchDropDown from '../../components/TouchDropDown'
import {TaskProgress} from '~/services/apis/taskService'
import useActionTaskQTD from '../hooks/useActionTaskQTD'
import {Screens} from '~/screens/Screens'
import {STATUS_PROCESS_TASK_QTD} from '~/constants'

export const LIST_STATUS_PROCESS_TASK_QTD = [
  'Chọn trạng thái',
  STATUS_PROCESS_TASK_QTD[1],
  STATUS_PROCESS_TASK_QTD[2],
  STATUS_PROCESS_TASK_QTD[3],
]

const UpdateTaskScreen = props => {
  const myProgressTask: TaskProgress = utils.ngetParam(
    props,
    'myProgressTask',
    null,
  )
  const {THEME} = useAppStyles()
  const styles = useCallback(styleWithTheme, [THEME])(THEME)
  const {updateTask} = useActionTaskQTD()

  const onBack = () => utils.goBackNavigation()
  const refInput = useRef<{
    PERCENT: string
    CONTENT: string
  }>({
    CONTENT: '',
    PERCENT: '',
  })
  const [statusTask, setStatusTask] = useState(LIST_STATUS_PROCESS_TASK_QTD[0])
  const [percentStat, setPercentStat] = useState('0')

  // // Allow handle demical
  // const onChangeText = (type: 'PERCENT' | 'CONTENT') => (value: string) => {
  //   if (type === 'PERCENT') {
  //     const cleanedValue = value.replace(/\s+/g, '').replace(',', '.')

  //     if (/^\d*\.?\d*$/.test(cleanedValue)) {
  //       setPercentStat(cleanedValue)

  //       const parsed = parseFloat(cleanedValue)
  //       if (!isNaN(parsed) && parsed > 100) {
  //         setPercentStat('100')
  //       }
  //     }
  //   } else {
  //     refInput.current[type] = value
  //   }
  // }

  const onChangeText = (type: 'PERCENT' | 'CONTENT') => (value: string) => {
    if (type === 'PERCENT') {
      const cleanedValue = value.replace(/\s+/g, '').replace(',', '.')
      const parsed = parseFloat(cleanedValue)

      if (!isNaN(parsed)) {
        const clamped = Math.min(Math.floor(parsed), 100)
        setPercentStat(clamped.toString())
      } else {
        setPercentStat('')
      }
    } else {
      refInput.current[type] = value
    }
  }

  const onSubmit = () => {
    if (statusTask === LIST_STATUS_PROCESS_TASK_QTD[0]) {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: 'Hãy chọn trạng thái cộng việc!',
        icon: 'danger',
        type: 'danger',
      })
      return
    }

    if (percentStat === '') {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: 'Hãy nhập tiến độ!',
        icon: 'danger',
        type: 'danger',
      })
      return
    }

    const parsed = Number(percentStat)

    if (isNaN(parsed) || !isFinite(parsed)) {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: 'Không đúng định dạng số!',
        icon: 'danger',
        type: 'danger',
      })
      return
    }

    if (refInput.current.CONTENT === '') {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: 'Hãy nhập kết quả công việc!',
        icon: 'danger',
        type: 'danger',
      })
      return
    }

    updateTask({
      taskProgressId: myProgressTask.taskProgressId,
      taskProgressStatus: utils.reverseConstantValue(
        STATUS_PROCESS_TASK_QTD,
        statusTask,
      ),
      taskProgressContent: refInput.current.CONTENT,
      progressPercent: percentStat === '' ? '0' : percentStat,
    })
  }

  const onSelectStatusTask = () => {
    utils.navigate(Screens.name.Modal_DropdownPicker, {
      title: 'Chọn trạng thái công việc',
      data: LIST_STATUS_PROCESS_TASK_QTD,
      selectedOption: statusTask,
      callbackSelectOption: value => {
        setStatusTask(value)
      },
    })
  }

  return (
    <View style={styles.container}>
      <AppHeader
        title="Cập nhật tiến độ"
        styleHeader={styles.header}
        styleTitle={{color: THEME.colors.white}}
        iconLeft={Icons.icBack}
        styleIconLeft={{
          width: scale(24),
          height: scale(24),
          tintColor: THEME.colors.white,
        }}
        onPressLeft={onBack}
      />
      <AppScrollViewBody
        horizontalInit={scale(10)}
        contentContainerStyle={styles.content}>
        {/* {Ý kiến xử lý} */}
        <BoxView
          style={{marginTop: scale(10), gap: scale(5), paddingTop: scale(0)}}>
          <AppText style={styles.title}>
            Tiến độ (%)<AppText style={styles.redTxt}>*</AppText>
          </AppText>
          <AppInput
            style={styles.input_percent_task}
            placeholder="Nhập tiến độ vào"
            value={percentStat}
            onChangeText={onChangeText('PERCENT')}
            keyboardType="number-pad"
          />
          <AppText style={styles.title}>
            Trạng thái công việc<AppText style={styles.redTxt}>*</AppText>
          </AppText>
          <TouchDropDown value={statusTask} onPress={onSelectStatusTask} />
          <AppText style={styles.title}>
            Kết quả công việc<AppText style={styles.redTxt}>*</AppText>
          </AppText>
          <AppInput
            style={styles.input}
            placeholder="Nhập kết quả công việc"
            multiline
            onChangeText={onChangeText('CONTENT')}
          />
          <AppButton
            onPress={onSubmit}
            title="Cập nhật"
            styleButton={styles.button}
            styleTitle={{color: THEME.colors.white}}
          />
        </BoxView>
      </AppScrollViewBody>
    </View>
  )
}

export default UpdateTaskScreen

const styleWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: THEME.colors.background,
    },
    header: {
      backgroundColor: THEME.colors.primary,
    },
    content: {},
    title: {
      fontFamily: FONTSFAMILY.NunitoExtraBold,
      color: THEME.colors.text.secondary,
      marginTop: scale(10),
    },
    input: {
      borderWidth: 0.5,
      borderColor: THEME.colors.border,
      textAlignVertical: 'top',
      padding: THEME.sizes.pd10,
      paddingTop: scale(10),
      borderRadius: scale(10),
      height: scale(100),
    },
    button: {
      alignSelf: 'center',
      paddingHorizontal: scale(20),
      marginTop: scale(10),
    },
    input_percent_task: {
      borderWidth: 0.5,
      borderColor: THEME.colors.border,
      borderRadius: scale(10),
      padding: Platform.OS === 'ios' ? scale(10) : scale(5),
    },
    redTxt: {
      color: 'red',
    },
  })
