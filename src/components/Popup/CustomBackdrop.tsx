import React from 'react'
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet'
import {StyleSheet} from 'react-native'

const CustomBackdrop = (props: BottomSheetBackdropProps) => {
  return (
    <BottomSheetBackdrop
      {...props}
      opacity={0.5}
      enableTouchThrough={false}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      style={[
        props.style,
        StyleSheet.absoluteFillObject,
        styles.back_drops_bt_sheet,
      ]}
    />
  )
}

export default CustomBackdrop

const styles = StyleSheet.create({
  back_drops_bt_sheet: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
})
