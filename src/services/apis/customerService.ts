import {METHOD_CALL_API} from '.'
import AppServices from '../AppServices'
import {DOMAIN, END_POINT} from './endpoints'

export interface API_Response<T> {
  object: T
  message: string
  status: number
}

export interface Customer_List {
  totalElements: number
  customers: Customer[]
}

export interface Customer {
  customerId: number
  customerCode: string
  fullName: string
  gender: number
  dateOfBirth: string
  address: string
  idNumber: string
  idIssueDate: string
  idExpiryDate: string
  idIssuedBy: any
  email: string
  phoneNumber: number
  maritalStatus: string
  membershipNumber: string
  capitalContribution: number
  occupation: any
  education: string
  reputation: any
  restrictedGroup: any
  dependents: number
  partnerId: any
  isActive: number
  note: string
  placeofissuecmnd: any
  cccd: string
  placeofissuecccd: string
  limited: number
  job: string
  civilLegalCapacity: string
  civilCapacity: string
  createTime: string
}

export interface TypeDataDetailCustomer {
  customerMain: CustomerMain
  relatedCustomers: RelatedCustomer[]
  attachments: Attachment[]
}

export interface CustomerMain {
  customerId: number
  customerCode: string
  fullName: string
  gender: number
  dateOfBirth: string
  address: string
  idNumber: any
  idIssueDate: string
  idExpiryDate: string
  idIssuedBy: any
  email: string
  phoneNumber: string
  maritalStatus: string
  membershipNumber: string
  capitalContribution: string
  occupation: any
  education: string
  reputation: any
  restrictedGroup: any
  dependents: string
  partnerId: number
  isActive: number
  status: number
  note: string
  placeofissuecmnd: any
  cccd: string
  placeofissuecccd: string
  limited: string
  job: string
  civilLegalCapacity: string
  civilCapacity: string
  createTime: string
  relation: any
  isDeleted: any
  signatureImage: string
}

export interface RelatedCustomer {
  customerId: number
  customerCode: string
  fullName: string
  gender: any
  dateOfBirth: any
  address: string
  idNumber: any
  idIssueDate: any
  idExpiryDate: any
  idIssuedBy: any
  email: any
  phoneNumber: any
  maritalStatus: any
  membershipNumber: any
  capitalContribution: any
  occupation: any
  education: any
  reputation: any
  restrictedGroup: any
  dependents: any
  partnerId: any
  isActive: any
  note: any
  placeofissuecmnd: any
  cccd: string
  placeofissuecccd: any
  limited: any
  job: any
  civilLegalCapacity: any
  civilCapacity: any
  createTime: any
  relation: string
}

export interface Attachment {
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
  size: any
  contentType: any
  attachPdfPath: string
  signers: any
  attachIdEncode: string
}

const getCustomerList = async ({
  fullName,
  customerCode,
  dateOfBirth,
  address,
  status,
  cccd,
  searchingString,
  page = 0,
  size = 10,
}: {
  page: number
  size: number
  fullName?: string
  customerCode?: string
  dateOfBirth?: string
  address?: string
  status?: string
  cccd?: string
  searchingString?: string
}) => {
  const params = new URLSearchParams()

  params.append('page', page.toString())
  params.append('size', size.toString())

  if (fullName) params.append('fullName', fullName)
  if (customerCode) params.append('customerCode', customerCode)
  if (dateOfBirth) params.append('dateOfBirth', dateOfBirth)
  if (address) params.append('address', address)
  if (status) params.append('status', status)
  if (cccd) params.append('cccd', cccd)
  if (searchingString) params.append('searchingString', searchingString)

  return (await AppServices.api)<API_Response<Customer_List>>({
    url: `${END_POINT.CUSTOMER.getList}?${params.toString()}`,
    methodCall: METHOD_CALL_API.GET,
    domain: DOMAIN.MAIN,
  })
}

const getDetailCustomer = async customerId => {
  return AppServices.api<API_Response<TypeDataDetailCustomer>>({
    url: END_POINT.CUSTOMER.getDetails(customerId),
    methodCall: METHOD_CALL_API.GET,
    domain: DOMAIN.MAIN,
  })
}

export const API_Customer = {
  getCustomerList,
  getDetailCustomer,
}
