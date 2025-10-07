import React from 'react'
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableWithoutFeedback,
} from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard'
import utils from '~/utils'
import AppText from './AppText'

interface AppCopyableTextProps {
  content: string
  style?: StyleProp<TextStyle>
}

const AppCopyableText = ({content, style}: AppCopyableTextProps) => {
  const handleLongPress = () => {
    Clipboard.setString(content)
    utils.showMessageFlash({
      message: '📋 Đã sao chép',
      description: `"${content}" đã được lưu vào clipboard.`,
      type: 'success',
    })
  }

  return (
    <TouchableWithoutFeedback
      onLongPress={handleLongPress}
      style={styles.container}>
      <AppText style={[styles.text, style]}>{content}</AppText>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
  },
  text: {
    flex: 1,
  },
})

export default AppCopyableText
