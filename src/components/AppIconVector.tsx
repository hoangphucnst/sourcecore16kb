import * as React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
// import FontAwesome5_Brands from 'react-native-vector-icons/FontAwesome5_Brands';
import FontAwesome5, {
  FontAwesome5IconProps,
} from 'react-native-vector-icons/FontAwesome5'
import Foundation from 'react-native-vector-icons/Foundation'
import Ion from 'react-native-vector-icons/Ionicons'
import Material from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLine from 'react-native-vector-icons/SimpleLineIcons'
import Oct from 'react-native-vector-icons/Octicons'
import Zocial from 'react-native-vector-icons/Zocial'
import Fontisto from 'react-native-vector-icons/Fontisto'
import {IconProps} from 'react-native-vector-icons/Icon'
import {useAppStyles} from '~/hooks'

export const AntDesignIcon = (props: IconProps) => {
  const {THEME} = useAppStyles()
  return <AntDesign size={THEME.sizes.icon_24} {...props} />
}

export const EntypoIcon = (props: IconProps) => {
  const {THEME} = useAppStyles()
  return <Entypo size={THEME.sizes.icon_24} {...props} />
}

export const EvilIconsIcon = (props: IconProps) => {
  const {THEME} = useAppStyles()
  return <EvilIcons size={THEME.sizes.icon_24} {...props} />
}

export const FeatherIcon = (props: IconProps) => {
  const {THEME} = useAppStyles()
  return <Feather size={THEME.sizes.icon_24} {...props} />
}

export const FontAwesomeIcon = (props: IconProps) => {
  const {THEME} = useAppStyles()
  return <FontAwesome size={THEME.sizes.icon_24} {...props} />
}

export const FoundationIcon = (props: IconProps) => {
  const {THEME} = useAppStyles()
  return <Foundation size={THEME.sizes.icon_24} {...props} />
}

export const Ionicons = (props: IconProps) => {
  const {THEME} = useAppStyles()
  return <Ion size={THEME.sizes.icon_24} {...props} />
}

export const MaterialIcon = (props: IconProps) => {
  const {THEME} = useAppStyles()
  return <Material size={THEME.sizes.icon_24} {...props} />
}

export const MaterialCommunityIcons = (props: IconProps) => {
  const {THEME} = useAppStyles()
  return <MaterialCommunity size={THEME.sizes.icon_24} {...props} />
}

export const SimpleLineIcons = (props: IconProps) => {
  const {THEME} = useAppStyles()
  return <SimpleLine size={THEME.sizes.icon_24} {...props} />
}

export const OctIcons = (props: IconProps) => {
  const {THEME} = useAppStyles()
  return <Oct size={THEME.sizes.icon_24} {...props} />
}

export const ZocialIcon = (props: IconProps) => {
  const {THEME} = useAppStyles()
  return <Zocial size={THEME.sizes.icon_24} {...props} />
}

export const FontistoIcon = (props: IconProps) => {
  const {THEME} = useAppStyles()
  return <Fontisto size={THEME.sizes.icon_24} {...props} />
}

export const FontAwesome5Icon = (props: FontAwesome5IconProps) => {
  const {THEME} = useAppStyles()
  return <FontAwesome5 size={THEME.sizes.icon_24} {...props} />
}

export default {
  AntDesignIcon,
  FontAwesome5Icon,
  EntypoIcon,
  EvilIconsIcon,
  FeatherIcon,
  FontAwesomeIcon,
  FoundationIcon,
  Ionicons,
  MaterialIcon,
  MaterialCommunityIcons,
  SimpleLineIcons,
  OctIcons,
  ZocialIcon,
  FontistoIcon,
}
