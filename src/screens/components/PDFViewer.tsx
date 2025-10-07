import React, {useState} from 'react'
import {ActivityIndicator, StyleSheet} from 'react-native'
import {MessageOptions} from 'react-native-flash-message'
import Pdf from 'react-native-pdf'
import AppViewBody from '~/components/AppViewBody'
import {useAppStyles} from '~/hooks'
import {AppTheme} from '~/styles/Theme'
import utils from '~/utils'
import {scale} from '~/utils/scaleScreen'

type PDFViewerProps = {
  sourceUri: string
  cache: boolean
  styleContainer?: StyleSheet
  styleErrorText?: StyleSheet
  getFilePath?: (filePath: string) => void
}

type PDF_FileInfo = {
  numberOfPages: number
  filePath: string
}

const PDFViewer: React.FC<PDFViewerProps> = ({
  sourceUri = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  cache = true,
  styleContainer,
  getFilePath = () => {},
}) => {
  const {THEME} = useAppStyles()
  const styles = PDFViewerStyles(THEME)
  const isValidUri = uriChecker(sourceUri)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fileInfo, setFileInfo] = useState<PDF_FileInfo>({
    numberOfPages: 0,
    filePath: '',
  })

  React.useEffect(() => {
    utils.log('PDF Source URI', sourceUri)
  }, [sourceUri])

  if (!isValidUri) {
    const options: MessageOptions = {
      description: 'Đường dẫn không hợp lệ',
      type: 'danger',
    }
    utils.showMessageFlash(options)
    return null
  }

  return (
    <AppViewBody style={[styles.container, styleContainer]}>
      <Pdf
        source={{uri: sourceUri, cache: cache}}
        onLoadComplete={(numberOfPages, filePath) => {
          utils.log('PDF Loaded', {numberOfPages, filePath})
          setFileInfo({numberOfPages: numberOfPages, filePath: filePath})
          getFilePath(filePath)
        }}
        onPageChanged={(page, numberOfPages) => {
          utils.log('Page Changed', {page, numberOfPages})
        }}
        onError={error => {
          utils.log('PDF Error', error)
        }}
        onPressLink={uri => {
          utils.log('Link Pressed', uri)
        }}
        style={styles.pdf}
        renderActivityIndicator={() => (
          <ActivityIndicator size="large" color={THEME.colors.primary} />
        )}
      />
    </AppViewBody>
  )
}

export default PDFViewer

const uriChecker = (uri: string): string => {
  if (typeof uri !== 'string') {
    utils.log('Invalid URI', uri)
    return 'Invalid URI'
  }

  const lower = uri.toLowerCase()

  let description = 'Invalid URI'

  if (lower.startsWith('http://') || lower.startsWith('https://')) {
    description = 'Internet URL'
  } else if (lower.startsWith('file://')) {
    description = 'Local file'
  } else if (lower.startsWith('/')) {
    description = 'Local absolute file'
  } else if (lower.startsWith('bundle-assets://')) {
    description = 'Bundle asset'
  } else if (lower.startsWith('content://')) {
    description = 'Content URI'
  } else if (lower.startsWith('data:application/pdf;base64,')) {
    description = 'Base64'
  }

  utils.log('URI Type', description)
  return description
}

const PDFViewerStyles = (theme: AppTheme) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {colors, fonts, sizes} = theme
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: scale(8),
    },
    pdf: {
      flex: 1,
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
}
