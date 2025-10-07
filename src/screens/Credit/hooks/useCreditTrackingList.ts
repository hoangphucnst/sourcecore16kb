import {useEffect, useState} from 'react'
import {APIs} from '~/services/apis'
import {CreditContract, CreditLogUser} from '~/services/apis/creditService'
import utils from '~/utils'

interface List {
  page: number
  total: number
  size: number
  data: CreditContract[]
  refresh: boolean
  showLoading: boolean
}

const useCreditTrackingList = ({creditEncodeId}: {creditEncodeId: string}) => {
  // {creditEncodeId}: {creditEncodeId: string}
  // {creditId}: {creditId: string}
  const [isLoading, setIsLoading] = useState(false)
  const [list, setList] = useState<List>({
    page: 0,
    total: 0,
    size: 10,
    data: [],
    refresh: false,
    showLoading: true,
  })
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState({})

  useEffect(() => {
    onRefresh()
  }, [search, filter])

  const onRefresh = () => {
    const resetList = {
      page: 0,
      total: 0,
      size: 10,
      data: [],
      refresh: true,
      showLoading: false,
    }
    setList(resetList)
    fetchCreditContract(0, [], resetList)
  }

  const fetchCreditContract = async (
    customPage: number = list.page,
    currentData: CreditLogUser[] = list.data,
    prevState: List = list,
  ) => {
    if (isLoading) return
    setIsLoading(true)

    try {
      let payload = {
        creditEncodeId: creditEncodeId,
        // creditId: creditId,
        page: customPage,
        ...filter,
      }

      if (search.length > 0) {
        payload = {
          ...payload,
          searchingString: search,
        }
      }

      const res = await APIs.getCreditTrackingList(payload)

      if (res.status !== 200) {
        utils.log('fetchCreditContract -> Error', res.message)
      }

      const contracts = res?.object?.content || []
      const finalTotal = res?.object?.totalElements || 0

      const newData = [...currentData, ...contracts]
      const isAllLoaded = newData.length >= finalTotal

      // utils.log('🔍 DEBUG LoadMore Condition', {
      //   currentPage: customPage,
      //   customersLength: contracts.length,
      //   newTotal: newData.length,
      //   total: finalTotal,
      //   showLoading: !isAllLoaded,
      // })

      setList({
        ...prevState,
        data: newData,
        page: customPage + 1,
        total: finalTotal,
        refresh: false,
        showLoading: finalTotal > 0 && !isAllLoaded,
      })
    } catch (error) {
      setList(prev => ({
        ...prev,
        refresh: false,
        showLoading: false,
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const loadMore = () => {
    // utils.log('🔍 DEBUG LoadMore Condition', {
    //   isLoading: isLoading,
    //   'list.data.length': list.data.length,
    //   'list.total': list.total,
    //   '!isLoading && list.data.length < list.total':
    //     !isLoading && list.data.length < list.total,
    //   '!isLoading && list.data.length === list.total && list.showLoading':
    //     !isLoading && list.data.length === list.total && list.showLoading,
    // })
    if (!isLoading && list.data.length < list.total) {
      fetchCreditContract(list.page, list.data, list)
    }
  }

  return {
    onRefresh,
    setSearch,
    setFilter,
    loadMore,
    list,
  }
}

export default useCreditTrackingList
