import {LOCAL_PAGE} from '~/constants'
import {METHOD_CALL_API} from '.'
import AppServices from '../AppServices'
import {CommentThread} from './creditService'
import {DOMAIN, END_POINT} from './endpoints'

// API này do BE-Phạm Phong làm

export interface API_Response<T> {
  object: T
  message: string
  status: number
}

export interface PagedTaskResponse {
  totals: number
  datas: TaskQTD[]
}

export interface TaskQTD {
  taskId: string
  taskName: string
  taskType: string
  taskStatus: string
  startDate: string
  dueDate: string
  createBy: string
  createTime: string
  encodeTaskID: string
}

export interface DetailTaskQTD {
  taskId: string
  encodeTaskId: string
  taskName: string
  taskType: number
  taskStatus: number
  startDate: string
  dueDate: string
  createBy: number
  createName: string
  createTime: string
  taskContent: string
  notifiedUsers: string
  priority: number
  taskProgresses: TaskProgress[]
  relatedTasks: RelatedTask[]
  mortgageContracts: MortgageContract[]
  creditContracts: RelatedCreditContract[]
  attachs: Attach[]
  rolesButton: number[]
  approverId: string
  approverName: string
}

export interface RelatedCreditContract {
  creditContractId: string
  creditContractCode: string
  numberCreditStr: string
  customerNames: string
}

export interface TaskProgress {
  taskProgressId: number
  taskId: number
  taskProgressPerson: number
  progressType: number
  progressContent: string
  taskProgressPersonName: string
  taskProgressPersonRole: string
  taskProgressPersonDepartment: string
  taskProgressStatus: number
  progressPercentage: number
  progressResultContent: string
  evaluationResult: string
  isActive: number
  senderId: number
  personalStatus: number
  userId: number
}

export interface RelatedTask {
  taskName: string
  taskStatus: number
  assignmentNames: string
  taskContent: string
}

export interface MortgageContract {
  mortgageContractId: string
  mortgageContractCode: string
  mortgageContractNumber: string
  mortgageOwnerString: string
}

export interface Attach {
  attachId: string
  attachName: string
  createBy: number
  createName: string
  id: number
  objectType: number
  size: number
}

export interface ItemTrackingTask {
  userName: string
  roleName: string
  departmentName: string
  createTime: string
  logFunction: string
  logObject: string
  logAction: string
  logInfo: string
  objectId: number
  logId: string
}

export interface ListTrackingTask {
  totals: number
  datas: Array<ItemTrackingTask>
}

const getTaskList = async ({
  page = 0,
  size = 10,
  taskName,
  quickSearch,
  dateFrom,
  dateTo,
  completionDate,
  taskType,
  taskStatus,
  personalStatus,
}: {
  page: number
  size: number
  taskName?: string
  quickSearch?: string
  dateFrom?: string
  dateTo?: string
  completionDate?: string
  taskType?: string
  taskStatus?: string
  personalStatus?: string
}) => {
  const params = new URLSearchParams()

  params.append('page', page.toString())
  params.append('size', size.toString())

  if (quickSearch) params.append('quickSearch', quickSearch.toString())
  if (personalStatus) params.append('personalStatus', personalStatus.toString())
  if (taskStatus) params.append('taskStatus', taskStatus.toString())
  if (taskType) params.append('taskType', taskType.toString())
  if (completionDate) params.append('completionDate', completionDate.toString())
  if (dateTo) params.append('dateTo', dateTo.toString())
  if (dateFrom) params.append('dateFrom', dateFrom.toString())
  if (taskName) params.append('taskName', taskName.toString())

  return (await AppServices.api)<API_Response<PagedTaskResponse>>({
    url: `${END_POINT.TASK.getList}?${params.toString()}`,
    methodCall: METHOD_CALL_API.GET,
    domain: DOMAIN.MAIN,
  })
}

const getDetailTask = async ({taskID}: {taskID: string}) => {
  const params = new URLSearchParams()

  params.append('taskID', taskID.toString())

  return (await AppServices.api)<API_Response<DetailTaskQTD>>({
    url: `${END_POINT.TASK.getDetail}?${params.toString()}`,
    methodCall: METHOD_CALL_API.GET,
    domain: DOMAIN.MAIN,
  })
}

const getTrackingTask = async ({
  page = 0,
  size = 10,
  taskId = '',
}: {
  page: number
  size: number
  taskId?: string
}) => {
  const params = new URLSearchParams()

  params.append('page', page.toString())
  params.append('size', size.toString())
  params.append('taskId', taskId.toString())

  return (await AppServices.api)<API_Response<ListTrackingTask>>({
    url: `${END_POINT.TASK.getListTracking}?${params.toString()}`,
    methodCall: METHOD_CALL_API.GET,
    domain: DOMAIN.MAIN,
  })
}

