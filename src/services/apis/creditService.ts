import {
  LOCAL_PAGE,
  MODE_COMMENT_CREDIT,
  MODE_FAB_ACTION_CREDIT,
} from '~/constants'
import {METHOD_CALL_API} from '.'
import AppServices from '../AppServices'
import {DOMAIN, END_POINT} from './endpoints'

// API này do BE-Hoang Trung + BE-Thanh tuấn làm

export interface API_Response<T> {
  object: T
  message: string
  status: number
}

export interface CreditContractPage {
  totalElements: number
  totalPages: number
  size: number
  content: CreditContract[]
  number: number
  sort: Sort
  pageable: Pageable
  first: boolean
  last: boolean
  numberOfElements: number
  empty: boolean
}

export interface Sort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

export interface Pageable {
  pageNumber: number
  pageSize: number
  sort: Sort2
  offset: number
  paged: boolean
  unpaged: boolean
}

export interface Sort2 {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

///

export interface CreditContractDetail {
  contract: CreditContract
  mortgages: MortgageContract[]
  infoQtds: RelatedCreditInfo[]
  creditAssets: CreditAssetItem[]
  officers: string[]
  atts: AttachmentFile[]
  handlerdatas: ContractHandler[]
  beneficiaryData: BeneficiaryInfo[]
  planData: RepayPlan
}

export interface RepayPlan {
  planDataId: number
  partnerId: number
  creditContractId: number
  interestPlan: string
  interestDate: string
  principalPlan: string
  principalDate: string
  createdAt: string
  listItem: RepayPlanItem[]
}

export interface RepayPlanItem {
  planDataItemId: number
  planDataId: number
  partnerId: number
  amount: string
  method: string
  content: string
  date: string
  createdAt: string
}

export interface AttachmentFile {
  attachId: number
  attachName: string
  attachPath: string
  objectId: number
  objectType: number
  isActive: number
  creatorId: number
  dateCreate: string
  attachType: number
  savePath: string
  isAutoGen: number
  size: string
  contentType: any
  attachPdfPath?: string
  signers: string
  attachIdEncode: string
}

export interface CreditContract {
  creditContractId: number
  customerId: any
  status: string
  outstandingDebt: number
  businessGoalId: any
  interestRate: number
  group: string
  billingTime: string
  dueDate: any
  isActive: number
  relationId: any
  customerIds: string
  content: any
  fullName: any
  cccd: any
  relationType: any
  numberCode: any
  dateCreate: string
  creditCode: string
  collateralType: string
  loanStartDate: string
  loanEndDate: string
  loanMethod: string
  loanTerm: number
  loanAmount: number
  loanPurpose: string
  fields: string
  loanPurposeLabel: string
  note: string
  summary: string
  indirectCosts: string
  directCosts: string
  projectRevenue: string
  businessRisks: string
  environmentImpacts: string
  noteComment: string
  hdtcInfo: string
  partnerId: number
  expense: number
  partnerName: any
  numberCredit: any
  numberCreditStr: string
  loanProposalDate: any
  conclusion: string
  valuationMethodOfCollateral: string
  unitValuationPriceOfCollateral: string
  actualConditionOfProperty: string
  conditionOfAssetsOnLand: string
  currentMarketTransactionValue: string
  assetEvaluation: string
  finishDate: any
  loanDate: any
  isDraft: boolean
  creditContractCode: any
  interestMethod: string
  loanClient: any
  loanRepaymentPlan: any
  customerString: any
  creditContractEncodeId: string
  statusName: any
  processStatus: any
  isEdit: boolean
  isInherited: boolean
  isDelete: boolean
  isApproval: boolean
  isDenied: boolean
  isReturnToSender: boolean
  isDisbursed: boolean
  isLoanCompleted: boolean
  isDebtGroupUpdate: boolean
  isRecall: boolean
  mortgageNumber: string
  dateCreateStr: any
  loanEndDateStr: any
  statusUser: any
  listInfo: any
  listCreditAsset: any
  listMortgageContractCodes: any
  inheritedContract: string
  disbursementTime: number
  createTime: any
  loanType: string
  createBy: number
  fundEquity: number
  debtRepaymentPlan: string
  createByName: any
  borrowerStr: any
  shortTermFunding: any
  unitOcr: any
}

export interface Field {
  code: string
  label: string
  value: string
}

export interface IndirectCost {
  name: string
  value: string
  interest: string
  cost: string
}

export interface DirectCost {
  id: string
  name: string
  unit: {
    label: string
    value: string
  }
  unitOptions: string
  quantity: string
  price: string
  total: string
  note: string
}

export interface LoanSummary {
  totalNeed: string
  ownCapital: string
  loanCapital: string
  interestTime: string
  cycleUnit: string
  profitRate: string
  equityProfitRate: string
  loanToOwnRatio: string
  groupLoanToOwnRatio: string
  loanProfitRatio: string
  loanClient: string
  loanRepaymentPlan: string
  shortTermFundingForLongTermLoanRatio: string
}

export interface MortgageContract {
  mortgageContractId: number
  mortgageContractCode: string
  mortgageContractNumber: string
  creditContractNumber: string
  creditContractDate: string
  mortgageOwner: string
  mortgageOwnerString: string
  amount: string
  partnerId: number
  loanAmount: number
  mortgageType: string
  mortgagePropertyReceiver: number
  mortgagePropertyOfficer: string
  mortgageBorrower: string
  isActive: number
  isSign: number
  createTime: string
  updateTime: string
  createBy: string
  updateBy: string
  status: number
  listCustomer: CustomerProfile[]
}

export interface CustomerProfile {
  customerId: number
  customerCode: string
  fullName: string
  gender: number
  dateOfBirth: string
  address: string
  idNumber: string
  idIssueDate: string
  idExpiryDate: string
  idIssuedBy: string
  email: string
  phoneNumber: string
  maritalStatus: string
  membershipNumber: string
  capitalContribution: string
  occupation: string
  education: string
  reputation: string
  restrictedGroup: string
  dependents: string
  partnerId: number
  isActive: number
  status: number
  note: string
  placeofissuecmnd: string
  cccd: string
  placeofissuecccd: string
  limited: number
  job: string
  civilLegalCapacity: string
  civilCapacity: string
  createTime: string
  relation: string
}

export interface RelatedCreditInfo {
  id: number
  financialInstitution: string
  debtAmount: string
  purpose: string
  interestRate: string
  debtGroup: string
  dueDate: string
  status: string
  fullName: string
  cccd: string
  relationType: string
  relatedInfo: string
  type: number
  creditContractId: number
}

export interface CreditAssetItem {
  id: number
  name: string
  value: string
  creditContractId: number
  type: number
}

export interface ContractHandler {
  id: number
  userId: number
  userRoleDeptId: number
  userCode: string
  fullName: string
  roleName: string
  departmentName: string
  authority: string
  authorizedPerson: number
  documentNumber: string
  date: string
  status: number
  type: number
  creditContractId: number
  priority: string
}

export interface BeneficiaryInfo {
  id: number
  maTh: number
  beneficiaryName: string
  bankName: string
  beneficiaryNumber: string
  date: string
  amount: number
  method: string
  description: string
  creditContractId: number
}

///

export interface CommentThread {
  id: number
  userName: string
  userAvatar: string
  content: string
  partnerId: number
  time: string
  replies: CommentReply[]
  typeReturn: string
  objectId: number
}

export interface CommentReply {
  id: number
  userName: string
  userAvatar: string
  content: string
  partnerId: number
  time: string
  replies: CommentReply[]
  typeReturn: string
  objectId: string
}

export interface CreditLogUserPage {
  totalElements: number
  totalPages: number
  size: number
  content: CreditLogUser[]
  number: number
  sort: Sort
  pageable: Pageable
  first: boolean
  last: boolean
  numberOfElements: number
  empty: boolean
}

export interface CreditLogUser {
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
  fullName: string
}

const getCreditContractList = async ({
  creditCode,
  numberCreditStr,
  borrower,
  status,
  contractCreationFrom,
  contractCreationTo,
  searchString,
  page = 0,
  size = 10,
}: {
  page: number
  size: number
  searchString?: string
  contractCreationTo?: string
  contractCreationFrom?: string
  status?: string
  numberCreditStr?: string
  creditCode?: string
}) => {
  const params = new URLSearchParams()

  params.append('page', page.toString())
  params.append('size', size.toString())

  if (searchString) params.append('searchString', searchString.toString())
  if (contractCreationTo)
    params.append('contractCreationTo', contractCreationTo.toString())
  if (contractCreationFrom)
    params.append('contractCreationFrom', contractCreationFrom.toString())
  if (status) params.append('status', status.toString())
  if (borrower) params.append('borrower', borrower.toString())
  if (numberCreditStr)
    params.append('numberCreditStr', numberCreditStr.toString())
  if (creditCode) params.append('creditCode', creditCode.toString())

  return (await AppServices.api)<API_Response<CreditContractPage>>({
    url: `${END_POINT.CREDIT.getList}?${params.toString()}`,
    methodCall: METHOD_CALL_API.GET,
    domain: DOMAIN.MAIN,
  })
}

const getDetailCreditContract = async ({
  creditIdEncode,
}: {
  creditIdEncode: string
}) => {
  const params = new URLSearchParams()

  params.append('creditIdEncode', creditIdEncode.toString())

  return await AppServices.api<API_Response<CreditContractDetail>>({
    url: `${END_POINT.CREDIT.getDetail}?${params.toString()}`,
    methodCall: METHOD_CALL_API.GET,
    domain: DOMAIN.MAIN,
  })
}

export type LocalPage = (typeof LOCAL_PAGE)[keyof typeof LOCAL_PAGE]

const getDetailCreditContractFeedback = async ({
  localPage,
  objectId,
}: {
  localPage: LocalPage
  objectId: string
}) => {
  const params = new URLSearchParams()

  params.append('localPage', localPage.toString())
  params.append('objectId', objectId.toString())

  return await AppServices.api<API_Response<CommentThread[]>>({
    url: `${END_POINT.CREDIT.getDetailFeedback}?${params.toString()}`,
    methodCall: METHOD_CALL_API.GET,
    domain: DOMAIN.MAIN,
  })
}

const sendFeedbackAboutCredit = async ({
  objectIdEncode,
  commentContent = '',
  parentId = null,
  localPage = 'CreditContract',
}: {
  objectIdEncode: string
  commentContent: string
  parentId: string
  localPage?: LocalPage
}) => {
  const body = JSON.stringify({
    objectIdEncode,
    commentContent,
    parentId,
    localPage,
  })

  return await AppServices.api<API_Response<string>>({
    url: `${END_POINT.CREDIT.sendFeedback}`,
    methodCall: METHOD_CALL_API.POST,
    domain: DOMAIN.MAIN,
    body: body,
  })
}

const approveCreditContract = async ({
  creditIdEncode,
}: {
  creditIdEncode: string
}) => {
  const params = new URLSearchParams()
  params.append('creditContractEncodeId', creditIdEncode.toString())
  params.append('group', null)
  params.append('mode', MODE_FAB_ACTION_CREDIT.APPROVAL)
  return await AppServices.api<API_Response<string>>({
    url: `${END_POINT.CREDIT.sendFABaction}?${params}`,
    methodCall: METHOD_CALL_API.POST,
    domain: DOMAIN.MAIN,
  })
}

const rejctCreditContract = async ({
  creditIdEncode,
  feedback = '',
  typeReturn,
}: {
  creditIdEncode: string
  feedback: string
  typeReturn: 'important' | 'bug'
}) => {
  const body = JSON.stringify({
    objectIdEncode: creditIdEncode,
    typeReturn: typeReturn,
    commentContent: feedback,
    localPage: LOCAL_PAGE.CreditContract,
    mode: MODE_COMMENT_CREDIT.DENY,
  })
  return await AppServices.api<API_Response<string>>({
    url: `${END_POINT.CREDIT.rejectHandle}`,
    methodCall: METHOD_CALL_API.POST,
    domain: DOMAIN.MAIN,
    body: body,
  })
}

const trackCreditContract = async ({
  creditIdEncode,
}: {
  creditIdEncode: string
}) => {
  const params = new URLSearchParams()
  params.append('creditContractEncodeId', creditIdEncode.toString())
  params.append('group', null)
  params.append('mode', MODE_FAB_ACTION_CREDIT.TRACK)
  return await AppServices.api<API_Response<string>>({
    url: `${END_POINT.CREDIT.sendFABaction}?${params}`,
    methodCall: METHOD_CALL_API.POST,
    domain: DOMAIN.MAIN,
  })
}

const updateLoanGroupCreditContract = async ({
  creditIdEncode,
  group,
}: {
  creditIdEncode: string
  group: string
}) => {
  const params = new URLSearchParams()
  params.append('creditContractEncodeId', creditIdEncode.toString())
  params.append('group', group.toString())
  params.append('mode', MODE_FAB_ACTION_CREDIT.UPDATEDEBTGROUP)
  return await AppServices.api<API_Response<string>>({
    url: `${END_POINT.CREDIT.sendFABaction}?${params}`,
    methodCall: METHOD_CALL_API.POST,
    domain: DOMAIN.MAIN,
  })
}

const returnToSenderOfCreditContract = async ({
  creditIdEncode,
  feedback,
}: {
  creditIdEncode: string
  feedback: string
}) => {
  const body = JSON.stringify({
    objectIdEncode: creditIdEncode,
    commentContent: feedback,
    typeReturn: '“return”',
    localPage: 'CreditContract',
    mode: MODE_COMMENT_CREDIT.RETURNTOSENDER,
  })
  return await AppServices.api<API_Response<string>>({
    url: `${END_POINT.CREDIT.sendFeedbackToSenderContract}`,
    methodCall: METHOD_CALL_API.POST,
    domain: DOMAIN.MAIN,
    body: body,
  })
}

const sendFeedbackToSenderOfCreditContract = async ({
  creditIdEncode,
}: {
  creditIdEncode: string
}) => {
  const params = new URLSearchParams()
  params.append('creditContractEncodeId', creditIdEncode.toString())
  params.append('group', null)
  params.append('mode', MODE_FAB_ACTION_CREDIT.RETURNTOSENDER)
  return await AppServices.api<API_Response<string>>({
    url: `${END_POINT.CREDIT.sendFABaction}?${params}`,
    methodCall: METHOD_CALL_API.POST,
    domain: DOMAIN.MAIN,
  })
}

const markCreditContractAsDisbursed = async ({
  creditIdEncode,
}: {
  creditIdEncode: string
}) => {
  const params = new URLSearchParams()
  params.append('creditContractEncodeId', creditIdEncode.toString())
  params.append('group', null)
  params.append('mode', MODE_FAB_ACTION_CREDIT.DISBURSED)
  return await AppServices.api<API_Response<string>>({
    url: `${END_POINT.CREDIT.sendFABaction}?${params}`,
    methodCall: METHOD_CALL_API.POST,
    domain: DOMAIN.MAIN,
  })
}

const markCreditContractAsCompleted = async ({
  creditIdEncode,
}: {
  creditIdEncode: string
}) => {
  const params = new URLSearchParams()
  params.append('creditContractEncodeId', creditIdEncode.toString())
  params.append('group', null)
  params.append('mode', MODE_FAB_ACTION_CREDIT.COMPLETE)
  return await AppServices.api<API_Response<string>>({
    url: `${END_POINT.CREDIT.sendFABaction}?${params}`,
    methodCall: METHOD_CALL_API.POST,
    domain: DOMAIN.MAIN,
  })
}

const getCreditTrackingList = async ({
  creditEncodeId,
  // creditId,
  page,
  size = 10,
}: {
  // creditId?: string
  creditEncodeId?: string
  page: string
  size: string
}) => {
  const params = new URLSearchParams()
  params.append('creditId', creditEncodeId.toString())
  params.append('page', page.toString())
  params.append('size', size.toString())
  return await AppServices.api<API_Response<CreditLogUserPage>>({
    url: `${END_POINT.CREDIT.getTrackingList}?${params.toString()}`,
    methodCall: METHOD_CALL_API.GET,
    domain: DOMAIN.MAIN,
  })

  // params.append('objectNumber', creditId.toString())
  // params.append('page', page.toString())
  // params.append('size', size.toString())
  // return await AppServices.api<API_Response<CreditLogUserPage>>({
  //   url: `${END_POINT.CREDIT.getTrackingListV2}?${params.toString()}`,
  //   methodCall: METHOD_CALL_API.GET,
  //   domain: DOMAIN.MAIN,
  // })
}

export const CreditService = {
  getCreditContractList,
  getDetailCreditContract,
  getDetailCreditContractFeedback,
  sendFeedbackAboutCredit,
  approveCreditContract,
  rejctCreditContract,
  trackCreditContract,
  updateLoanGroupCreditContract,
  returnToSenderOfCreditContract,
  sendFeedbackToSenderOfCreditContract,
  markCreditContractAsDisbursed,
  markCreditContractAsCompleted,
  getCreditTrackingList,
}
