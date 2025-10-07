import {APIAuthen} from './authService'
import {CreditService} from './creditService'
import {API_Customer} from './customerService'
import {DashboardService} from './dashboardService'
import {FileService} from './fileService'
import {API_Mortgage} from './mortgageService'
import {API_Notification} from './notificationService'
import {API_SignFile} from './signFileService'
import {API_Task} from './taskService'

export type RespondSuccess<T> = {
  status: string | number | undefined | any
  data: T
}

export type TypeRespondSuccess<T> = {
  status: string | number | undefined | any
  object: T
  message: string | number | undefined | any
}

export type APIReturnTypes = {
  [K in keyof typeof APIs]: Awaited<ReturnType<(typeof APIs)[K]>>
}

// ⚙️ Constants
export const METHOD_CALL_API = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
}

export const APIs = {
  ...APIAuthen,
  ...API_Customer,
  ...API_Mortgage,
  ...API_Notification,
  ...API_Task,
  ...CreditService,
  ...DashboardService,
  ...FileService,
  ...API_SignFile,
}
