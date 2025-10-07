import React from 'react'
import {View} from 'react-native'
import {useAppStyles} from '~/hooks'
import {scale} from '~/utils/scaleScreen'

const Seperator = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return (
    <View
      style={{
        marginTop: scale(16),
        height: scale(1),
        backgroundColor: colors.background,
        borderRadius: scale(1),
      }}
    />
  )
}
export default Seperator
