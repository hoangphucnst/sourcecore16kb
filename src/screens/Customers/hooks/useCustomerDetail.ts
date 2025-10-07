import React, {useEffect, useState} from 'react'
import {TypeRefLoading} from '~/components/LoadingSpinner'
import {OBJECT_TYPE} from '~/constants'
import {APIs} from '~/services/apis'
import {TypeDataDetailCustomer} from '~/services/apis/customerService'
import {AttachmentDetail} from '~/services/apis/fileService'
import utils from '~/utils'

const useCustomerDetail = ({
  customerId = '',
  refLoading = null,
}: {
  customerId: string
  refLoading: React.RefObject<TypeRefLoading>
}) => {
  const [data, setData] = useState<TypeDataDetailCustomer>(null)
  const [files, setFiles] = useState<AttachmentDetail[]>(null)
  useEffect(() => {
    getData()
  }, [customerId])

  const getData = async () => {
    refLoading.current?.show()
    const res = await APIs.getDetailCustomer(customerId)
    const resFile = await APIs.getFiles({
      objectId: customerId,
      objectType: OBJECT_TYPE.Customer,
    })
    refLoading.current?.hide()
    if (res?.status === 200 && res?.object) {
      setData(res.object)
    } else {
      utils.log('useCustomerDetail -> Detail -> Error', {
        stats: res?.status,
        message: res?.message,
      })
    }
    if (resFile?.status === 200 && resFile?.object) {
      setFiles(resFile.object)
    } else {
      utils.log('useCustomerDetail -> Files -> Error', {
        stats: resFile?.status,
        message: resFile?.message,
      })
    }
  }

  return {
    detailsCustomer: data,
    detailsCustomerFiles: files,
  }
}

export default useCustomerDetail
