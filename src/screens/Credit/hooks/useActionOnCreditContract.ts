import {APIs} from '~/services/apis'
import utils from '~/utils'

const useActionOnCreditContract = () => {
  const SendFeedback = async ({
    objectIdEncode,
    commentContent = '',
    parentId = null,
    disableAlert = false,
  }: {
    objectIdEncode: string
    commentContent: string
    parentId: string
    disableAlert?: boolean
  }) => {
    utils.showLoadingFullApp({show: true})
    const res = await APIs.sendFeedbackAboutCredit({
      objectIdEncode: objectIdEncode,
      commentContent: commentContent,
      parentId: parentId,
    })
    utils.showLoadingFullApp({show: false})
    if (res.status === 200) {
      if (disableAlert) {
        return true
      }
      utils.showMessageFlash({
        message: 'Thông báo',
        description: 'Đã gửi ý kiến xử lý',
        icon: 'success',
        type: 'success',
      })
    } else {
      if (disableAlert) {
        return false
      }
      utils.showMessageFlash({
        message: 'Thông báo',
        description: `Lỗi khi gửi ý kiến. Mã lỗi ${res.status}`,
        icon: 'danger',
        type: 'danger',
      })
      utils.log('SendFeedback -> Error', {
        messsage: res.message,
      })
    }
  }

  const approve = async ({creditIdEncode}: {creditIdEncode: string}) => {
    utils.showLoadingFullApp({show: true})
    if (!utils.isDefined(creditIdEncode)) {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: `Dữ liệu chi tiết hợp đồng tín dụng có lỗi`,
        icon: 'danger',
        type: 'danger',
      })

      utils.showLoadingFullApp({show: false})
      return
    }

    const res = await APIs.approveCreditContract({
      creditIdEncode: creditIdEncode,
    })
    utils.showLoadingFullApp({show: false})
    if (res.status === 200) {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: 'Đã phê duyệt',
        icon: 'success',
        type: 'success',
      })
    } else {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: `Lỗi khi phê duyệt. Mã lỗi ${res.status}`,
        icon: 'danger',
        type: 'danger',
      })
      utils.log('approve -> Error', {
        messsage: res.message,
      })
    }
  }

  const reject = async ({
    creditIdEncode,
    feedback,
    typeReturn,
  }: {
    creditIdEncode: string
    feedback: string
    typeReturn: 'important' | 'bug'
  }) => {
    utils.showLoadingFullApp({show: true})
    if (!utils.isDefined(creditIdEncode)) {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: `Dữ liệu chi tiết hợp đồng tín dụng có lỗi`,
        icon: 'danger',
        type: 'danger',
      })

      utils.showLoadingFullApp({show: false})
      return
    }

    const res = await APIs.rejctCreditContract({
      creditIdEncode: creditIdEncode,
      feedback: feedback,
      typeReturn: typeReturn,
    })
    utils.showLoadingFullApp({show: false})
    if (res.status === 200) {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: 'Đã từ chối',
        icon: 'success',
        type: 'success',
      })
    } else {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: `Lỗi khi từ chối. Mã lỗi ${res.status}`,
        icon: 'danger',
        type: 'danger',
      })
      utils.log('approve -> Error', {
        messsage: res.message,
      })
    }
  }

  const updateLoanGroup = async ({
    creditIdEncode,
    group,
  }: {
    creditIdEncode: string
    group: string
  }) => {
    utils.showLoadingFullApp({show: true})
    if (!utils.isDefined(creditIdEncode) || !utils.isDefined(group)) {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: `Dữ liệu chi tiết hợp đồng tín dụng có lỗi`,
        icon: 'danger',
        type: 'danger',
      })

      utils.showLoadingFullApp({show: false})
      return
    }

    const res = await APIs.updateLoanGroupCreditContract({
      creditIdEncode: creditIdEncode,
      group: group,
    })
    utils.showLoadingFullApp({show: false})
    if (res.status === 200) {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: 'Đã cập nhật',
        icon: 'success',
        type: 'success',
      })
    } else {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: `Lỗi khi cập nhật. Mã lỗi ${res.status}`,
        icon: 'danger',
        type: 'danger',
      })
      utils.log('updateLoanGroup -> Error', {
        messsage: res.message,
      })
    }
  }

  const returnToInitiator = async ({
    creditIdEncode,
    feedback = '',
  }: {
    creditIdEncode: string
    feedback: string
  }) => {
    utils.showLoadingFullApp({show: true})
    if (!utils.isDefined(creditIdEncode)) {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: `Dữ liệu chi tiết hợp đồng tín dụng có lỗi`,
        icon: 'danger',
        type: 'danger',
      })

      utils.showLoadingFullApp({show: false})
      return false
    }

    const res = await APIs.returnToSenderOfCreditContract({
      creditIdEncode: creditIdEncode,
    })
    utils.showLoadingFullApp({show: false})
    if (res.status === 200) {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: 'Đã trả lại',
        icon: 'success',
        type: 'success',
      })
      const feedback_res = await APIs.returnToSenderOfCreditContract({
        creditIdEncode: creditIdEncode,
        feedback: feedback,
      })
      if (feedback_res.status === 200) {
        return true
      } else {
        return false
      }
    } else {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: `Lỗi khi trả lại. Mã lỗi ${res.status}`,
        icon: 'danger',
        type: 'danger',
      })
      utils.log('returnToInitiator -> Error', {
        messsage: res.message,
      })
      return false
    }
  }

  const maskAsCompleted = async ({
    creditIdEncode,
  }: {
    creditIdEncode: string
  }) => {
    utils.showLoadingFullApp({show: true})
    if (!utils.isDefined(creditIdEncode)) {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: `Dữ liệu chi tiết hợp đồng tín dụng có lỗi`,
        icon: 'danger',
        type: 'danger',
      })

      utils.showLoadingFullApp({show: false})
      return false
    }

    const res = await APIs.markCreditContractAsCompleted({
      creditIdEncode: creditIdEncode,
    })
    utils.showLoadingFullApp({show: false})
    if (res.status === 200) {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: 'Hợp đồng đã hoàn thành khoản vay',
        icon: 'success',
        type: 'success',
      })
      return true
    } else {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: `Lỗi khi thực hiện. Mã lỗi ${res.status}`,
        icon: 'danger',
        type: 'danger',
      })
      utils.log('maskAsCompleted -> Error', {
        messsage: res.message,
      })
      return false
    }
  }

  return {
    sendFeedback: SendFeedback,
    approve,
    reject,
    updateLoanGroup,
    returnToInitiator,
    maskAsCompleted,
  }
}

export default useActionOnCreditContract
