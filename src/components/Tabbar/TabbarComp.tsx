import {BottomTabBarProps} from '@react-navigation/bottom-tabs'
import React, {useEffect, useState} from 'react'
import {
  Keyboard,
  LayoutAnimation,
  Platform,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import {Icons} from '~/assets'
import AppIconVector from '~/components/AppIconVector'
import AppText from '~/components/AppText'
import AppViewBody from '~/components/AppViewBody'
import {useAppStyles, useDebounce, useTabSelectorAnimation} from '~/hooks'
import {Screens} from '~/screens/Screens'
import {scale, scaleFont} from '~/utils/scaleScreen'
import {Fontsfamily} from '~/styles/FontsFamily'
import {USER_PERMISSION} from '~/constants'
import utils from '~/utils'
import {useAuth, useTheme} from '~/redux/reduxHooks'

export type TypeItemMenuTabbar = {
  name: string
  screen?: string
  nameIconFocused?: string
  nameIcon?: string
  rule?: number
  imgIcon?: any
  imgIconSolid?: any
  useImageIcon?: boolean | false
  tabCode?: number
  tabIndex?: number
}

const MenuTab: Array<TypeItemMenuTabbar> = [
  {
    name: 'Trang chủ',
    nameIcon: 'home',
    screen: Screens.name.HomeScreen,
    imgIcon: Icons.icHome,
    imgIconSolid: Icons.icHomeSolid,
    useImageIcon: true,
    tabCode: USER_PERMISSION.SCREEN.ALWAYS_SHOW,
    tabIndex: 0,
  },
  {
    name: 'Khách hàng',
    nameIcon: 'extension-puzzle',
    screen: Screens.name.Customers,
    imgIcon: Icons.icClient,
    imgIconSolid: Icons.icClientSolid,
    useImageIcon: true,
    tabCode: USER_PERMISSION.SCREEN.CUSTOMER,
    tabIndex: 1,
  },
  {
    name: 'Thế chấp',
    nameIcon: 'person-circle',
    screen: Screens.name.Mortgage,
    imgIcon: Icons.icMortgage,
    imgIconSolid: Icons.icMortgageSolid,
    useImageIcon: true,
    tabCode: USER_PERMISSION.SCREEN.MORTGAGE,
    tabIndex: 2,
  },
  {
    name: 'Tín dụng',
    nameIcon: 'person-circle',
    screen: Screens.name.Credit,
    imgIcon: Icons.icCredit,
    imgIconSolid: Icons.icCreditSolid,
    useImageIcon: true,
    tabCode: USER_PERMISSION.SCREEN.CREDIT,
    tabIndex: 3,
  },
  {
    name: 'Công việc',
    nameIcon: 'person-circle',
    screen: Screens.name.WorkFlow,
    imgIcon: Icons.icWork,
    imgIconSolid: Icons.icWorkSolid,
    useImageIcon: true,
    tabCode: USER_PERMISSION.SCREEN.ALWAYS_SHOW,
    tabIndex: 4,
  },
]

const TabbarComp: React.FC<BottomTabBarProps> = ({props}) => {
  const insets: EdgeInsets = useDebounce(useSafeAreaInsets(), 20)
  const {THEME} = useAppStyles()
  const {infoScreen} = useTheme()
  const screenWidth = infoScreen.width
  const [showTab, setShowTab] = useState(true)

  const {roleInfo} = useAuth()
  const allowed_roles = utils.formatPermission(roleInfo?.permissions)
  const allowedMenuTabs = MenuTab.filter(tab => {
    if (tab.tabCode === USER_PERMISSION.SCREEN.ALWAYS_SHOW) {
      return true
    }
    if (!tab.tabCode) {
      return false
    }
    return allowed_roles?.includes(tab.tabCode)
  })

  const tabWidth = (screenWidth - 30) / allowedMenuTabs.length
  const styles = useTabStyles(tabWidth)

  const {selectorStyle, onTabChange} = useTabSelectorAnimation(tabWidth)
  const scaleImage = useSharedValue(1)

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }, [insets])

  useEffect(() => {
    onTabChange(props.state.index)

    if (Platform.OS === 'android') {
      const showSub = Keyboard.addListener('keyboardDidShow', () =>
        setShowTab(false),
      )
      const hideSub = Keyboard.addListener('keyboardDidHide', () =>
        setShowTab(true),
      )
      return () => {
        showSub.remove()
        hideSub.remove()
      }
    }
  }, [infoScreen.isLandscape])

  const triggerPulse = () => {
    scaleImage.value = withSequence(
      withTiming(1.15, {duration: 120}),
      withTiming(0.95, {duration: 120}),
      withTiming(1, {duration: 250}),
    )
  }

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scaleImage.value}],
  }))

  const renderMenuTabbar = (tab: TypeItemMenuTabbar, index: number) => {
    const isFocused = props.state.index === tab?.tabIndex || 0
    return (
      <TouchableHighlight
        underlayColor={THEME.colors.table.background}
        onPress={() => {
          triggerPulse()
          onTabChange(index)
          console.log('Pressing', tab.screen)
          props.navigation.navigate(tab.screen || '', {needRefresh: true})
        }}
        key={tab.name + index}
        style={styles.tab_menu}
        activeOpacity={0.8}>
        <View style={styles.content_tab}>
          {tab.useImageIcon ? (
            <Animated.Image
              source={isFocused ? tab.imgIconSolid : tab.imgIcon}
              style={[
                isFocused && animatedStyle,
                {width: scale(24), height: scale(24)},
              ]}
              resizeMode="contain"
              tintColor={
                isFocused
                  ? THEME.colors.bottomNavigator.ic_active
                  : THEME.colors.bottomNavigator.ic_disable
              }
            />
          ) : (
            <AppIconVector.Ionicons
              name={tab.nameIcon || ''}
              size={THEME.sizes.icon_24}
              color={
                isFocused
                  ? THEME.colors.bottomNavigator.ic_active
                  : THEME.colors.bottomNavigator.ic_disable
              }
            />
          )}
          <AppText
            style={{
              fontSize: scaleFont(11),
              fontFamily: Fontsfamily.Nunito.Medium,
              color: isFocused
                ? THEME.colors.bottomNavigator.ic_active
                : THEME.colors.bottomNavigator.ic_disable,
              marginTop: scale(8),
            }}>
            {tab.name}
          </AppText>
        </View>
      </TouchableHighlight>
    )
  }

  if (!showTab) return null

  return (
    <AppViewBody
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom / 2,
        },
      ]}>
      {/* Tab items */}
      <View style={[styles.container_tabs]}>
        {allowedMenuTabs.map(renderMenuTabbar)}
      </View>
      {/* Selector moving bar selectorStyle */}
      <Animated.View style={[styles.selector, selectorStyle]} />
    </AppViewBody>
  )
}

export default TabbarComp

const useTabStyles = (tabWidth: number) => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    container: {
      paddingTop: scale(2),
      backgroundColor: colors.white,
      borderTopWidth: 0.5,
      borderColor: THEME.colors.border,
    },
    container_tabs: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      backgroundColor: colors.white,
      paddingHorizontal: scale(15),
    },
    tab_menu: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      paddingTop: scale(12),
      paddingBottom: scale(8),
    },
    selector: {
      position: 'absolute',
      top: 0,
      left: 15,
      height: 2.5,
      width: tabWidth,
      backgroundColor: colors.primary,
      borderBottomLeftRadius: 2,
      borderBottomRightRadius: 2,
    },
    content_tab: {
      alignItems: 'center',
    },
  })
}
