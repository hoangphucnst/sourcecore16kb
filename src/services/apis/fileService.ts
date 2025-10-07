import {OBJECT_TYPE} from '~/constants'
import {METHOD_CALL_API} from '.'
import AppServices from '../AppServices'
import {DOMAIN, END_POINT} from './endpoints'

export interface API_Response<T> {
  object: T
  message: string
  status: number
}

export interface AttachmentDetail {
  attachId: number
  attachName: string
  attachPath: string
  objectId: number
  objectType: number
  isActive: number
  creatorId: number
  dateCreate: string
  attachType: number
  savePath: string
  isAutoGen: number
  size: any
  contentType: any
  attachPdfPath?: string
  signers: any
  attachIdEncode: string
}

export type ObjectType = (typeof OBJECT_TYPE)[keyof typeof OBJECT_TYPE]

const getFiles = async ({
  objectId,
  objectType,
}: {
  objectId: string
  objectType: ObjectType
}) => {
  const params = new URLSearchParams()

  params.append('objectId', objectId.toString())
  params.append('objectType', objectType.toString())

  return AppServices.api<API_Response<AttachmentDetail[]>>({
    url: `${END_POINT.FILE.getFiles}?${params.toString()}`,
    methodCall: METHOD_CALL_API.GET,
    domain: DOMAIN.MAIN,
  })
}
export const FileService = {
  getFiles,
}
