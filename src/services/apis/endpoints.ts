import AppConfig from '~/app/AppConfig'

export const DOMAIN = {
  MAIN: AppConfig.host,
  PROVINCES: 'https://provinces.open-api.vn',
  // Add 3rd-party domain below
}

export const END_POINT = {
  AUTH: {
    login: 'api/auth/login',
    InfoUser: userId => `api/users/getUserDetailById?userId=${userId}`,
    RefreshToken: 'api/auth/refreshToken',
    ImageUser: (userId, type: 'profile' | 'signature') =>
      `api/users/getImage?userId=${userId}&type=${type}`,
    logout: 'api/auth/logout',
    selectRole: 'api/auth/select-role-token',
    changeImageProfile: 'api/users/updateImage',
    registerDeviceToekn: 'api/FcmToken/register-token',
    validateOtpAuthenticator: 'api/auth/validateOtpAuthenticator',
    viewAvatarUser: 'api/users/view',
  },
  CUSTOMER: {
    getList: 'api/customers/list',
    getDetails: customerId =>
      `api/customers/getCustomerMain?customerId=${customerId}`,
    getSignImage: 'api/customers/getImage',
  },
  MORTGAGE: {
    getList: 'api/MortgageContract/getList',
    getContractDetail: 'api/MortgageContract/getDetail',
    getAttachs: 'api/MortgageContract/getListAttachs',
  },
  FILE: {
    downloadFile: 'api/attachs/downloadFile',
    getFiles: 'api/AttachsConfig/getListAttachsByObjectId',
  },
  NOTIFICATION: {
    getList: 'api/notifications/getNotificationsByToken',
    getCount: 'api/notifications/getNotificationsCountByToken',
    updateIsRead: 'api/notifications/toggleUpdateIsReadNotification',
    existsByTaskId: targetId => `api/task/existsByTaskId?taskId=${targetId}`,
    existsByCreditContractId: targetId =>
      `api/credit/existsByCreditContractId?creditContractId=${targetId}`,
    existsByMortgageContractId: targetId =>
      `api/MortgageContract/existsByMortgageContractId?mortgageContractId=${targetId}`,
    existsByCustomerId: targetId =>
      `api/customers/existsByCustomerId?customerId=${targetId}`,
  },
  TASK: {
    getList: 'api/task/list',
    getDetail: 'api/task/getDetailTask',
    getListTracking: 'api/task/getTaskLog', //api/task/getTaskLog?taskId=${taskId}&page=xxx&size=xxx
    deleteTask: 'api/task/delete',
    approveTask: 'api/task/approveTask',
    rejectTask: 'api/task/denyTask',
    sendReviewTask: 'api/task/requestReview',
    reviewTask: 'api/task/reviewTask',
    updateTask: 'api/task/updateProgress',
    getFeedbackTask: 'api/task/getAllComment',
    sendFeedbackTask: 'api/task/commentContent',
  },
  CREDIT: {
    getList: 'api/credit/getListCreditContect',
    // getDetail: 'api/credit/getCreditInfo',
    getDetail: 'api/credit/getCreditDetail',
    getDetailFeedback: 'api/credit/getAllComment',
    rejectHandle: 'api/credit/commentContent',
    sendFeedback: 'api/credit/commentContent',
    sendFABaction: 'api/credit/transferCreditContract',
    sendFeedbackToSenderContract: 'api/credit/commentContent',
    signNormal: 'api/credit/signNormal',
    signCaCloud: 'api/credit/signCaCloud',
    signSimCa: 'api/credit/signSimCa',
    getTrackingList: 'api/log/listCheck',
    getTrackingListV2: 'api/log/list',
  },
  DASHBOARD: {
    contract: 'api/dashboard/contract',
    cappitalAndDebt: 'api/dashboard/debt-and-available',
    debtAndCustomerStructure: 'api/dashboard/second-line',
    personalAndGeneralCreditProfiles: 'api/dashboard/third-line-credit',
    solvedCredit: 'api/dashboard/third-line-solved-credit',
    personalTaskAndAssignedTaskAndOtherStats: 'api/dashboard/forth-line',
    others: 'api/dashboard/others',
  },
  SIGN_FILE: {
    signNormal: 'api/attachs/signNormal',
    signCaCloud: 'api/attachs/signCaCloud',
    signSimCa: 'api/attachs/signSimCa',
  },
}
