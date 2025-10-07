import {useEffect, useState} from 'react'
import {APIs} from '~/services/apis'
import {TaskQTD} from '~/services/apis/taskService'
// import utils from '~/utils'

interface List {
  page: number
  total: number
  size: number
  data: TaskQTD[]
  refresh: boolean
  showLoading: boolean
}

const useTaskQTD = () => {
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
    fetchTaskQTD(0, [], resetList)
  }

  const reset = () => {
    setSearch('')
    setFilter({})
  }
  const fetchTaskQTD = async (
    customPage: number = list.page,
    currentData: TaskQTD[] = list.data,
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
          quickSearch: search,
        }
      }

      const res = await APIs.getTaskList(payload)

      if (res.status !== 200) {
        utils.log('fetchTaskQTD -> Error', res.message)
      }

      const customers = res?.object?.datas || []
      // console.log(JSON.stringify(customers))
      const finalTotal = res?.object?.totals || 0

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
      fetchTaskQTD(list.page, list.data, list)
    }
  }

  return {
    onRefresh,
    setSearch,
    setFilter,
    loadMore,
    list,
    reset,
  }
}

export default useTaskQTD
