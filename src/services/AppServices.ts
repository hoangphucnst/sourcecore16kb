import OfflineException from './exceptions/OfflineException'
import AppHttpException from './exceptions/AppHttpException'
import {store} from '~/redux/store'
import BaseException from './exceptions/BaseException'
import utils from '~/utils'
import {METHOD_CALL_API} from './apis'
import {Screens} from '~/screens/Screens'
import {logoutByTokenExpired} from '~/redux/slices/AuthSlice'

type ContentType = 'JSON' | 'Text' | 'Unsupported'

export type TypeApiConfigDefault = {
  url: string
  body?: any
  methodCall:
    | typeof METHOD_CALL_API.GET
    | typeof METHOD_CALL_API.PUT
    | typeof METHOD_CALL_API.POST
    | typeof METHOD_CALL_API.DELETE
  checktoken?: boolean
  header?: any
  domain: string
  timeoutInSeconds?: number
  keyHeader?: Array<string>
  customReq?: boolean
  useHeaderPrivate?: boolean
  disableAlertTimeOut?: false
}

const API_CONFIG_DEFAULT: TypeApiConfigDefault = {
  url: '',
  body: '',
  methodCall: 'GET',
  checktoken: true,
  header: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  domain: '',
  timeoutInSeconds: 60,
  keyHeader: [],
  customReq: false,
  useHeaderPrivate: false,
  disableAlertTimeOut: false,
}

const api = async <T>(
  apiConfig: TypeApiConfigDefault = API_CONFIG_DEFAULT,
): Promise<T> => {
  try {
    // const {isConnected} = useNetwork()
    const isConnected = store.getState()?.network?.isConnected
    const dataLogin = store.getState()?.auth?.dataLogin
    const configReq: TypeApiConfigDefault = {
      ...API_CONFIG_DEFAULT,
      ...apiConfig,
    }
    if (isConnected) {
      let headerReq = {...configReq.header}
      const bodyReq = configReq.body
      const requestTimeout = configReq.timeoutInSeconds || 30
      const fullURL = `${configReq.domain}${configReq.url}`
      utils.log(
        `Call API`,
        `[${apiConfig.methodCall}] ~ ${apiConfig.domain}${apiConfig.url}`,
      )
      console.log(bodyReq)

      if (configReq.checktoken) {
        headerReq = {
          ...headerReq,
          Authorization: `Bearer ${dataLogin?.token}`,
        }
      }

      if (configReq.body instanceof FormData) {
        delete headerReq['Content-Type']
      }

      let requestConfig: RequestInit = {
        method: configReq.methodCall,
        headers: headerReq,
        body: bodyReq,
      }

      if (configReq.customReq) {
        let bodyCus = isJsonString(configReq.body)
          ? JSON.stringify(JSON.parse(configReq.body))
          : JSON.stringify(configReq.body)
        if (
          configReq.header?.['Content-Type'] ===
          'application/x-www-form-urlencoded'
        ) {
          bodyCus = ''
          Object.keys(configReq.body).map(function (key, _) {
            bodyCus += key + '=' + configReq.body[key] + '&'
          })
        }

        requestConfig = {
          method: configReq.methodCall,
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            Connection: 'close',
            ...configReq.header,
          },
        }

        if (configReq.body) {
          requestConfig = {
            method: configReq.methodCall,
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              Connection: 'close',
              ...configReq.header,
            },
            body: bodyCus,
          }
        }

        if (configReq.useHeaderPrivate) {
          requestConfig = {
            ...requestConfig,
            headers: {
              ...configReq.header,
            },
          }

          //Kiểm tra nếu body là một formdata
          if (configReq.body instanceof FormData) {
            requestConfig = {
              ...requestConfig,
              body: configReq.body,
            }
          }
        }
      }

      const contoller = new AbortController()
      const finalConfig: RequestInit = {
        signal: contoller.signal,
        ...requestConfig,
      }
      const abort = setTimeout(() => {
        contoller.abort()
      }, requestTimeout * 1000)

      const res = await Promise.race<Response>([
        fetch(fullURL, finalConfig),
        new Promise((_, reject) =>
          setTimeout(
            () =>
              reject(
                new BaseException(
                  408,
                  `Request time out, try again later.`,
                  configReq.url,
                ),
              ),
            requestTimeout * 1000,
          ),
        ),
      ])
      clearTimeout(abort)

      const resultProcessRes = await processResponse(res, configReq.keyHeader)

      //Phiên đăng nhập hết hiệu lực
      if (resultProcessRes?.status === 498) {
        const alreadyLoggedOut = store.getState().auth.loggedOutByTokenExpired

        if (!alreadyLoggedOut) {
          utils.showMessageFlash({
            message: 'Thông báo',
            description: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
            type: 'danger',
            icon: 'danger',
            duration: 3000,
          })
          store.dispatch(logoutByTokenExpired())
          utils.showLoadingFullApp({show: false})
          utils.resetToScreen(Screens.name.Login)
        }
      }

      return resultProcessRes?.hasOwnProperty('message') &&
        utils.isHTML(resultProcessRes?.message)
        ? {
            ...resultProcessRes,
            message: 'Hệ thống đang gặp sự cố. Vui lòng thử lại sau',
          }
        : resultProcessRes
    } else {
      throw new OfflineException(-1, 'Internet not reachable', configReq.url)
    }
  } catch (error: any) {
    utils.log('Orginal Value Error', error)
    utils.log(
      `[${apiConfig.methodCall}] ${apiConfig.url}`,
      `Error: ${error?.getFormattedErrorString()}`,
    )
    const errorJSON = error?.getJsonError()
    return errorJSON
  }
}

