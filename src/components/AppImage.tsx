import React from 'react'
import {Image, ImageProps} from 'react-native'

const AppImage = ({style, ...rest}: React.PropsWithChildren<ImageProps>) => {
  return <Image style={[{}, style]} {...rest} />
}
export default AppImage