const deleteTask = async ({taskId}: {taskId: string}) => {
  const params = new URLSearchParams()

  params.append('taskId', taskId.toString())

  return (await AppServices.api)<API_Response<any>>({
    url: `${END_POINT.TASK.deleteTask}?${params.toString()}`,
    methodCall: METHOD_CALL_API.GET,
    domain: DOMAIN.MAIN,
  })
}

const approveTask = async ({
  taskId,
  typeSend,
}: {
  taskId: string
  typeSend: string
}) => {
  const body = JSON.stringify({
    id: taskId,
    typeSend: typeSend,
  })
  return (await AppServices.api)<API_Response<any>>({
    url: `${END_POINT.TASK.approveTask}`,
    methodCall: METHOD_CALL_API.POST,
    domain: DOMAIN.MAIN,
    body: body,
  })
}

const rejectTask = async ({
  taskId,
  content = '',
  typeSend,
}: {
  taskId: string
  content: string
  typeSend: string
}) => {
  const body = JSON.stringify({
    id: taskId,
    content: content,
    typeSend: typeSend,
  })
  return (await AppServices.api)<API_Response<any>>({
    url: `${END_POINT.TASK.rejectTask}`,
    methodCall: METHOD_CALL_API.POST,
    domain: DOMAIN.MAIN,
    body: body,
  })
}

const sendReviewTask = async ({
  taskId,
  approverId,
  typeSend,
}: {
  taskId: string
  approverId: string
  typeSend: string
}) => {
  const body = JSON.stringify({
    id: taskId,
    approverId: approverId,
    typeSend: typeSend,
  })
  return (await AppServices.api)<API_Response<any>>({
    url: `${END_POINT.TASK.sendReviewTask}`,
    methodCall: METHOD_CALL_API.POST,
    domain: DOMAIN.MAIN,
    body: body,
  })
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
  const finalTaskProgress = taskProgress.map(item => {
    return {
      id: item?.taskProgressId,
      evaluationResult: item?.evaluationResult,
    }
  })

  const body = JSON.stringify({
    id: id_task,
    content: feedback,
    typeSend: typeSend,
    typeButton: typeButton,
    taskProgress: finalTaskProgress,
  })

  return (await AppServices.api)<API_Response<any>>({
    url: `${END_POINT.TASK.reviewTask}`,
    methodCall: METHOD_CALL_API.POST,
    domain: DOMAIN.MAIN,
    body: body,
  })
}

const updateTask = async ({
  taskProgressStatus,
  progressPercent = '',
  taskProgressId,
  taskProgressContent,
}: {
  taskProgressStatus: string
  progressPercent: string
  taskProgressId: string
  taskProgressContent: string
}) => {
  const formData = new FormData()

  formData.append('taskProgressStatus', taskProgressStatus)
  formData.append('progressPercent', progressPercent)
  formData.append('taskProgressId', taskProgressId)
  formData.append('taskProgressContent', taskProgressContent)

  return (await AppServices.api)<API_Response<any>>({
    url: `${END_POINT.TASK.updateTask}`,
    methodCall: METHOD_CALL_API.POST,
    domain: DOMAIN.MAIN,
    body: formData,
  })
}

export const getFeedbackTask = async ({objectId}: {objectId: string}) => {
  const params = new URLSearchParams()
  params.append('objectId', objectId.toString())
  params.append('localPage', LOCAL_PAGE.Task)
  return (await AppServices.api)<API_Response<CommentThread>>({
    url: `${END_POINT.TASK.getFeedbackTask}?${params.toString()}`,
    methodCall: METHOD_CALL_API.GET,
    domain: DOMAIN.MAIN,
  })
}

const sendFeedbackTask = async ({
  taskEncodeId,
  feedback = '',
  parentId,
}: {
  taskEncodeId: string
  feedback: string
  parentId: string
}) => {
  const body = JSON.stringify({
    objectIdEncode: taskEncodeId,
    parentId: parentId,
    commentContent: feedback,
    localPage: LOCAL_PAGE.Task,
  })

  return (await AppServices.api)<API_Response<any>>({
    url: `${END_POINT.TASK.sendFeedbackTask}`,
    methodCall: METHOD_CALL_API.POST,
    domain: DOMAIN.MAIN,
    body: body,
  })
}

export const API_Task = {
  getTaskList,
  getDetailTask,
  getTrackingTask,
  deleteTask,
  approveTask,
  rejectTask,
  sendReviewTask,
  reviewTask,
  updateTask,
  getFeedbackTask,
  sendFeedbackTask,
}
