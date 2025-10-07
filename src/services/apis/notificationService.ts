import {METHOD_CALL_API} from '.'
import AppServices from '../AppServices'
import {DOMAIN, END_POINT} from './endpoints'

export interface API_Response<T> {
  object: T
  message: string
  status: number
}

export interface Page {
  totalElements: number
  totalPages: number
  size: number
  content: Notification[]
  number: number
  sort: Sort
  pageable: Pageable
  first: boolean
  last: boolean
  numberOfElements: number
  empty: boolean
}

export interface Notification {
  notificationId: number
  recipientId: number
  content: string
  timeStamp: string
  type: string
  actorId: number
  actorName: string
  targetId: number
  targetName: string
  isRead: number
  targetIdEncode: string
}

export interface Sort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

export interface Pageable {
  pageNumber: number
  pageSize: number
  sort: Sort
  offset: number
  paged: boolean
  unpaged: boolean
}

const getNotificationList = async ({
  roleUserDeptId,
  page = 0,
  size = 10,
}: {
  page: number
  size: number
  roleUserDeptId?: string
}) => {
  const params = new URLSearchParams()

  params.append('page', page.toString())
  params.append('size', size.toString())
  if (roleUserDeptId) params.append('roleUserDeptId', roleUserDeptId)

  return await AppServices.api<API_Response<Page>>({
    url: `${END_POINT.NOTIFICATION.getList}?${params.toString()}`,
    methodCall: METHOD_CALL_API.GET,
    domain: DOMAIN.MAIN,
  })
}

const getNotificationCount = async () => {
  return await AppServices.api<API_Response<number>>({
    url: END_POINT.NOTIFICATION.getCount,
    methodCall: METHOD_CALL_API.GET,
    domain: DOMAIN.MAIN,
  })
}

const updateIsReadNotification = async ({
  notificationId,
}: {
  notificationId: string
}) => {
  const params = new URLSearchParams()

  params.append('notificationId', notificationId.toString())

  return await AppServices.api<API_Response<number>>({
    url: `${END_POINT.NOTIFICATION.updateIsRead}?${params.toString()}`,
    methodCall: METHOD_CALL_API.GET,
    domain: DOMAIN.MAIN,
  })
}

const existsByTaskId = async (targetId: string) => {
  return await AppServices.api<API_Response<boolean>>({
    url: `${END_POINT.NOTIFICATION.existsByTaskId(targetId)}`,
    methodCall: METHOD_CALL_API.GET,
    domain: DOMAIN.MAIN,
  })
}

const existsByCreditContractId = async (targetId: string) => {
  return await AppServices.api<API_Response<boolean>>({
    url: `${END_POINT.NOTIFICATION.existsByCreditContractId(targetId)}`,
    methodCall: METHOD_CALL_API.GET,
    domain: DOMAIN.MAIN,
  })
}

const existsByCustomerId = async (targetId: string) => {
  return await AppServices.api<API_Response<boolean>>({
    url: `${END_POINT.NOTIFICATION.existsByCustomerId(targetId)}`,
    methodCall: METHOD_CALL_API.GET,
    domain: DOMAIN.MAIN,
  })
}

const existsByMortgageContractId = async (targetId: string) => {
  return await AppServices.api<API_Response<boolean>>({
    url: `${END_POINT.NOTIFICATION.existsByMortgageContractId(targetId)}`,
    methodCall: METHOD_CALL_API.GET,
    domain: DOMAIN.MAIN,
  })
}

export const API_Notification = {
  getNotificationList,
  getNotificationCount,
  updateIsReadNotification,
  existsByTaskId,
  existsByCreditContractId,
  existsByCustomerId,
  existsByMortgageContractId,
}
