import {useEffect, useState} from 'react'
import {APIs} from '~/services/apis'
import {ItemTrackingTask} from '~/services/apis/taskService'
import utils from '~/utils'

interface List {
  page: number
  total: number
  size: number
  data: ItemTrackingTask[]
  refresh: boolean
  showLoading: boolean
}

const useListTrackingTask = (taskId: string) => {
  const [isLoading, setIsLoading] = useState(false)
  const [list, setList] = useState<List>({
    page: 0,
    total: 0,
    size: 10,
    data: [],
    refresh: false,
    showLoading: true,
  })

  useEffect(() => {
    onRefresh()
  }, [taskId])

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
    fetchTrackingTask(0, [], resetList)
  }

  const fetchTrackingTask = async (
    customPage: number = list.page,
    currentData: ItemTrackingTask[] = list.data,
    prevState: List = list,
  ) => {
    if (isLoading) return
    setIsLoading(true)

    try {
      const payload = {
        page: customPage,
        taskId: taskId,
      }

      const res = await APIs.getTrackingTask(payload)
      const customers = res?.object?.datas || []
      const finalTotal = res?.object?.totals || 0

      const newData = [...currentData, ...customers]
      const isAllLoaded = newData.length >= finalTotal

      utils.log('🔍 DEBUG LoadMore Condition', {
        currentPage: customPage,
        customersLength: customers.length,
        newTotal: newData.length,
        total: finalTotal,
        showLoading: !isAllLoaded,
      })

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
    utils.log('🔍 DEBUG LoadMore Condition', {
      isLoading: isLoading,
      'list.data.length': list.data.length,
      'list.total': list.total,
      '!isLoading && list.data.length < list.total':
        !isLoading && list.data.length < list.total,
      '!isLoading && list.data.length === list.total && list.showLoading':
        !isLoading && list.data.length === list.total && list.showLoading,
    })
    if (!isLoading && list.data.length < list.total) {
      fetchTrackingTask(list.page, list.data, list)
    }
  }

  return {
    onRefresh,
    loadMore,
    list,
  }
}

export default useListTrackingTask
