import {useCallback, useState} from 'react'
import RNFS, {DownloadFileOptions} from 'react-native-fs'
import {Platform} from 'react-native'
import {DOMAIN, END_POINT} from '~/services/apis/endpoints'
import utils from '~/utils'
import useAuth from '~/redux/reduxHooks/useAuth'
import {MODE_DOWNLOAD_FILE} from '~/constants'

interface DownloadFile {
  attachIdEncode: string
  fileName?: string
  fileType?: string
}

export const removeFileExtension = (fileName: string): string => {
  if (!fileName) return ''
  const lastDotIndex = fileName.lastIndexOf('.')
  if (lastDotIndex === -1) return fileName // Không có dấu chấm
  return fileName.substring(0, lastDotIndex)
}

const useDownloadFile = () => {
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)
  const [filePath, setFilePath] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const {dataLogin} = useAuth()
  const [downloadedFileName, setDownloadedFileName] = useState<string | null>(
    null,
  )

  const downloadFile = useCallback(
    async ({
      attachIdEncode,
      fileName = 'file',
      fileType = 'pdf',
    }: DownloadFile) => {
      const params = new URLSearchParams()

      params.append('attachIdEncode', attachIdEncode.toString())
      params.append('mode', MODE_DOWNLOAD_FILE.VIEW)

      const url = `${DOMAIN.MAIN}${END_POINT.FILE.downloadFile}?${params.toString()}`

      utils.log('↘️ useDownloadFile', {
        url: url,
      })

      const removedExt_fileName = removeFileExtension(fileName)

      try {
        setIsDownloading(true)
        setDownloadProgress(0)
        setError(null)
        setFilePath(null)

        const ext = fileType.startsWith('.') ? fileType : `.${fileType}`

        // Chỉnh sửa path download của ios và android
        const downloadDest =
          Platform.OS === 'ios'
            ? `${RNFS.DocumentDirectoryPath}/${removedExt_fileName}${ext}`
            : `${RNFS.DocumentDirectoryPath}/${removedExt_fileName}${ext}`

        const options: DownloadFileOptions = {
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'vi',
            Authorization: `Bearer ${dataLogin?.token}`,
          },
          progressInterval: 500,
          progressDivider: 1,
          fromUrl: url,
          toFile: downloadDest,
          progress: (res: RNFS.DownloadProgressCallbackResult) => {
            const percent = Math.floor(
              (res.bytesWritten / res.contentLength) * 100,
            )
            setDownloadProgress(percent)
            utils.log('↘️ useDownloadFile', {
              downloadProgress: `${percent}%`,
            })
          },
          progressDivider: 10, // update mỗi 10%
        }

        const task = RNFS.downloadFile(options)

        const result = await task.promise

        setDownloadProgress(100)
        setIsDownloading(false)

        if (result?.bytesWritten > 0 && result?.statusCode === 200) {
          setFilePath(downloadDest)
          setDownloadedFileName(`${removedExt_fileName}${ext}`)
        } else {
          if (result.statusCode === 200) {
            throw new Error(`File này hiện không có sẵn trên hệ thống.`)
          } else {
            throw new Error(
              `Tải nội dung không thành công. Mã lỗi ${result.statusCode}`,
            )
          }
        }
      } catch (err: any) {
        setError(err?.message || 'Tải nội dung không thành công')
        setIsDownloading(false)
      }
    },
    [],
  )

  const getUrlCustomerSignImage = ({id}: {id: string}) => {
    console.log(
      '[Customer] sign image',
      `${DOMAIN.MAIN}${END_POINT.CUSTOMER.getSignImage}?id=${id}`,
    )
    return `${DOMAIN.MAIN}${END_POINT.CUSTOMER.getSignImage}?id=${id}`
  }

  const getUrlImageAvatarMsg = ({userId}: {userId: string}) => {
    console.log(
      '[User] Avatar image',
      `${DOMAIN.MAIN}${END_POINT.AUTH.viewAvatarUser}?image=${userId}`,
    )
    return `${DOMAIN.MAIN}${END_POINT.AUTH.viewAvatarUser}?image=${userId}`
  }

  return {
    isDownloading,
    downloadProgress,
    filePath,
    error,
    downloadedFileName,
    downloadFile,
    getUrlCustomerSignImage,
    getUrlImageAvatarMsg,
  }
}

export default useDownloadFile
