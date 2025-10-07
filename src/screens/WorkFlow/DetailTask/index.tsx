import {StyleSheet, View} from 'react-native'
import React, {useRef} from 'react'
import {useAppStyles} from '~/hooks'
import AppHeader from '~/components/AppHeader'
import AppScrollViewBody from '~/components/AppScrollViewBody'
import {scale} from '~/utils/scaleScreen'
import {Fontsfamily} from '~/styles/FontsFamily'
import {Icons} from '~/assets'
import utils from '~/utils'
import InfoTaskSection from './components/InfoTaskSection'
import ProcessSection from './components/ProcessSection'
import RelatedTaskSection from './components/RelatedTaskSection'
import ContractSection from './components/ContractSection'
import FloatButton, {ActionItem} from '~/components/FloatButton'
import {Screens} from '~/screens/Screens'
import {FAB_TASKS} from '~/constants'
import LocalConstant from './LocalConstant'
import {TaskQTD} from '~/services/apis/taskService'
import useTaskQTDDetail from '../hooks/useTaskQTDDetail'
import LoadingSpinner, {TypeRefLoading} from '~/components/LoadingSpinner'
import AttachedFilesSection from './components/AttachedFilesSection'
import useActionTaskQTD from '../hooks/useActionTaskQTD'
import {useAuth} from '~/redux/reduxHooks'

const DetailTaskScreen = props => {
  const styles = useDetailTaskStyles()
  const {THEME} = useAppStyles()
  const {colors} = THEME
  const taskInfo: TaskQTD = utils.ngetParam(props, 'taskInfo', null)
  const refLoading = useRef<TypeRefLoading>(null)
  const {detailTaskQTD} = useTaskQTDDetail({
    taskId: taskInfo.encodeTaskId,
    refLoading: refLoading,
  })
  const {dataLogin} = useAuth()
  const {StaticMenu, HiddenMenu} = LocalConstant()

  const staticMenu = StaticMenu(detailTaskQTD?.rolesButton || [])
  const hiddenMenu = HiddenMenu(detailTaskQTD?.rolesButton || [])

  const {showOptionsDeleteTask} = useActionTaskQTD()

  const onBack = () => {
    utils.goBackNavigation()
  }

  const onActionChange = (item: ActionItem) => {
    switch (item.name) {
      case FAB_TASKS.SubmitComment: {
        utils.navigate(Screens.name.Modal_SendFeedback, {
          taskEncodeId: taskInfo.encodeTaskId,
        })
        break
      }
      case FAB_TASKS.TrackingTask: {
        utils.navigate(Screens.name.Modal_TrackingTasks, {detailTaskQTD})
        break
      }
      case FAB_TASKS.RejectTask: {
        utils.navigate(Screens.name.Modal_RejectTask, {
          taskId: taskInfo.taskId,
        })
        break
      }
      case FAB_TASKS.ApproveTask: {
        utils.navigate(Screens.name.Modal_ApproveTask, {
          taskId: taskInfo.taskId,
          taskProgresses: detailTaskQTD?.taskProgresses,
        })
        break
      }
      case FAB_TASKS.Evaluation: {
        utils.navigate(Screens.name.Modal_EvaluateTask, {
          detailTask: detailTaskQTD,
        })
        break
      }
      case FAB_TASKS.UpdateTask: {
        const myProgressTask = detailTaskQTD?.taskProgresses.filter(_ => {
          const progressId = `${_?.userId}`
          const roleId = `${dataLogin?.user_id}`
          return progressId === roleId
        })
        utils.navigate(Screens.name.Modal_UpdateTask, {
          myProgressTask: myProgressTask[0],
        })
        break
      }
      case FAB_TASKS.SubmitEvaluation: {
        utils.navigate(Screens.name.Modal_SubmitReview, {
          taskData: detailTaskQTD,
        })
        break
      }
      case FAB_TASKS.DeleteTask: {
        showOptionsDeleteTask({taskId: taskInfo?.taskId || null})
        utils.log('DetailTaskScreen', 'Delete Task')
        break
      }
      default: {
        break
      }
    }
  }

  return (
    <View style={styles.container}>
      <AppHeader
        title="Thông tin công việc"
        styleTitle={styles.text_title}
        styleHeader={styles.container_title}
        iconLeft={Icons.icBack}
        styleIconLeft={styles.iconLeft}
        onPressLeft={onBack}
      />
      <AppScrollViewBody
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <InfoTaskSection data={detailTaskQTD} />
        <ProcessSection data={detailTaskQTD?.taskProgresses || []} />
        <RelatedTaskSection data={detailTaskQTD?.relatedTasks || []} />
        <ContractSection
          data={[
            {
              type: 'Tín dụng',
              items: (detailTaskQTD?.creditContracts ?? []).map(mc => ({
                id: String(mc.creditContractId),
                customerName: mc.customerNames,
                profileCode: mc.creditContractCode,
                contractNumber: mc.numberCreditStr,
              })),
            },
            {
              type: 'Thế chấp',
              items: (detailTaskQTD?.mortgageContracts ?? []).map(mc => ({
                id: String(mc.mortgageContractId),
                customerName: mc.mortgageOwnerString,
                profileCode: mc.mortgageContractCode,
                contractNumber: mc.mortgageContractNumber,
              })),
            },
          ]}
        />
        <AttachedFilesSection data={detailTaskQTD?.attachs || []} />
        <View style={{height: scale(200)}} />
      </AppScrollViewBody>
      <FloatButton
        styleOption={{
          width: scale(48),
          height: scale(48),
        }}
        colorOptionActive={colors.fab.darkGray}
        actions={hiddenMenu}
        style={{
          right: scale(40),
          bottom: scale(70),
        }}
        rotation={'90deg'}
        onPress={onActionChange}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        stateModal={state => {
          //true show button, false ẩn button
        }}
        styleAction={{
          width: scale(40),
          height: scale(40),
        }}
        actionsCover={staticMenu}
      />
      <LoadingSpinner ref={refLoading} />
    </View>
  )
}

export default DetailTaskScreen

const useDetailTaskStyles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    text_title: {
      color: colors.white,
      fontFamily: Fontsfamily.OpenSans.SemiBold,
    },
    container_title: {
      backgroundColor: colors.primary,
    },
    iconLeft: {
      width: scale(24),
      height: scale(24),
      tintColor: colors.white,
    },
    content: {
      // gap: scale(8),
      // paddingTop: scale(10),
      // paddingBottom: scale(50),
    },
    icon: {
      resizeMode: 'contain',
      width: scale(24),
      height: scale(24),
    },
    sizeButtonFloat: {
      width: scale(50),
      height: scale(50),
    },
  })
}
