import React from 'react'
import {Text, TextProps} from 'react-native'
import {useAppStyles} from '~/hooks'
import {FONTSFAMILY} from '~/styles/FontsFamily'

const AppText = ({
  children,
  style,
  ...rest
}: React.PropsWithChildren<TextProps>) => {
  const {THEME} = useAppStyles()
  return (
    <Text
      allowFontScaling={false}
      style={[
        {
          color: THEME.colors.text.primary,
          fontSize: THEME.sizes.h5,
          fontFamily: FONTSFAMILY.NunitoRegular,
        },
        style,
      ]}
      {...rest}>
      {children}
    </Text>
  )
}
export default AppText
