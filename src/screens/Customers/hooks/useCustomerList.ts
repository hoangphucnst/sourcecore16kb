import {useEffect, useState} from 'react'
import {APIs} from '~/services/apis'
import {Customer} from '~/services/apis/customerService'
import utils from '~/utils'

interface List {
  page: number
  total: number
  size: number
  data: Customer[]
  refresh: boolean
  showLoading: boolean
}

const useCustomerList = () => {
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
    fetchCustomers(0, [], resetList)
  }

  const reset = () => {
    setSearch('')
    setFilter({})
  }

  const fetchCustomers = async (
    customPage: number = list.page,
    currentData: Customer[] = list.data,
    prevState: List = list,
  ) => {
    if (isLoading) return
    setIsLoading(true)

    try {
      let payload = {
        page: customPage,
        ...filter,
      }

      if (search.length > 0) {
        payload = {
          ...payload,
          searchingString: search,
        }
      }

      const res = await APIs.getCustomerList(payload)

      if (res.status !== 200) {
        utils.log('fetchCustomers -> Error', res.message)
      }

      const customers = res?.object?.customers || []
      const finalTotal = res?.object?.totalElements || 0

      const newData = [...currentData, ...customers]
      const isAllLoaded = newData.length >= finalTotal

      // utils.log('🔍 DEBUG LoadMore Condition', {
      //   currentPage: customPage,
      //   customersLength: customers.length,
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
      utils.log('fetchCustomers -> Error', error)
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
      fetchCustomers(list.page, list.data, list)
    }
  }

  return {
    onRefresh,
    setSearch,
    setFilter,
    loadMore,
    reset,
    list,
  }
}

export default useCustomerList
