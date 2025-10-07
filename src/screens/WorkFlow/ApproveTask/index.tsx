import {StyleSheet, View} from 'react-native'
import React, {useRef} from 'react'
import {useAppStyles} from '~/hooks'
import HeaderWithBack from '~/screens/components/HeaderWithBack'
import OptionSend, {OptionSendRef} from '../components/OptionSend'
import utils from '~/utils'
import AppScrollViewBody from '~/components/AppScrollViewBody'
import AppText from '~/components/AppText'
import PersonHandleCard from '../components/PersonHandleCard'
import AppButton from '~/components/AppButton'
import {scale} from '~/utils/scaleScreen'
import {Fontsfamily} from '~/styles/FontsFamily'
import DashLine from '~/screens/components/DashLine'
import useActionTaskQTD from '../hooks/useActionTaskQTD'
import {TaskProgress} from '~/services/apis/taskService'

const ApproveTaskScreen = props => {
  const taskProgresses: TaskProgress[] = utils.ngetParam(
    props,
    'taskProgresses',
    [],
  )
  const taskId: string = utils.ngetParam(props, 'taskId', null)

  const styles = Styles()
  const refSend = useRef<OptionSendRef>(null)

  const refInput = useRef('')

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onChangeText = (value: string) => (refInput.current = value)
  const {aprrovingTask} = useActionTaskQTD()

  const onSubmit = () => {
    const type = refSend.current?.getValue()

    const {sms, email} = type
    const typeSend = [email && 'email', sms && 'sms'].filter(Boolean).join(',')

    aprrovingTask({
      taskId: taskId,
      typeSend: typeSend,
    })
  }

  return (
    <View style={styles.container}>
      <HeaderWithBack title="Phê duyệt công việc" />
      <AppScrollViewBody
        horizontalInit={scale(10)}
        contentContainerStyle={styles.list}>
        {/* {Danh sách người thực hiện} */}
        <View style={styles.content}>
          <View style={styles.inner_content}>
            <AppText style={styles.title}>Danh sách người thực hiện</AppText>
            {taskProgresses.map((item, index) => (
              <View key={`${utils.safeValue(item?.taskProgressId)}_${index}`}>
                <PersonHandleCard
                  no={index + 1}
                  fullName={utils.safeValue(item?.taskProgressPersonName)}
                  position={utils.safeValue(item?.taskProgressPersonRole)}
                  dept={utils.safeValue(item?.dept)}
                />
                <DashLine />
              </View>
            ))}
          </View>
          <View style={styles.approveBox}>
            <OptionSend ref={refSend} />
            <AppButton
              onPress={onSubmit}
              title="Phê duyệt"
              styleButton={styles.button}
              styleTitle={styles.textButton}
            />
          </View>
        </View>
      </AppScrollViewBody>
    </View>
  )
}

export default ApproveTaskScreen

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
      alignSelf: 'center',
      paddingHorizontal: scale(20),
    },
    textButton: {
      color: colors.white,
    },
    approveBox: {
      paddingHorizontal: scale(10),
      paddingBottom: scale(10),
      // borderTopWidth: scale(3),
      borderColor: colors.primary,
    },
    content: {
      backgroundColor: colors.white,
      borderRadius: scale(10),
    },
    inner_content: {
      padding: scale(10),
    },
  })
}
