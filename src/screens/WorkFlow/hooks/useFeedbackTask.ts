import {useEffect, useState} from 'react'
import {APIs} from '~/services/apis'
import {CommentThread} from '~/services/apis/creditService'
import utils from '~/utils'

const useFeedbackTask = ({objectId}: {objectId: string}) => {
  const [feedback, setFeedback] = useState<CommentThread>([])

  const fetchFeedbackTask = async () => {
    if (!utils.isDefined(objectId)) return
    utils.showLoadingFullApp({show: true})
    const res = await APIs.getFeedbackTask({objectId})
    utils.showLoadingFullApp({show: false})

    if (res.status === 200) {
      utils.log('fetchFeedbackTask', res.object)
      setFeedback(res.object)
    }
  }

  const send = async ({
    taskEncodeId,
    comment = '',
    parentId = null,
  }: {
    taskEncodeId: string
    comment: string
    parentId: string
  }) => {
    const res = await APIs.sendFeedbackTask({
      taskEncodeId: taskEncodeId,
      feedback: comment,
      parentId: parentId,
    })
    if (res.status === 200) {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: `Đã gửi ý kiến `,
        icon: 'success',
        type: 'success',
      })
      return true
    } else {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: `Lỗi khi gửi ý kiến. Mã lỗi ${res.status}`,
        icon: 'danger',
        type: 'danger',
      })
      utils.log('sendFeedbackTask -> Error', res.message)
      return false
    }
  }

  useEffect(() => {
    fetchFeedbackTask()
  }, [])

  return {
    feedbackTask: feedback,
    refreshFeedbackTask: fetchFeedbackTask,
    sendFeedbackTask: send,
  }
}

export default useFeedbackTask
