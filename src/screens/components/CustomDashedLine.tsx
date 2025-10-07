import Svg, {Line} from 'react-native-svg'
import React from 'react'
import {useAppStyles} from '~/hooks'

const CustomDashedLine = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return (
    <Svg height="1" width="100%">
      <Line
        x1="0"
        y1="0"
        x2="100%"
        y2="0"
        stroke={colors.border}
        strokeWidth="2"
        strokeDasharray="6, 2" // 4: dash length, 2: gap
      />
    </Svg>
  )
}

export default CustomDashedLine
