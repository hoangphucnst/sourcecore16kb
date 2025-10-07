import {useEffect, useState} from 'react'
import AppConfig from '~/app/AppConfig'
import useAuth from '~/redux/reduxHooks/useAuth'
import {APIs} from '~/services/apis'
import {TypeUserInfo} from '~/services/apis/authService'
import {END_POINT} from '~/services/apis/endpoints'
import utils from '~/utils'

const useUserInfo = () => {
  const {dataLogin} = useAuth()
  const [data, setData] = useState<TypeUserInfo>(null)

  useEffect(() => {
    getInfo()
  }, [])

  const getInfo = async () => {
    utils.showLoadingFullApp({show: true})
    const res = await APIs.getInfoUser(dataLogin?.user_id)
    utils.showLoadingFullApp({show: false})
    if (res.status === 200 && res?.object) {
      setData(res?.object)
    } else {
      setData(null)
    }
  }

  return {
    dataUser: data,
    imgAvatar: {
      uri: `${AppConfig.host}${END_POINT.AUTH.ImageUser(dataLogin?.user_id, 'profile')}`,
      headers: {
        Authorization: `Bearer ${dataLogin?.token}`,
      },
      cache: 'web',
    },
    imgSignature: {
      uri: `${AppConfig.host}${END_POINT.AUTH.ImageUser(dataLogin?.user_id, 'signature')}`,
      headers: {
        Authorization: `Bearer ${dataLogin?.token}`,
      },
      cache: 'web',
    },
  }
}

export default useUserInfo
