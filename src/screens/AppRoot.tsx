import {BottomSheetModalProvider} from '@gorhom/bottom-sheet'
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import {
  Platform,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
} from 'react-native'
import RNBootSplash from 'react-native-bootsplash'
import FlashMessage from 'react-native-flash-message'
import {GestureHandlerRootView} from 'react-native-gesture-handler'

import Orientation from 'react-native-orientation-locker'
import Components from '~/components'
import {useAppStyles} from '~/hooks'
import utils from '~/utils'
import SlideScreen from './Home/components/SlideScreen'
import ChoiseDate from '../components/Popup/ChoiseDate'
import {Screens} from './Screens'
import TabbarComp from '~/components/Tabbar/TabbarComp'
import {scale} from '~/utils/scaleScreen'
import {useAuth, useTheme} from '~/redux/reduxHooks'
import {WrapperNetworkStatusWarning} from '~/hoc'

// ⚙️ Utilities
const checkDeviceType = ({width, height}: {width: number; height: number}) => {
  const isTablet = width >= 600
  const isMobile = !isTablet
  const isLandscape = width > height

  const deviceType = isTablet ? 'Tablet' : 'Mobile'
  utils.log(FILE_NAME, `Device is a ${deviceType}`)

  if (isMobile && !isLandscape) {
    Orientation.lockToPortrait()
  } else if (isTablet) {
    Orientation.unlockAllOrientations()
  }
}

// ⚙️ Constants
const FILE_NAME = 'AppRoot'
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const TabbarCustom = (props: BottomTabBarProps) => <TabbarComp props={props} />

const TabMain = () => {
  return (
    <Tab.Navigator
      initialRouteName={Screens.name.HomeScreen}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={TabbarCustom}>
      <Tab.Screen
        name={Screens.name.HomeScreen}
        component={Screens.components.HomeScreen}
      />
      <Tab.Screen
        name={Screens.name.Customers}
        component={Screens.components.Customers}
      />
      <Tab.Screen
        name={Screens.name.Mortgage}
        component={Screens.components.MortgageScreen}
      />
      <Tab.Screen
        name={Screens.name.Credit}
        component={Screens.components.CreditScreen}
      />
      <Tab.Screen
        name={Screens.name.WorkFlow}
        component={Screens.components.WorkFlowScreen}
      />
    </Tab.Navigator>
  )
}

