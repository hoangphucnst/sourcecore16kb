import React from 'react'
import {View, LayoutAnimation, ViewProps} from 'react-native'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {useDebounce} from '~/hooks'

type AppViewProps = ViewProps & {
  // Define any additional props if needed
  horizontalInit?: 0 | number
}

const AppViewBody = ({
  children,
  horizontalInit = 0,
  style,
  ...rest
}: React.PropsWithChildren<AppViewProps>) => {
  const insets: EdgeInsets = useDebounce(useSafeAreaInsets(), 20)
  React.useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }, [insets])
  return (
    <View
      style={[
        {
          paddingLeft: insets.left + horizontalInit,
          paddingRight: insets.right + horizontalInit,
        },
        style,
      ]}
      {...rest}>
      {children}
    </View>
  )
}
export default AppViewBody
