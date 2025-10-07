import {StyleSheet, View} from 'react-native'
import React from 'react'
import AppText from '~/components/AppText'
import utils from '~/utils'
import {scale} from '~/utils/scaleScreen'
import HeaderWithBack from '../components/HeaderWithBack'
import {PDFViewer} from '../components'
import {useAppStyles} from '~/hooks'

const FileViewerScreen = props => {
  const key_params = ['filePath', 'fileName']
  const default_params = {
    filePath: '',
    fileName: '',
  }
  const {filePath, fileName} = utils.ngetParams(
    props,
    key_params,
    default_params,
  )

  utils.log('FileViewerScreen', {
    filePath: filePath,
    fileName: fileName,
  })

  const styles = Styles()
  return (
    <View style={styles.container}>
      <HeaderWithBack title={fileName} />
      <View style={styles.container_pdf}>
        {filePath?.length <= 0 ? (
          <View>
            <AppText>Không có dữ liệu</AppText>
          </View>
        ) : (
          <PDFViewer sourceUri={filePath} />
        )}
      </View>
    </View>
  )
}

export default FileViewerScreen

const Styles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.app.background,
    },
    container_pdf: {
      paddingHorizontal: scale(8),
      flex: 1,
    },
  })
}
