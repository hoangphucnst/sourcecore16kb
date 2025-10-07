import {METHOD_CALL_API} from '.'
import AppServices from '../AppServices'
import {DOMAIN, END_POINT} from './endpoints'

export interface API_Response<T> {
  object: T | null
  message: string
  status: number
}

export interface MortgagePage {
  totalElements: number
  totalPages: number
  size: number
  content: Mortgage[]
  number: number
  sort: Sort
  pageable: Pageable
  first: boolean
  last: boolean
  numberOfElements: number
  empty: boolean
}

export interface Mortgage {
  mortgageContractId: number
  mortgageContractCode: string
  mortgageContractNumber: string
  creditContractNumber: string
  amount?: number
  mortgageOwner: string
  mortgageOwnerString: string
  loanAmount?: number
  partnerId: number
  isActive: number
  createTime: string
  updateTime: string
  createBy: string
  updateBy: string
  status: number
  signStatus: string
  mortgageBorrower: string
  mortgagePropertyReceiver?: number
  mortgagePropertyReceiverString: any
  mortgageType: any
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

export interface MortgageContractDetail {
  mortgageContract: MortgageContract
  customers: Customer[]
  borrowers: Borrower[]
  officers: Officer[]
  properties: Property[]
}

export interface MortgageContract {
  mortgageContractId: number
  mortgageContractCode: string
  mortgageContractNumber: string
  creditContractNumber: string
  amount: number
  mortgageOwner: string
  mortgageOwnerString: string
  loanAmount: number
  partnerId: number
  isActive: number
  createTime: string
  updateTime: string
  createBy: string
  updateBy: string
  status: number
  signStatus: string
  mortgageBorrower: string
  mortgagePropertyReceiver: number
  mortgagePropertyReceiverString: string
  mortgageType: string
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
  phoneNumber: string
  maritalStatus: string
  membershipNumber: string
  capitalContribution: number
  occupation: any
  education: string
  reputation: any
  restrictedGroup: any
  dependents: string
  partnerId: any
  isActive: number
  status: number
  note: string
  placeofissuecmnd: any
  cccd: string
  placeofissuecccd: string
  limited: number
  job: string
  civilLegalCapacity: string
  civilCapacity: string
  createTime: string
  relation: any
}

export interface Borrower {
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
  phoneNumber: string
  maritalStatus: string
  membershipNumber: string
  capitalContribution: number
  occupation: any
  education: string
  reputation: any
  restrictedGroup: any
  dependents: string
  partnerId: any
  isActive: number
  status: number
  note: string
  placeofissuecmnd: any
  cccd: string
  placeofissuecccd: string
  limited: number
  job: string
  civilLegalCapacity: string
  civilCapacity: string
  createTime: string
  relation: any
}

export interface Officer {
  userId: number
  userName: string
  roleId: number
  roleName: string
  departmentId: number
  departmentName?: string
  authorizedPerson: string
  documentNumber: number
  signingDate: string
  mortgageID: number
  isActive: number
  createTime: string
  updateTime: string
  createBy: string
  updateBy: string
  status: number
  officerId: number
  userRoleDeptId: number
}

export interface PropertyDetail {
  propertyInfoId: number
  propertyId: number
  assetType: string
  houseOrBuildingType: string
  constructionArea: number
  usableArea: any
  buildingStructure: string
  actualConstructionArea: any
  yearOfCompletion: string
  yearOfRenovation: string
  correctionFactor: number
  propertyDescription: string
  propertyLocation: string
  propertyInfoType: number
}

export interface Property {
  propertyOnRecord: PropertyDetail[]
  propertyActual: PropertyDetail[]
  propertyId: number
  morgageId: number
  propertyName: string
  landParcel: string
  mapSheetNumber: string
  landAddress: string
  usageDuration: string
  area: number
  areaInWords: string
  privateLandArea: number
  sharedLandArea: number
  landUseOrigin: string
  collateralAssetAddress: string
  landUsePurpose: string
  assetType: any
  houseOrBuildingType: any
  constructionArea: any
  usableArea: any
  buildingStructure: any
  actualConstructionArea: any
  yearOfCompletion: string
  yearOfRenovation: string
  correctionFactor: any
  infrastructureAndLocation: string
  profitabilityIndex: number
  mortgagedAssetValue: number
  valuationDate: string
  startingSalePrice: any
  assetLocationDescription: string
  landUseRightsAndPropertyDocuments: string
  mortgagedAssetDescription: string
  attachedLandAssetDescription: string
  assetValuation: string
  calculationMethod: string
  surveyPrice: any
  landType: string
  ruralUrbanType: string
  alleyType: string
  alleyWidth: any
  alleyDepth: any
  terrain: number
  square: string
  squareName: string
  nonAgriculturalLocation: string
  areaLocation: string
  priceCalculationMethod: string
  frontageWidth: number
  nonAgriculturalLandAreaMarket: string
  areaHousingLand: string
  nonAgriculturalLandAreaState: string
  agriculturalLandIncreaseRate: number
  convenienceFactor: string
  adjacentFactor: number
  nonAgriculturalLandRatio: any
  areaByParts: AreaByPart[]
  partnerId: number
  files: any
  fileDifferents: any
  fileMetadata: FileMetadaum[]
  fileDifferentMetadata: FileDifferentMetadaum[]
  deletedFileIds: any
  deletedFileDifferentIds: any
  pricePerM2: any
  bookNumber: string
  placeOfRelease: string
  dateOfRelease: string
  restrictionOfUse: any
  gcnNumber: string
  propertyDescription: any
  propertyLocation: any
  creditStatus: any
  createDate: any
  listChangeAfterGCN: string
  roadWidth: any
  aKeepLender: string
  bKeepBorrower: string
}

export interface FileMetaData {
  id: number
  name: string
  size: number
  contentType: string
  path: string
  idEncode: string
}

export interface FileDifferentMetaData {
  id: number
  name: string
  size: number
  contentType: string
  path: string
  idEncode: string
}

const getMortgageList = async ({
  page = 0,
  size = 10,
  mortgageContractCode,
  mortgageOwner,
  amount,
  fromDate,
  toDate,
  searchingString,
}: {
  page: number
  size: number
  mortgageContractCode?: string
  mortgageOwner?: string
  amount?: string
  fromDate?: string
  toDate?: string
  searchingString?: string
}) => {
  const params = new URLSearchParams()

  params.append('page', page.toString())
  params.append('size', size.toString())

  if (mortgageContractCode)
    params.append('mortgageContractCode', mortgageContractCode)
  if (mortgageOwner) params.append('mortgageOwner', mortgageOwner)
  if (amount) params.append('amountFrom', amount)
  if (amount) params.append('amountTo', amount)
  if (fromDate) params.append('fromDate', fromDate)
  if (toDate) params.append('toDate', toDate)

  if (searchingString) params.append('searchingString', searchingString)

  return AppServices.api<API_Response<MortgagePage>>({
    url: `${END_POINT.MORTGAGE.getList}?${params.toString()}`,
    methodCall: METHOD_CALL_API.GET,
    domain: DOMAIN.MAIN,
  })
}

const getMortgageContractDetatil = ({id}: {id: string}) => {
  return AppServices.api<API_Response<MortgageContractDetail>>({
    url: `${END_POINT.MORTGAGE.getContractDetail}?id=${id.toString()}`,
    methodCall: METHOD_CALL_API.GET,
    domain: DOMAIN.MAIN,
  })
}

const getMortgageAttachs = ({propertyId}: {propertyId: string}) => {
  const params = new URLSearchParams()

  params.append('propertyId ', propertyId.toString())

  return AppServices.api<API_Response<MortgagePage>>({
    url: `${END_POINT.MORTGAGE.getAttachs}?${params.toString()}`,
    methodCall: METHOD_CALL_API.GET,
    domain: DOMAIN.MAIN,
  })
}

export const API_Mortgage = {
  getMortgageList,
  getMortgageContractDetatil,
  getMortgageAttachs,
}