const AppRoot = () => {
  const {dark, THEME} = useAppStyles()
  // const {colors} = THEME
  const {isLogin, status} = useAuth()
  React.useEffect(() => {
    utils.log(
      FILE_NAME,
      isLogin ? `🟢 User is loged in` : `🔴 | User is not loged in`,
    )
  }, [])
  const {changeInfoScreen} = useTheme()
  const routeNameRef = React.useRef<string>()
  const screenData = useWindowDimensions()
  const {width, height} = screenData
  React.useEffect(() => {
    //Kiểm tra tablet
    checkDeviceType({width: width, height: height})

    changeInfoScreen({
      ...screenData,
      isLandscape: screenData.width > screenData.height,
    })

    return () => {
      // Mở khóa tất cả các chế độ khi component bị unmount
      Orientation.unlockAllOrientations()
    }
  }, [screenData])

  React.useEffect(() => {
    if (status === 'pending') {
      utils.showLoadingFullApp({show: true})
    } else {
      utils.showLoadingFullApp({show: false})
    }
  }, [status])

  const onHandlerReadyNavigation = () => {
    utils.log(
      'ON READY NAVIGATOR',
      '⚡️⚡️⚡️ ON READY NAVIGATOR & HIDE BOOT FLASH ⚡️⚡️⚡️',
    )
    RNBootSplash.hide()
    StatusBar.setBarStyle(dark ? 'light-content' : 'dark-content')
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent')
      StatusBar.setTranslucent(true)
      StatusBar.setBarStyle('light-content')
    }
  }

  return (
    <GestureHandlerRootView style={styles.container_root_view}>
      <BottomSheetModalProvider>
        <NavigationContainer
          ref={utils._navigator}
          theme={THEME}
          mode={'modal'}
          onReady={onHandlerReadyNavigation}
          onStateChange={() => {
            // const previousRouteName = routeNameRef.current
            const currentRouteName =
              utils._navigator?.current?.getCurrentRoute()?.name
            routeNameRef.current = currentRouteName

            utils.log(FILE_NAME, `CURRENT SCREEN -> ${currentRouteName}`)
          }}>
          {/* Add More Screen Here */}
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              presentation: 'card',
            }}
            initialRouteName={Screens.name.Login}>
            <Stack.Group
              navigationKey={!isLogin ? Screens.name.Login : Screens.name.Tabs}
              screenOptions={{
                headerShown: false,
                presentation: 'containedTransparentModal',
              }}>
              <Stack.Group
                screenOptions={{
                  presentation: 'card',
                  headerShown: false,
                }}>
                {/* Tab screens */}
                <Stack.Screen name={Screens.name.Tabs} component={TabMain} />
                {/* Add More Screen Here */}
                <Stack.Screen
                  name={Screens.name.Login}
                  component={Screens.components.Login}
                />
                <Stack.Screen
                  name={Screens.name.DetailsCutomer}
                  component={Screens.components.DetailsCutomer}
                />
                <Stack.Screen
                  name={Screens.name.Settings}
                  component={Screens.components.SettingsScreen}
                />
                <Stack.Screen
                  name={Screens.name.MortgageContractDetails}
                  component={Screens.components.MortgageContractDetails}
                />
                <Stack.Screen
                  name={Screens.name.Notification}
                  component={Screens.components.NotificationScreen}
                />
                <Stack.Screen
                  name={Screens.name.DetailCredit}
                  component={Screens.components.DetailCreditScreen}
                />
                <Stack.Screen
                  name={Screens.name.DetailTask}
                  component={Screens.components.DetailTaskScreen}
                />
                <Stack.Screen
                  name={Screens.name.CreditResolved}
                  component={Screens.components.CreditResolved}
                />
              </Stack.Group>
            </Stack.Group>
            {/* Add More Modal Screen Here */}
            <Stack.Group
              screenOptions={{
                headerShown: false,
                presentation: 'containedTransparentModal',
                animation: 'slide_from_right',
              }}>
              <Stack.Screen
                name={Screens.name.Modal_SendFeedback}
                component={Screens.components.SendFeedbackScreen}
              />
              <Stack.Screen
                name={Screens.name.Modal_SubmitReview}
                component={Screens.components.SubmitReviewScreen}
              />
              <Stack.Screen
                name={Screens.name.Modal_UpdateTask}
                component={Screens.components.UpdateTaskScreen}
              />
              <Stack.Screen
                name={Screens.name.Modal_TrackingTasks}
                component={Screens.components.TrackingTasksScreen}
              />
              <Stack.Screen
                name={Screens.name.Modal_TaskEvaluation}
                component={Screens.components.TaskEvaluationScreen}
              />
              <Stack.Screen
                name={Screens.name.Modal_RejectTask}
                component={Screens.components.RejectTaskScreen}
              />
              <Stack.Screen
                name={Screens.name.Modal_ApproveTask}
                component={Screens.components.ApproveTaskScreen}
              />
              <Stack.Screen
                name={Screens.name.Modal_EvaluateTask}
                component={Screens.components.Modal_EvaluateTask}
              />
              <Stack.Screen
                name={Screens.name.Modal_Credit_TrackingTasks}
                component={Screens.components.Modal_Credit_TrackingTask}
              />
              <Stack.Screen
                name={Screens.name.Modal_Credit_RejectContract}
                component={Screens.components.Modal_Credit_RejectContract}
              />
              <Stack.Screen
                name={Screens.name.Modal_Credit_UpdateGroupLoan}
                component={Screens.components.Modal_Credit_UpdateGroupLoan}
              />
              <Stack.Screen
                name={Screens.name.Modal_Credit_ReturnToInitiator}
                component={Screens.components.Modal_Credit_ReturnToInitiator}
              />
              <Stack.Screen
                name={Screens.name.FileViewerScreen}
                component={Screens.components.FileViewerScreen}
              />
            </Stack.Group>
            {/* Add More Modal Component Here */}
            <Stack.Group
              screenOptions={{
                headerShown: false,
                presentation: 'containedTransparentModal',
                animation: 'fade_from_bottom',
              }}>
              <Stack.Screen
                name={Screens.name.Modal_ChooseRole}
                component={Screens.components.Modal_ChooseRole}
              />
              <Stack.Screen
                name={Screens.name.Modal_DetailUserInfo}
                component={Screens.components.Modal_DetailUserInfo}
              />
              <Stack.Screen
                name={Screens.name.Modal_Filter_Customers}
                component={Screens.components.Modal_Filter_Customers}
              />
              <Stack.Screen
                name={Screens.name.Modal_DatePicker}
                component={Screens.components.Modal_DatePicker}
              />
              <Stack.Screen
                name={Screens.name.Modal_DropdownPicker}
                component={Screens.components.Modal_DropdownPicker}
              />
              <Stack.Screen
                name={Screens.name.Modal_Filter_Loan}
                component={Screens.components.Modal_Filter_Loan}
              />
              <Stack.Screen
                name={Screens.name.Modal_CollateralAssetDetails}
                component={Screens.components.Modal_CollateralAssetDetails}
              />
              <Stack.Screen
                name={Screens.name.Modal_CreditFilter}
                component={Screens.components.Modal_CreditFilter}
              />
              <Stack.Screen
                name={Screens.name.Modal_ChangeBackground}
                component={Screens.components.ChangeBackground}
              />
              <Stack.Screen
                name={Screens.name.Modal_YearPicker}
                component={Screens.components.Modal_YearPicker}
              />
              <Stack.Screen
                name={Screens.name.Modal_TaskFilter}
                component={Screens.components.Modal_TaskFilter}
              />
              <Stack.Screen
                name={Screens.name.Modal_OptionSign}
                component={Screens.components.Modal_OptionSign}
              />
              <Stack.Screen
                name={Screens.name.Modal_Credit_OptionSign}
                component={Screens.components.Modal_Credit_OptionSign}
              />
              <Stack.Screen
                name={Screens.name.Modal_AuthOTP}
                component={Screens.components.Modal_AuthOTP}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
        {/* BottomSheetModal scpecial here (eles only use BottomSheet at screen using not use BottomSheetModal) */}
        <ChoiseDate ref={utils._refChoiseDate} />
      </BottomSheetModalProvider>
      <SlideScreen
        ref={utils._refSlideScreen}
        initValueAniamted={screenData.width}
      />

      {/* {Always init final here} */}
      <FlashMessage
        position={'top'}
        style={Platform.OS === 'android' ? {paddingTop: scale(30)} : null}
      />
      <Components.MessegeBox ref={utils._refMessage} />
      <Components.LoadingSpinner ref={utils._refLoading} />
    </GestureHandlerRootView>
  )
}

export default WrapperNetworkStatusWarning(AppRoot)

const styles = StyleSheet.create({
  container_root_view: {
    flex: 1,
  },
})
