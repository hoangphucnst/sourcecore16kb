import {useState} from 'react'
import {FINANCIAL_OVERVIEW_LABELS, LOCAL_PAGE} from '~/constants'
import {APIs} from '~/services/apis'
import {
  AttachmentFile,
  CommentThread,
  CreditContract,
  CreditContractDetail,
  DirectCost,
  Field,
  IndirectCost,
  LoanSummary,
  MortgageContract,
} from '~/services/apis/creditService'
import utils from '~/utils'

export interface GeneralInfo extends CreditContract {
  creditCode?: string
  numberCreditStr?: string
  dateCreate?: string
  group?: any
  loanStartDate?: string
  loanEndDate?: string
  loanAmount?: number
  interestRate?: number
  mortgageContractNumber?: string
  loanMethod?: string
  collateralType?: string
  outstandingDebt?: number
  relatedDebt?: number
  fundCapital?: number
  debtToCapital?: number
  groupDebtToCapital?: number
  mortgageContract?: HdtcData
  debtToEquityRatio?: string
  currentFundEquity?: string
  groupDebtToEquityRatio?: string
  totalCustomerDebt?: string
  relatedPersonTotalDebt?: string
  loanTerm?: number
  loanPurposeLabel?: string
}

export interface HandlerInfo {
  fullName: string
  roleName: string
  departmentName: string
  documentNumber: string
  date: string
  type: number // 1: xử lý, 2: đại diện
  authority: string
  authorizedBy: string
  status: string
  priority: string
  authorizedPersonName: string
}

export interface BorrowerInfo {
  fullName: string
  dateOfBirth: string
  address: string
  customerCode: string
  phoneNumber: string
  identityNumber: string
}

export interface BeneficiaryInfo {
  beneficiaryName: string
  bank: string
  beneficiaryNumber: string
  accountNumber: string
  amount: string
  content: string
  method: string
  date: string
}

export interface DisplayGeneralInfo {
  generalInfo: GeneralInfo
  handlers: HandlerInfo[]
  representatives: HandlerInfo[]
  borrowers: BorrowerInfo[]
  beneficiaries: BeneficiaryInfo[]
  attachments: AttachmentFile[]
  debtRepayPlan: RepayPlan
  mortgages: MortgageContract[]
}

export interface DisplayDetailContract {
  generalInfoScreen: DisplayGeneralInfo
  finacialInfo: DisplayFinancialInfo
  processFeedback: CommentThread[]
  rolesButton: RolesButton
}

export interface RolesButton {
  isEdit: string
  isApproval: string
  isDenied: string
  isReturnToSender: string // Thu hồi hợp đồng (mới)
  isDisbursed: string
  isLoanCompleted: string
  isDebtGroupUpdate: string
  isRecall: string
}

export interface BeneficiaryHDTC {
  maTH: number
  beneficiaryName: string
  bankName: string
  beneficiaryNumber: string
  date: string
  amount: number
  method: string
  description: string | number
}

export interface RepresentativeHDTC {
  userId: number
  userRoleDeptId: number
  userCode: string
  fullName: string
  roleName: string
  departmentName: string
  authorizedPerson: number
  documentNumber: number
  date: string
}

export interface HdtcData {
  beneficiaryData: BeneficiaryHDTC[]
  handlerData: HandlerInfo[]
  representativeData: RepresentativeHDTC[]
}

