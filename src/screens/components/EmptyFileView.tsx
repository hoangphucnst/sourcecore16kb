import {StyleSheet, View} from 'react-native'
import React from 'react'
import AppText from '~/components/AppText'
import {scale} from '~/utils/scaleScreen'

const EmptyFileView = () => {
  return (
    <View style={styles.container_empty_text}>
      <AppText>Không có dữ liệu</AppText>
    </View>
  )
}

export default EmptyFileView

const styles = StyleSheet.create({
  container_empty_text: {
    alignItems: 'center',
    paddingVertical: scale(8),
  },
})
