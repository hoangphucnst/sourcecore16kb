import React from 'react'
import {LayoutAnimation} from 'react-native'
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {useDebounce} from '~/hooks'

type AppScrollViewBodyProps = KeyboardAwareScrollViewProps & {
  // Define any additional props if needed
  horizontalInit?: 0 | number
}

const AppScrollViewBody = ({
  children,
  horizontalInit = 0,
  contentContainerStyle,
  ...rest
}: React.PropsWithChildren<AppScrollViewBodyProps>) => {
  const insets: EdgeInsets = useDebounce(useSafeAreaInsets(), 20)
  React.useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }, [insets])
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[
        {
          paddingLeft: insets.left + horizontalInit,
          paddingRight: insets.right + horizontalInit,
        },
        contentContainerStyle,
      ]}
      {...rest}>
      {children}
    </KeyboardAwareScrollView>
  )
}
export default AppScrollViewBody
