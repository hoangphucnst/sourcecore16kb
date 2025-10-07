import {TypePayLoadSignFile} from '~/utils/signFileHandlerMortgage'
import {METHOD_CALL_API, TypeRespondSuccess} from '.'
import AppServices from '../AppServices'
import {DOMAIN, END_POINT} from './endpoints'

export type RespondSignFile = {
  attachIdEnCode?: string
  attachName?: string
}

export const API_SignFile = {
  signNormal: async (body: TypePayLoadSignFile) => {
    const payload = new FormData()
    payload.append('attachId', body.attachId?.toString())
    payload.append('objectType', body.objectType?.toString())
    payload.append('isMobile', true)
    return AppServices.api<TypeRespondSuccess<RespondSignFile>>({
      domain: DOMAIN.MAIN,
      url: `${END_POINT.SIGN_FILE.signNormal}`,
      methodCall: METHOD_CALL_API.POST,
      body: payload,
    })
  },
  signCaCloud: async (body: TypePayLoadSignFile) => {
    const payload = new FormData()
    payload.append('attachId', body.attachId?.toString())
    payload.append('objectType', body.objectType?.toString())
    payload.append('isMobile', true)
    return AppServices.api<TypeRespondSuccess<RespondSignFile>>({
      domain: DOMAIN.MAIN,
      url: `${END_POINT.SIGN_FILE.signCaCloud}`,
      methodCall: METHOD_CALL_API.POST,
      body: payload,
      timeoutInSeconds: 300,
    })
  },
  signSimCa: async (body: TypePayLoadSignFile) => {
    const payload = new FormData()
    payload.append('attachId', body.attachId?.toString())
    payload.append('objectType', body.objectType?.toString())
    payload.append('isMobile', true)
    return AppServices.api<TypeRespondSuccess<RespondSignFile>>({
      domain: DOMAIN.MAIN,
      url: `${END_POINT.SIGN_FILE.signSimCa}`,
      methodCall: METHOD_CALL_API.POST,
      body: payload,
      timeoutInSeconds: 300,
    })
  },
  signNormal_Credit: async ({
    attachId,
    objectType,
    isApply,
  }: {
    attachId: string
    objectType: string
    isApply: boolean
  }) => {
    const payload = new FormData()
    payload.append('attachId', attachId?.toString())
    payload.append('objectType', objectType?.toString())
    payload.append('isMobile', true)
    payload.append('apply', isApply)
    return AppServices.api<TypeRespondSuccess<RespondSignFile>>({
      domain: DOMAIN.MAIN,
      url: `${END_POINT.CREDIT.signNormal}`,
      methodCall: METHOD_CALL_API.POST,
      body: payload,
    })
  },
  signCaCloud_Credit: async ({
    attachId,
    objectType,
    isApply,
  }: {
    attachId: string
    objectType: string
    isApply: boolean
  }) => {
    const payload = new FormData()
    payload.append('attachId', attachId?.toString())
    payload.append('objectType', objectType?.toString())
    payload.append('isMobile', true)
    payload.append('apply', isApply)
    return AppServices.api<TypeRespondSuccess<RespondSignFile>>({
      domain: DOMAIN.MAIN,
      url: `${END_POINT.CREDIT.signCaCloud}`,
      methodCall: METHOD_CALL_API.POST,
      body: payload,
      timeoutInSeconds: 300,
    })
  },
  signSimCa_Credit: async ({
    attachId,
    objectType,
    isApply,
  }: {
    attachId: string
    objectType: string
    isApply: boolean
  }) => {
    const payload = new FormData()
    payload.append('attachId', attachId?.toString())
    payload.append('objectType', objectType?.toString())
    payload.append('isMobile', true)
    payload.append('apply', isApply)
    return AppServices.api<TypeRespondSuccess<RespondSignFile>>({
      domain: DOMAIN.MAIN,
      url: `${END_POINT.CREDIT.signSimCa}`,
      methodCall: METHOD_CALL_API.POST,
      body: payload,
      timeoutInSeconds: 300,
    })
  },
}