const getContentType = (res: Response) => {
  const isJSON =
    res.headers.get('Content-Type')?.startsWith('application/json') || false

  if (isJSON) return 'JSON'

  const isText = res.headers.get('Content-Type')?.startsWith('text') || false

  if (isText) return 'Text'

  return 'Unsupported'
}

const processResponse = async (
  res: Response,
  keyHeader: Array<string> = [],
) => {
  try {
    const contentType = getContentType(res)
    if (res.ok) {
      if (contentType === 'JSON') {
        let tempDataHeader = {}
        keyHeader.forEach(e => {
          const dataHeader = res.headers.get(e)
          if (dataHeader) {
            tempDataHeader = {
              ...tempDataHeader,
              [e]: dataHeader,
            }
          }
        })
        const json = await res.json()
        return keyHeader.length > 0
          ? {...json, headers: tempDataHeader}
          : Array.isArray(json)
            ? json
            : {...json}
      } else {
        return res
      }
    }
    return doThrow(res, contentType)
  } catch (error: any) {
    utils.log(
      'API',
      `Process Response | Error -> ${error?.getFormattedErrorString()}`,
    )
    const errorJSON = error.getJsonError()
    return errorJSON?.status
      ? errorJSON
      : {
          status: -1,
          message: error?.getFormattedErrorString(),
          resOrginal: error,
        }
  }
}

const doThrow = async (res: Response, contentType: ContentType) => {
  try {
    if (contentType === 'JSON') {
      const error = await res.json()
      throw new AppHttpException(
        error?.status,
        JSON?.stringify(error) || error?.message,
        res?.url,
      )
    } else if (contentType === 'Text') {
      const errorText = await res.text()
      throw new AppHttpException(res.status, errorText, res.url)
    }

    // Not 2XX, not JSON and not text.
    throw new AppHttpException(res.status, 'Unsupported content type', res.url)
  } catch (error: any) {
    utils.log('API', `Do throw | Error -> ${error?.getFormattedErrorString()}`)
    const errorJSON = error?.getJsonError()
    return errorJSON?.status
      ? errorJSON
      : {
          status: -1,
          message: error?.getFormattedErrorString(),
          resOrginal: error,
        }
  }
}

const isJsonString = (str: any) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

const handlerError = (error: any) => {
  try {
    const dataError = JSON.parse(error.message)
    return dataError ? dataError : error.message
  } catch (err) {
    return error
  }
}

export default {
  api,
  handlerError,
}
