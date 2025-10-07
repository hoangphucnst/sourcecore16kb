import {useEffect, useState} from 'react'
import {APIs} from '~/services/apis'
import {DetailTaskQTD} from '~/services/apis/taskService'
import utils from '~/utils'

const useTaskQTDDetail = ({taskId = ''}: {taskId: string}) => {
  const [data, setData] = useState<DetailTaskQTD>(null)
  useEffect(() => {
    getData()
  }, [taskId])

  const getData = async () => {
    utils.showLoadingFullApp({show: true})
    const res = await APIs.getDetailTask({taskID: taskId})
    if (res?.status === 200 && res?.object) {
      setData(res.object)
    } else {
    }
    utils.showLoadingFullApp({show: false})
  }

  return {
    detailTaskQTD: data,
  }
}

export default useTaskQTDDetail