const convertToGeneralInfo = (
  detail: CreditContractDetail,
): DisplayGeneralInfo => {
  const contract = detail.contract
  const firstMortgage = detail.mortgages?.[0]

  const rawMortgageContract = detail.contract?.hdtcInfo || null
  let mortgageContract: HdtcData | null = null

  if (rawMortgageContract && typeof rawMortgageContract === 'string') {
    mortgageContract = utils.parsePseudoJson<HdtcData | null>(
      rawMortgageContract,
    )
  } else if (
    typeof rawMortgageContract === 'object' &&
    rawMortgageContract !== null
  ) {
    mortgageContract = rawMortgageContract as HdtcData
  }

  const rawSummary = detail.contract?.summary || null
  let summary: LoanSummary | null = null

  if (rawSummary && typeof rawSummary === 'string') {
    summary = utils.parsePseudoJson<LoanSummary | null>(rawSummary)
  } else if (typeof rawSummary === 'object' && rawSummary !== null) {
    summary = rawSummary as LoanSummary
  }

  return {
    generalInfo: {
      ...contract,
      creditCode: contract.creditCode,
      numberCreditStr: contract.numberCreditStr,
      dateCreate: contract.dateCreate,
      group: contract.group,
      loanStartDate: contract.loanStartDate,
      loanEndDate: contract.loanEndDate,
      loanAmount: contract.loanAmount,
      interestRate: contract.interestRate,
      mortgageContractNumber: contract?.mortgageNumber,
      loanMethod: contract.loanMethod,
      collateralType: contract.collateralType,
      outstandingDebt: contract.outstandingDebt,
      relatedDebt: null,
      fundCapital: null,
      debtToCapital: null,
      groupDebtToCapital: null,
      mortgageContract: mortgageContract,
      debtToEquityRatio: summary?.loanToOwnRatio || null,
      currentFundEquity: summary?.ownCapital || null,
      groupDebtToEquityRatio: summary?.groupLoanToOwnRatio || null,
      totalCustomerDebt:
        utils.parseNumber(summary?.loanToOwnRatio) *
        utils.parseNumber(summary?.ownCapital),
      relatedPersonTotalDebt:
        utils.parseNumber(summary?.groupLoanToOwnRatio) *
        utils.parseNumber(summary?.ownCapital),
      loanTerm: contract?.loanTerm || null,
      loanPurposeLabel: contract?.loanPurposeLabel || null,
    },
    handlers:
      detail.handlerdatas
        ?.filter(h => h.type === 1)
        .map(h => ({
          fullName: h.fullName,
          roleName: h.roleName,
          departmentName: h.departmentName,
          documentNumber: h.documentNumber,
          date: h.date,
          type: h.type,
          authority: h.authority,
          authorizedBy: h.authorizedPerson,
          authorizedPersonName: h.authorizedPersonName,
          status: h.status,
          priority: h.priority,
        })) || [],
    representatives:
      detail.handlerdatas
        ?.filter(h => h.type === 2)
        .map(h => ({
          fullName: h.fullName,
          roleName: h.roleName,
          departmentName: h.departmentName,
          documentNumber: h.documentNumber,
          date: h.date,
          type: h.type,
          authority: h.authority,
          authorizedBy: h.authorizedPerson,
          authorizedPersonName: h.authorizedPersonName,
        })) || [],
    mortgages: detail?.mortgages,
    borrowers:
      firstMortgage?.listCustomer?.map(c => ({
        fullName: c.fullName,
        dateOfBirth: c.dateOfBirth,
        address: c.address,
        customerCode: c.customerCode,
        phoneNumber: c.phoneNumber,
        identityNumber: c.cccd,
      })) || [],
    beneficiaries:
      detail.beneficiaryData?.map(b => ({
        beneficiaryName: b.beneficiaryName,
        bank: b.bankName,
        beneficiaryNumber: b.beneficiaryNumber,
        accountNumber: b.beneficiaryNumber,
        amount: b.amount,
        content: b.description,
        method: b.method,
        date: b.date,
      })) || [],
    attachments: detail.atts || [],
    debtRepayPlan: detail.planData || null,
  }
}

export interface CreditInfo {
  institutionName?: string
  purpose?: string
  amount?: number
  interestRate?: number
  group?: string
  dueDate?: string
  type?: string
}

export interface RelatedDebtInfo {
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
  relatedInfo: stringany
  type: number
  creditContractId: number
}

export interface RelatedGroupDebtInfo {
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
  relatedInfo: stringany
  type: number
  creditContractId: number
}

export interface AssetAndLoanInfo {
  assets: string[]
  loans: string[]
  incomes: string[]
  expenses: string[]
}

export interface FinancialAssessment {
  financialStatus?: string
}

export interface LoanPlan extends LoanSummary {
  totalCost?: number
  ownCapital?: number
  loanCapital?: number
  interestTime?: string
  cycleUnit?: string
  profitRate?: string
  equityProfitRate?: string
  loanToOwnRatio?: string
  groupLoanToOwnRatio?: string
}

export interface ProjectRevenue {
  name?: string
  unit?: {
    label: string
    value: string
  }
  quantity?: number
  price?: number
  total?: number
  note?: string
}

export interface BusinessRisk {
  riskType?: string
  solution?: string
}

export interface EnvironmentalImpact {
  impact?: string
  solutionEI?: string
}

export interface DisplayFinancialInfo {
  financialFactors: Field[]
  creditInfos: CreditInfo[]
  relatedDebtInfos: RelatedDebtInfo[]
  relatedGroupDebtInfos: RelatedGroupDebtInfo[]
  assetAndLoanInfo: AssetAndLoanInfo
  financialAssessment: string
  loanPlan: LoanPlan
  indirectCosts: IndirectCost[]
  directCosts: DirectCost[]
  projectRevenues: ProjectRevenue[]
  businessRisks: BusinessRisk[]
  environmentalImpacts: EnvironmentalImpact[]
  businessComment: string
}

