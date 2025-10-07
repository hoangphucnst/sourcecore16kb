import {useEffect, useState} from 'react'
import {APIs} from '~/services/apis'
import {
  AssignedTaskStats,
  CapitalAndDebtOverview,
  ContractStats,
  CreditProfileData,
  CreditStatusData,
  OtherTaskInfo,
  PersonalTaskStats,
  SolvedCredit,
} from '~/services/apis/dashboardService'
import utils from '~/utils'

interface DashboardStat {
  contract: ContractStats
  capAndDebt: CapitalAndDebtOverview
  debtAndCustomer: CreditProfileData
  creditPersonalAndCommon: CreditStatusData
  solvedCredit: SolvedCredit
  personalTask: PersonalTaskStats
  assignedTask: AssignedTaskStats
  otherStats: OtherTaskInfo
}

const useDashboardStats = () => {
  const [stat, setStat] = useState<DashboardStat>({
    contract: null,
    capAndDebt: null,
    debtAndCustomer: null,
    creditPersonalAndCommon: null,
    solvedCredit: null,
    personalTask: null,
    assignedTask: null,
    otherStats: null,
  })
  const [isLoading, setIsLoading] = useState(false)

  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()

  const firstDate = new Date(currentYear, currentMonth, 1).toLocaleDateString(
    'sv-SE',
  )
  const lastDate = new Date(
    currentYear,
    currentMonth + 1,
    0,
  ).toLocaleDateString('sv-SE')

  const [year, setYear] = useState(currentYear)
  const [date, setDate] = useState<{fromDate; toDate}>({
    fromDate: firstDate,
    toDate: lastDate,
  })

  // const fetchDashboardContract = async () => {
  //   try {
  //     const res = await APIs.getDashboardContract()
  //     if (res.status === 200) {
  //       setStat(prev => ({
  //         ...prev,
  //         contract: res?.object?.contract || null,
  //       }))
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const fetchDashboardCapAndDebt = async () => {
    try {
      const res = await APIs.getDashboardCapAndDebt({year: year})
      if (res.status === 200) {
        setStat(prev => ({
          ...prev,
          capAndDebt: res?.object || null,
        }))
      }
    } catch (error) {}
  }

  const fetchDebtAndCustomer = async () => {
    try {
      const res = await APIs.getDebtAndCustomerStructure()
      if (res.status === 200) {
        setStat(prev => ({
          ...prev,
          debtAndCustomer: res?.object || null,
        }))
      }
    } catch (error) {
      utils.log('fetchDebtAndCustomer -> Error', error)
    }
  }

  const fetchCreditPersonalAndCommon = async () => {
    try {
      const res = await APIs.getPersonalAndGeneralCreditProfiles()
      if (res.status === 200) {
        setStat(prev => ({
          ...prev,
          creditPersonalAndCommon: res?.object || null,
        }))
      }
    } catch (error) {
      utils.log('fetchCreditPersonalAndCommon -> Error', error)
    }
  }

  const fetchSolvedCredit = async () => {
    try {
      const res = await APIs.getSolvedCredit({
        fromDate: date.fromDate,
        toDate: date.toDate,
      })
      if (res.status === 200) {
        setStat(prev => ({
          ...prev,
          solvedCredit: res?.object?.solvedCredit || null,
        }))
      }
    } catch (error) {
      utils.log('fetchSolvedCredit -> Error', error)
    }
  }

  const fetchOtherStats = async () => {
    try {
      const res = await APIs.getOtherStats()
      if (res.status === 200) {
        setStat(prev => ({
          ...prev,
          otherStats: res?.object?.others || null,
        }))
      }
    } catch (error) {
      utils.log('fetchOtherStats -> Error', error)
    }
  }

  const fetchTaskOverview = async () => {
    try {
      const res = await APIs.getTaskOverviewDashboard()
      if (res.status === 200) {
        setStat(prev => ({
          ...prev,
          personalTask: res?.object?.personalWork || null,
          assignedTask: res?.object?.assignedWork || null,
          contract: res?.object?.contract || null,
        }))
      }
    } catch (error) {
      utils.log('fetchTaskOverview -> Error', error)
    }
  }

  useEffect(() => {
    let isMounted = true

    const onReload = async () => {
      setIsLoading(true)
      try {
        const [otherStatsRes, debtCustomerRes, creditRes, solvedRes, taskRes] =
          await Promise.all([
            APIs.getOtherStats(),
            APIs.getDebtAndCustomerStructure(),
            APIs.getPersonalAndGeneralCreditProfiles(),
            APIs.getSolvedCredit({
              fromDate: date.fromDate,
              toDate: date.toDate,
            }),
            APIs.getTaskOverviewDashboard(),
          ])

        if (isMounted) {
          setStat(prev => ({
            ...prev,
            otherStats: otherStatsRes?.object?.others || null,
            debtAndCustomer: debtCustomerRes?.object || null,
            creditPersonalAndCommon: creditRes?.object || null,
            solvedCredit: solvedRes?.object?.solvedCredit || null,
            personalTask: taskRes?.object?.personalWork || null,
            assignedTask: taskRes?.object?.assignedWork || null,
            contract: taskRes?.object?.contract || null,
          }))
          setIsLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    onReload()

    return () => {
      isMounted = false
    }
  }, [])

  const onReload = async () => {
    setIsLoading(true)
    await Promise.all([
      // fetchDashboardContract(),
      fetchOtherStats(),
      fetchDebtAndCustomer(),
      fetchCreditPersonalAndCommon(),
      fetchSolvedCredit(),
      fetchTaskOverview(),
      fetchDashboardCapAndDebt(),
    ])
    setIsLoading(false)
  }

  useEffect(() => {
    fetchDashboardCapAndDebt()
  }, [year])

  return {
    stat,
    setYearCapAnDebt: setYear,
    setDateFromAndTo: setDate,
    onReload,
    isLoading,
  }
}

export default useDashboardStats
