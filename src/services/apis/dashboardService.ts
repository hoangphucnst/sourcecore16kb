import {METHOD_CALL_API} from '.'
import AppServices from '../AppServices'
import {DOMAIN, END_POINT} from './endpoints'

// API này do BE-nguyễn công hậu làm

export interface API_Response<T> {
  object: T
  message: string
  status: number
}

export interface DashboardContract {
  contract: ContractStats
}

export interface ContractStats {
  creditContractCount: number
  mortgageContractCount: number
}

///

export interface CapitalAndDebtOverview {
  availableCapital: AvailableCapital
  debtAmount: DebtAmount
}

export type AvailableCapital = Record<
  1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  number
>
export type DebtAmount = Record<
  1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  number
>

///

export interface CreditProfileData {
  debtStructure: DebtStructureItem[]
  customer: CustomerStats
}

export interface DebtStructureItem {
  content: string
  goalCount: number
}

export interface CustomerStats {
  customersCount: number
  restrictedCustomersCount: number
}

///

export interface CreditStatusData {
  personalCredit: CreditCategoryStatus
  commonCredit: CreditCategoryStatus
}

export interface CreditCategoryStatus {
  Return: number
  DueSoon: number
  Overdue: number
  NotDueYet: number
}

export interface SolvedCredit {
  solvedCredit: SolvedCreditProfile[]
}

export interface SolvedCreditProfile {
  userId: string
  fullName: string
  count: string
}

///

export interface TaskOverviewData {
  personalWork: PersonalTaskStats
  assignedWork: AssignedTaskStats
  others: OtherTaskInfo
}

export interface TaskStatusStats {
  DueSoon: number
  Overdue: number
  NotDueYet: number
}

export interface PersonalTaskStats extends TaskStatusStats {
  Register: number
  Evaluated: number
}

export interface AssignedTaskStats extends TaskStatusStats {
  EvaluationRequired: number
  ApprovalRequired: number
}

export interface OtherTaskInfo {
  total: number
  list: TaskCategoryInfo[]
}

export interface TaskCategoryInfo {
  categoryId: number
  categoryTypeId: number
  name: string
  code: string
  isActive: number
  status: number
  createTime: string
  createBy: any
  description: string
}

///

export interface Others {
  others: OtherTaskInfo
}

///

const getDashboardContract = async () => {
  return AppServices.api<API_Response<DashboardContract>>({
    url: END_POINT.DASHBOARD.contract,
    methodCall: METHOD_CALL_API.GET,
    domain: DOMAIN.MAIN,
  })
}

const getDashboardCapAndDebt = async ({year = 2025}: {year: number}) => {
  const params = new URLSearchParams()

  params.append('year', year.toString())

  return AppServices.api<API_Response<CapitalAndDebtOverview>>({
    url: `${END_POINT.DASHBOARD.cappitalAndDebt}?${params.toString()}`,
    methodCall: METHOD_CALL_API.GET,
    domain: DOMAIN.MAIN,
  })
}

const getDebtAndCustomerStructure = async () => {
  return AppServices.api<API_Response<CreditProfileData>>({
    url: `${END_POINT.DASHBOARD.debtAndCustomerStructure}`,
    methodCall: METHOD_CALL_API.GET,
    domain: DOMAIN.MAIN,
  })
}

const getOtherStats = async () => {
  return AppServices.api<API_Response<Others>>({
    url: `${END_POINT.DASHBOARD.others}`,
    methodCall: METHOD_CALL_API.GET,
    domain: DOMAIN.MAIN,
  })
}

const getPersonalAndGeneralCreditProfiles = async () => {
  return AppServices.api<API_Response<CreditStatusData>>({
    url: `${END_POINT.DASHBOARD.personalAndGeneralCreditProfiles}`,
    methodCall: METHOD_CALL_API.GET,
    domain: DOMAIN.MAIN,
  })
}

const getSolvedCredit = async ({
  page = 0,
  size = 10,
  fromDate,
  toDate,
}: {
  fromDate: string
  toDate: string
}) => {
  const params = new URLSearchParams()

  params.append('page', page.toString())
  params.append('size', size.toString())

  params.append('fromDate', fromDate.toString())
  params.append('toDate', toDate.toString())

  return AppServices.api<API_Response<SolvedCredit>>({
    url: `${END_POINT.DASHBOARD.solvedCredit}?${params.toString()}`,
    methodCall: METHOD_CALL_API.GET,
    domain: DOMAIN.MAIN,
  })
}

const getTaskOverviewDashboard = async () => {
  return AppServices.api<API_Response<TaskOverviewData>>({
    url: `${END_POINT.DASHBOARD.personalTaskAndAssignedTaskAndOtherStats}`,
    methodCall: METHOD_CALL_API.GET,
    domain: DOMAIN.MAIN,
  })
}

export const DashboardService = {
  getDashboardContract,
  getDashboardCapAndDebt,
  getDebtAndCustomerStructure,
  getPersonalAndGeneralCreditProfiles,
  getSolvedCredit,
  getTaskOverviewDashboard,
  getOtherStats,
}
