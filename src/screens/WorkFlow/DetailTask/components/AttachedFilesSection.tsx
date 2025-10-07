import {StyleSheet, View} from 'react-native'
import React, {useEffect} from 'react'
import {useAppStyles, useDownloadFile} from '~/hooks'
import {scale} from '~/utils/scaleScreen'
import {Fontsfamily} from '~/styles/FontsFamily'
import AppText from '~/components/AppText'
import AppGroupFiles from '~/components/AppGroupFiles'
import CardFile from '~/screens/components/CardFile'
import CustomDashedLine from '~/screens/components/CustomDashedLine'
import utils from '~/utils'
import {Attach} from '~/services/apis/taskService'
import {SectionWrapper} from '~/screens/components'
import {Screens} from '~/screens/Screens'

const AttachedFilesSection = ({data = []}: {data: Attach[]}) => {
  const styles = Styles()

  const {
    isDownloading,
    downloadProgress,
    error,
    downloadedFileName,
    filePath,
    downloadFile,
  } = useDownloadFile()

  const onPressFile = (item: Attach) => {
    downloadFile({
      attachIdEncode: item?.attachId,
      fileName: item?.attachName,
      fileType: 'pdf',
    })
  }

  useEffect(() => {
    if (isDownloading) {
      utils.showLoadingFullApp({
        show: true,
        text: `${downloadProgress}%`,
      })
    } else if (filePath && downloadedFileName) {
      utils.showLoadingFullApp({show: false})
      utils.navigate(Screens.name.FileViewerScreen, {
        filePath,
        fileName: downloadedFileName,
      })
    } else if (error) {
      utils.showLoadingFullApp({show: false})
      utils.showMessageFlash({
        description: error,
        type: 'warning',
      })
    } else {
      utils.showLoadingFullApp({show: false})
    }
  }, [isDownloading, downloadProgress, filePath, downloadedFileName])

  const relatedFiles = data.filter(f => f.objectType === 7) // → Tệp liên quan
  const reportFiles = data.filter(f => f.objectType === 8) // → Tệp báo cáo

  return (
    <SectionWrapper>
      <View style={styles.title_container}>
        <AppText style={styles.title_section}>Tệp đính kèm</AppText>
      </View>
      <View style={styles.item_container}>
        <AppGroupFiles
          title="Tệp báo cáo"
          onPressGroup={utils.onChangeLayoutAnimation}>
          <View>
            {reportFiles.length === 0 && (
              <View style={styles.emptyTextBlock}>
                <AppText>Không có dữ liệu</AppText>
              </View>
            )}
            {reportFiles.map((item, index) => (
              <View key={`File_Khac_${index}`}>
                <CardFile
                  signedName={utils.safeValue(item?.createName)}
                  nameFile={utils.safeValue(item?.attachName)}
                  onPress={() => {
                    onPressFile(item)
                  }}
                />
                {index !== reportFiles?.length - 1 && <CustomDashedLine />}
              </View>
            ))}
          </View>
        </AppGroupFiles>
        <AppGroupFiles
          title="Têp liên quan"
          onPressGroup={utils.onChangeLayoutAnimation}>
          <View>
            {relatedFiles.length === 0 && (
              <View style={styles.emptyTextBlock}>
                <AppText>Không có dữ liệu</AppText>
              </View>
            )}
            {relatedFiles.map((item, index) => (
              <View key={`File_Khac_${index}`}>
                <CardFile
                  signedName={utils.safeValue(item?.createName)}
                  nameFile={utils.safeValue(item?.attachName)}
                  onPress={() => {
                    onPressFile(item)
                  }}
                />
                {index !== relatedFiles?.length - 1 && <CustomDashedLine />}
              </View>
            ))}
          </View>
        </AppGroupFiles>
      </View>
    </SectionWrapper>
  )
}

export default AttachedFilesSection

const Styles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    item_container: {
      padding: scale(10),
      gap: scale(10),
      backgroundColor: colors.white,
      borderRadius: scale(10),
    },
    title_section: {
      fontSize: scale(16),
      color: colors.primary,
      fontFamily: Fontsfamily.OpenSans.Bold,
    },
    title_container: {
      paddingLeft: scale(4),
      borderLeftWidth: scale(2),
      borderColor: colors.bookmark,
    },
    title_item: {
      fontSize: scale(16),
      fontFamily: Fontsfamily.Nunito.Bold,
    },
    emptyTextBlock: {
      paddingVertical: scale(10),
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
}
