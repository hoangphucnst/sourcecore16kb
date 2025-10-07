import {useEffect, useState} from 'react'
import {APIs} from '~/services/apis'
import {Mortgage} from '~/services/apis/mortgageService'

interface List {
  page: number
  total: number
  size: number
  data: Mortgage[]
  refresh: boolean
  showLoading: boolean
}

const useMortgageList = () => {
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

  const reset = () => {
    setSearch('')
    setFilter({})
  }

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
    fetchMortgageList(0, [], resetList)
  }

  const fetchMortgageList = async (
    customPage: number = list.page,
    currentData: Mortgage[] = list.data,
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

      // utils.log('🔍 DEBUG payload getMortgageList', {
      //   payload: payload,
      // })

      const res = await APIs.getMortgageList(payload)

      if (res.status !== 200) {
        utils.log('fetchMortgageList -> Error', res.message)
      }

      const mortgageList = res?.object?.content || []
      const finalTotal = res?.object?.totalElements || 0

      const newData = [...currentData, ...mortgageList]
      const isAllLoaded = newData.length >= finalTotal

      // utils.log('🔍 DEBUG LoadMore Condition', {
      //   currentPage: customPage,
      //   mortgageListLength: mortgageList.length,
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
    if (!isLoading && list.data.length < list.total) {
      fetchMortgageList(list.page, list.data, list)
    } else if (!isLoading && list.data.length === list.total) {
      setList(prev => ({
        ...prev,
        showLoading: false,
      }))
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

export default useMortgageList
