import React, {useEffect, useRef, useState} from 'react'
import {AppState, Platform} from 'react-native'
import {TypeRefLoading} from '~/components/LoadingSpinner'
import {OBJECT_TYPE} from '~/constants'
import {APIs} from '~/services/apis'
import {AttachmentDetail} from '~/services/apis/fileService'
import {MortgageContractDetail} from '~/services/apis/mortgageService'
import utils from '~/utils'

const useMortgageContractDetail = ({
  mortgageContractId,
  refLoading = false,
}: {
  mortgageContractId: string
  refLoading: React.RefObject<TypeRefLoading>
}) => {
  const [mortgageContract, setMortgageContract] =
    useState<MortgageContractDetail>(null)

  const [mortgageContractFiles, setMortgageContractFiles] =
    useState<AttachmentDetail[]>(null)

  const getData = async () => {
    refLoading.current?.show()
    const res = await APIs.getMortgageContractDetatil({id: mortgageContractId})
    if (res?.status === 200 && res?.object) {
      setMortgageContract(res.object)
    } else {
      utils.log('useMortgageContractDetail -> Detail -> Error', {
        status: res.status,
        messages: res.message,
      })
    }

    const resFile = await APIs.getFiles({
      objectId: mortgageContractId,
      objectType: OBJECT_TYPE.MortgageContract,
    })

    if (resFile?.status === 200 && resFile?.object) {
      setMortgageContractFiles(resFile.object)
    } else {
      utils.log('useMortgageContractDetail -> Files -> Error', {
        status: resFile.status,
        messages: resFile.message,
      })
    }

    refLoading.current?.hide()
  }

  const appState = useRef(AppState.currentState)

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    )

    return () => {
      subscription.remove()
    }
  }, [])

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active' &&
      Platform.OS === 'ios'
    ) {
      utils.showLoadingFullApp({show: false})
      getData()
    }

    appState.current = nextAppState
  }

  useEffect(() => {
    getData()
  }, [])

  return {mortgageContract, mortgageContractFiles, reLoadData: getData}
}

export default useMortgageContractDetail
