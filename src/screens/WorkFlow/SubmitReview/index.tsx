import {StyleSheet, View} from 'react-native'
import React, {useCallback, useRef} from 'react'
import {AppTheme} from '~/styles/Theme'
import {useAppStyles} from '~/hooks'
import AppHeader from '~/components/AppHeader'
import {Icons} from '~/assets'
import {scale} from '~/utils/scaleScreen'
import utils from '~/utils'
import AppScrollViewBody from '~/components/AppScrollViewBody'
import PersonHandleCard from '../components/PersonHandleCard'
import BoxView from '~/hoc/BoxView'
import AppText from '~/components/AppText'
import {FONTSFAMILY} from '~/styles/FontsFamily'
// import AppInput from '~/components/AppInput'
import OptionSend, {OptionSendRef} from '../components/OptionSend'
import AppButton from '~/components/AppButton'
import {DetailTaskQTD} from '~/services/apis/taskService'
import {APIs} from '~/services/apis'
import {Screens} from '~/screens/Screens'

const SubmitReviewScreen = props => {
  const {THEME} = useAppStyles()
  const styles = useCallback(styleWithTheme, [THEME])(THEME)
  const refSend = useRef<OptionSendRef>(null)
  const taskDataDetails: DetailTaskQTD = utils.ngetParam(
    props,
    'taskData',
    null,
  )

  const onBack = () => utils.goBackNavigation()
  // const refInput = useRef('')

  // const onChangeText = (value: string) => (refInput.current = value)

  const onSubmit = async () => {
    // const contentHandle = refInput.current
    // utils.log('SubmitReviewScreen', {
    //   valueSend: valueSend,
    //   contentHandle: contentHandle,
    // })

    const {sms, email} = refSend.current?.getValue()
    const typeSend = [email && 'email', sms && 'sms'].filter(Boolean).join(',')

    utils.showLoadingFullApp({show: true})
    const res = await APIs.sendReviewTask({
      taskId: taskDataDetails.taskId,
      typeSend: typeSend,
      approverId: taskDataDetails?.approverId,
    })
    utils.showLoadingFullApp({show: false})
    if (res.status === 200) {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: 'Gửi đánh giá thành công.',
        icon: 'success',
        type: 'success',
        duration: 3000,
      })
      utils.navigate(Screens.name.WorkFlow, {needRefresh: true})
    } else {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: 'Gửi đánh giá thất bại.',
        icon: 'danger',
        type: 'danger',
        duration: 3000,
      })
    }
  }

  return (
    <View style={styles.container}>
      <AppHeader
        title="Gửi đánh giá công việc"
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
        {/* {Danh sách người thực hiện} */}
        <BoxView>
          <AppText style={styles.title}>Người gửi đánh giá</AppText>
          {/* {taskDataDetails?.taskProgresses?.length > 0 &&
            taskDataDetails?.taskProgresses?.map((taskProgress, index) => {
              return (
                <PersonHandleCard
                  key={index.toString()}
                  no={index + 1}
                  fullName={utils.safeValue(
                    taskProgress?.taskProgressPersonName,
                  )}
                  position={utils.safeValue(
                    taskProgress?.taskProgressPersonRole,
                  )}
                  dept={utils.safeValue(
                    taskProgress?.taskProgressPersonDepartment,
                  )}
                />
              )
            })} */}
          <PersonHandleCard
            no={1}
            fullName={utils.safeValue(
              utils.isDefined(taskDataDetails?.approverName)
                ? taskDataDetails?.approverName
                : utils.isDefined(taskDataDetails?.createName)
                  ? taskDataDetails?.createName
                  : null,
            )}
            position={null}
            dept={null}
          />
          <OptionSend ref={refSend} />
          <AppButton
            onPress={onSubmit}
            title="Gửi đánh giá"
            styleButton={styles.button}
            styleTitle={{color: THEME.colors.white}}
          />
        </BoxView>

        {/* {Ý kiến xử lý} */}
        {/* <BoxView style={{marginTop: scale(10)}}>
          <AppText style={styles.title}>Ý kiến:</AppText>
          <AppInput
            style={styles.input}
            placeholder="Nhập ý kiến xử lý"
            multiline
            onChangeText={onChangeText}
          />
          <OptionSend ref={refSend} />
          <AppButton
            onPress={onSubmit}
            title="Gửi đánh giá"
            styleButton={styles.button}
            styleTitle={{color: THEME.colors.white}}
          />
        </BoxView> */}
      </AppScrollViewBody>
    </View>
  )
}

export default SubmitReviewScreen

const styleWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: THEME.colors.background,
    },
    header: {
      backgroundColor: THEME.colors.primary,
    },
    content: {
      paddingTop: THEME.sizes.pd10,
    },
    title: {
      fontFamily: FONTSFAMILY.NunitoExtraBold,
      color: THEME.colors.primary,
      marginBottom: THEME.sizes.mg10,
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
    },
  })
