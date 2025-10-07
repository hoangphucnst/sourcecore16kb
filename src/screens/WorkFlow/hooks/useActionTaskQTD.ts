import {Alert} from 'react-native'
import {Screens} from '~/screens/Screens'
import {APIs} from '~/services/apis'
import {TaskProgress} from '~/services/apis/taskService'
import utils from '~/utils'

const useActionTaskQTD = () => {
  const deletingTask = async ({taskId}) => {
    if (!utils.isDefined(taskId)) return false
    const res = await APIs.deleteTask({
      taskId: taskId,
    })
    if (res.status === 200) return true
    return false
  }

  const showOptionsDeleteTask = ({taskId}: {taskId: string}) => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn xóa không?',
      [
        {
          text: 'Không',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: async () => {
            const isSuccess = await deletingTask({
              taskId: taskId,
            })
            if (isSuccess) {
              utils.navigate(Screens.name.WorkFlow, {
                needRefresh: true,
              })
              setTimeout(() => {
                utils.showMessageFlash({
                  message: 'Thông báo',
                  description: 'Xóa thành công',
                  icon: 'success',
                  type: 'success',
                })
              }, 100)
            } else {
              utils.showMessageFlash({
                message: 'Thông báo',
                description: 'Xóa thất bại',
                icon: 'danger',
                type: 'danger',
              })
            }
          },
        },
      ],
      {cancelable: false},
    )
  }
  const aprrovingTask = async ({
    taskId,
    typeSend,
  }: {
    taskId: string
    typeSend: string
  }) => {
    utils.showLoadingFullApp({show: true})
    const res = await APIs.approveTask({
      taskId: taskId,
      typeSend: typeSend,
    })
    utils.showLoadingFullApp({show: false})
    if (res.status === 200) {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: 'Đã phê duyệt',
        icon: 'success',
        type: 'success',
      })
      // utils.navigate(Screens.name.DetailTask, {taskInfo: {taskId: taskId}})
      utils.navigate(Screens.name.WorkFlow, {needRefresh: true})
    } else {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: `Lỗi khi phê duyệt. Mã lỗi ${res.status}`,
        icon: 'danger',
        type: 'danger',
      })
    }
  }

  const rejectingTask = async ({
    taskId,
    content = '',
    typeSend,
  }: {
    taskId: string
    content: string
    typeSend: string
  }) => {
    utils.showLoadingFullApp({show: true})
    const res = await APIs.rejectTask({
      taskId: taskId,
      content: content,
      typeSend: typeSend,
    })
    utils.showLoadingFullApp({show: false})
    if (res.status === 200) {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: 'Đã từ chối',
        icon: 'success',
        type: 'success',
      })
      // utils.navigate(Screens.name.DetailTask, {taskInfo: {taskId: taskId}})
      utils.navigate(Screens.name.WorkFlow, {needRefresh: true})
    } else {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: `Lỗi khi từ chối. Mã lỗi ${res.status}`,
        icon: 'danger',
        type: 'danger',
      })
    }
  }

  const updateTask = async ({
    taskProgressStatus,
    progressPercent,
    taskProgressId,
    taskProgressContent,
  }: {
    taskProgressStatus: string
    progressPercent: string
    taskProgressId: string
    taskProgressContent: string
  }) => {
    utils.showLoadingFullApp({show: true})
    const res = await APIs.updateTask({
      taskProgressStatus,
      progressPercent,
      taskProgressId,
      taskProgressContent,
    })
    utils.showLoadingFullApp({show: false})
    if (res.status === 200) {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: 'Đã cập nhật',
        icon: 'success',
        type: 'success',
      })
      utils.navigate(Screens.name.WorkFlow, {needRefresh: true})
    } else {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: `Lỗi khi cập nhật. Mã lỗi ${res.status}`,
        icon: 'danger',
        type: 'danger',
      })
    }
  }

  const reviewTask = async ({
    id_task,
    feedback = '',
    typeSend,
    taskProgress = [],
    typeButton,
  }: {
    id_task: string
    feedback: string
    typeSend: string
    taskProgress: TaskProgress[]
    typeButton: string
  }) => {
    utils.showLoadingFullApp({show: true})
    const res = await APIs.reviewTask({
      id_task,
      feedback,
      typeSend,
      taskProgress,
      typeButton,
    })
    utils.showLoadingFullApp({show: false})
    if (res.status === 200) {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: 'Đã đánh giá',
        icon: 'success',
        type: 'success',
      })
      utils.navigate(Screens.name.WorkFlow, {needRefresh: true})
    } else {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: `Lỗi khi đánh giá. Mã lỗi ${res.status}`,
        icon: 'danger',
        type: 'danger',
      })
    }
  }

  return {
    showOptionsDeleteTask,
    aprrovingTask,
    rejectingTask,
    updateTask,
    reviewTask,
  }
}

export default useActionTaskQTD
