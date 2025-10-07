/* eslint-disable @typescript-eslint/no-unused-vars */
import {useEffect, useState} from 'react'
import {APIs} from '~/services/apis'
import {Notification} from '~/services/apis/notificationService'
import utils from '~/utils'

interface List {
  page: number
  total: number
  size: number
  data: Customer[]
  refresh: boolean
  showLoading: boolean
}

const useNofiticationList = () => {
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
    fetchNotification(0, [], resetList)
  }

  const fetchNotification = async (
    customPage: number = list.page,
    currentData: Notification[] = list.data,
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

      const res = await APIs.getNotificationList(payload)
      const customers = res?.object?.content || []
      const finalTotal = res?.object?.totalElements || 0

      const newData = [...currentData, ...customers]
      const isAllLoaded = newData.length >= finalTotal

      utils.log('fetchNotification', {
        data: newData.length,
        page: customPage + 1,
        total: finalTotal,
        refresh: false,
        showLoading: finalTotal > 0 && !isAllLoaded,
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
    if (!isLoading && list.data.length < list.total) {
      fetchNotification(list.page, list.data, list)
    }
  }

  const updateLocalNotification = (notificationId: number) => {
    setList(prev => {
      const updatedData = prev.data.map(item =>
        item.notificationId === notificationId ? {...item, isRead: 1} : item,
      )
      return {
        ...prev,
        data: updatedData,
      }
    })
  }

  return {
    onRefresh,
    loadMore,
    list,
    updateLocalNotification,
  }
}

export default useNofiticationList