const convertToFinancialInfo = (
  detail: CreditContractDetail,
): DisplayFinancialInfo => {
  const rawSummary = detail.contract?.summary || null
  let summary: LoanSummary | null = null

  if (rawSummary && typeof rawSummary === 'string') {
    summary = utils.parsePseudoJson<LoanSummary | null>(rawSummary)
  } else if (typeof rawSummary === 'object' && rawSummary !== null) {
    summary = rawSummary as LoanSummary
  }

  return {
    financialFactors: detail.contract?.fields,
    creditInfos:
      detail.infoQtds
        ?.filter(_ => _.type === 1)
        ?.map(qtd => ({
          institutionName: qtd.financialInstitution,
          purpose: qtd.purpose,
          amount: qtd.debtAmount,
          interestRate: qtd.interestRate,
          group: qtd.debtGroup,
          dueDate: qtd.dueDate,
        })) || [],
    relatedDebtInfos: detail?.infoQtds.filter(_ => _.type === 2) || [],
    relatedGroupDebtInfos: detail?.infoQtds.filter(_ => _.type === 3) || [],
    assetAndLoanInfo: {
      assets: detail?.creditAssets.filter(
        item => item?.type === FINANCIAL_OVERVIEW_LABELS.accumulatedAssets,
      ),
      loans: detail?.creditAssets.filter(
        item => item?.type === FINANCIAL_OVERVIEW_LABELS.currentLoans,
      ),
      incomes: detail?.creditAssets.filter(
        item => item?.type === FINANCIAL_OVERVIEW_LABELS.incomeSources,
      ),
      expenses: detail?.creditAssets.filter(
        item => item?.type === FINANCIAL_OVERVIEW_LABELS.expenses,
      ),
    },
    financialAssessment: detail.contract?.note,
    loanPlan: {
      ...summary,
      totalCost: Number(summary?.totalNeed),
      ownCapital: Number(summary?.ownCapital),
      loanCapital: Number(summary?.loanCapital),
      interestTime: summary?.interestTime,
      profitRate: summary?.profitRate,
      cycleUnit: summary?.cycleUnit,
      equityProfitRate: summary?.equityProfitRate,
      loanToOwnRatio: summary?.loanToOwnRatio,
      groupLoanToOwnRatio: summary?.groupLoanToOwnRatio,
    },
    indirectCosts: detail?.contract?.indirectCosts,
    directCosts: detail?.contract?.directCosts,
    projectRevenues: detail?.contract?.projectRevenue,
    businessRisks: detail?.contract?.businessRisks,
    environmentalImpacts: detail?.contract?.environmentImpacts,
    businessComment: detail.contract?.note,
  }
}

// ================================= <Main> =================================

const useDetailCreditContract = ({
  creditIdEncode,
}: {
  creditIdEncode: string
}) => {
  const [detailCreditContract, setDetailContract] =
    useState<DisplayDetailContract>(null)
  const [isLoading, setLoading] = useState({
    generalInfo: true,
    finacialInfo: true,
    processFeedback: true,
  })

  const fetchDetailCredit = async () => {
    if (creditIdEncode === null) return
    const res = await APIs.getDetailCreditContract({
      creditIdEncode: creditIdEncode,
    })
    if (res.status === 200) {
      const g_info = convertToGeneralInfo(res?.object)
      const f_info = convertToFinancialInfo(res?.object)
      setDetailContract(prev => ({
        ...prev,
        generalInfoScreen: g_info,
        finacialInfo: f_info,
        rolesButton: {
          isEdit: res?.object?.contract?.isActive,
          isApproval: res?.object?.contract?.isApproval,
          isDenied: res?.object?.contract?.isDenied,
          isReturnToSender: res?.object?.contract?.isReturnToSender,
          isDisbursed: res?.object?.contract?.isDisbursed,
          isLoanCompleted: res?.object?.contract?.isLoanCompleted,
          isDebtGroupUpdate: res?.object?.contract?.isDebtGroupUpdate,
          isRecall: res?.object?.contract?.isRecall,
        },
      }))
    }
    console.log('loading done')
    setLoading(prev => ({
      ...prev,
      generalInfo: false,
      finacialInfo: false,
    }))
  }

  const fetchDetailCreditFeedback = async () => {
    if (creditIdEncode === null) return
    const res = await APIs.getDetailCreditContractFeedback({
      localPage: LOCAL_PAGE.CreditContract,
      objectId: creditIdEncode,
    })

    if (res.status === 200) {
      setDetailContract(prev => ({
        ...prev,
        processFeedback: res?.object,
      }))
    }
    setLoading(prev => ({
      ...prev,
      processFeedback: false,
    }))
  }

  return {
    isLoading,
    detailCreditContract,
    refreshDetail: fetchDetailCredit,
    refreshFeedback: fetchDetailCreditFeedback,
  }
}

export default useDetailCreditContract
