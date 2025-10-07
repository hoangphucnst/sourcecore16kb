import React, {useEffect, useRef} from 'react'
import {
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import {Icons} from '~/assets'
import AppImage from '~/components/AppImage'
import {scale, scaleFont} from '~/utils/scaleScreen'
import {useAppStyles} from '~/hooks'
import {AppTheme} from '~/styles/Theme'
import utils from '~/utils'
import {Screens} from '../Screens'
import AppHeader from '~/components/AppHeader'
import useAuth from '~/redux/reduxHooks/useAuth'
import InfoUserAndNotificationCard from '../components/InfoUserAndNotificationCard'
import AppScrollViewBody from '~/components/AppScrollViewBody'
import DebtChart from './components/DebtChart'
import CreditResolvedList from './components/CreditResolvedList'
import ContractOverview from './components/ContractOverview'
import AppViewBody from '~/components/AppViewBody'
import LinearGradient from 'react-native-linear-gradient'
import AppText from '~/components/AppText'
import {FONTSFAMILY} from '~/styles/FontsFamily'
import useChangeBackground from '~/redux/reduxHooks/useChangeBackground'
import {NavigationEvents} from '@react-navigation/compat'
import useScreenState from '~/redux/reduxHooks/useScreenState'
import useDashboardStats from './hooks/useDashboardStats'
import CustomerOverview from './components/CustomerOverview'
import PersonalCreditStatusChart from './components/PersonalCreditStatusChart'
import GeneralCreditStatusChart from './components/GeneralCreditStatusChart'
import PersonalTaskList from './components/PersonalTaskList'
import AssignedTaskList from './components/AssignedTaskList'
import OtherStats from './components/OtherStats'
import DebtStructureChart from './components/DebtStructureChart'
import AppIconVector from '~/components/AppIconVector'
import moment from 'moment'

const HEIGHT_HEADER = 250
const OFFSET_HEADER = 80

const HomeScreen = () => {
  const {THEME} = useAppStyles()
  const styles = stylesSheetTheme(THEME)
  const {dataLogin} = useAuth()
  const {backgoundHome} = useChangeBackground()
  const isOverScroll = useRef(false)
  const {countNoti, refreshCountNoti} = useScreenState()
  const {stat, setYearCapAnDebt, isLoading, onReload} = useDashboardStats()

  useEffect(() => {
    refreshCountNoti()
  }, [])

  const goSettingBackground = () => {
    utils.navigate(Screens.name.Modal_ChangeBackground)
  }

  const onFocusScreen = (mode: 'light-content' | 'dark-content') => {
    mode = isOverScroll.current ? 'dark-content' : 'light-content'
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent')
      StatusBar.setTranslucent(true)
      StatusBar.setBarStyle(mode, true)
    } else {
      StatusBar.setBarStyle(mode, true)
    }
  }

  const onBlurScreen = () => {
    StatusBar.setBarStyle('light-content', true)
  }

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y
    if (offsetY > HEIGHT_HEADER - OFFSET_HEADER && !isOverScroll.current) {
      isOverScroll.current = true
      onFocusScreen('dark-content')
    } else if (
      offsetY <= HEIGHT_HEADER - OFFSET_HEADER &&
      isOverScroll.current
    ) {
      isOverScroll.current = false
      onFocusScreen('light-content')
    }
  }

  useEffect(() => {
    if (isLoading) {
      utils.showLoadingFullApp({
        show: true,
        text: 'Đang thống kê...',
      })
    } else {
      utils.showLoadingFullApp({show: false})
    }
  }, [isLoading])

  return (
    <View style={[styles.container]}>
      <NavigationEvents onWillFocus={onFocusScreen} onWillBlur={onBlurScreen} />
      <AppScrollViewBody
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: scale(20)}}
        onScroll={handleScroll}
        scrollEventThrottle={16} // thêm để scroll mượt
      >
        <View>
          <AppImage
            source={backgoundHome.image}
            style={styles.img_header}
            resizeMode="cover"
          />
          <LinearGradient
            start={{
              x: 0,
              y: 1,
            }}
            end={{
              x: 0,
              y: 0,
            }}
            locations={[0, 0.2]}
            colors={[THEME.colors.background, 'rgba(242,242,247,0.01)']}
            style={{
              ...StyleSheet.absoluteFill,
            }}
          />
          <LinearGradient
            start={{
              x: 0,
              y: 0,
            }}
            end={{
              x: 0,
              y: 1,
            }}
            locations={[0, 0.2]}
            colors={['rgba(0,0,0,0.5)', 'rgba(242,242,247,0.01)']}
            style={{
              ...StyleSheet.absoluteFill,
            }}
          />
          <TouchableOpacity
            onPress={goSettingBackground}
            activeOpacity={0.5}
            style={styles.icon_change_background}>
            <AppImage
              source={Icons.icChangeBackground}
              style={{width: scale(24), height: scale(24)}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onReload}
            activeOpacity={0.5}
            style={styles.last_update}>
            <AppIconVector.FeatherIcon
              name="refresh-ccw"
              size={scale(14)}
              color={THEME.colors.text.secondary}
            />
            <AppText style={styles.text_last_update}>
              Mới nhất: {moment().format('DD/MM/YYYY HH:mm:ss')}
            </AppText>
          </TouchableOpacity>
          <View
            style={{
              ...StyleSheet.absoluteFill,
            }}>
            <AppHeader
              title="_"
              styleHeader={styles.header}
              styleTitle={styles.title_header}
              styleLeft={styles.header_right}
              componentLeft={
                <AppText
                  numberOfLines={1}
                  style={{
                    color: THEME.colors.white,
                    fontFamily: FONTSFAMILY.NunitoBold,
                    fontSize: scale(16),
                  }}>
                  {`${utils.getGreetingByTime()}, ${dataLogin?.fullName}`}
                </AppText>
              }
              componentRight={
                <InfoUserAndNotificationCard countNoti={countNoti} />
              }
            />
          </View>
        </View>
        <AppViewBody
          horizontalInit={scale(13)}
          style={{
            marginTop: -scale(OFFSET_HEADER),
          }}>
          <OtherStats data={stat?.otherStats || null} />
          <DebtChart
            totalDebtData={utils.convertObjectToArray(
              stat?.capAndDebt?.debtAmount || null,
            )}
            availableFundData={utils.convertObjectToArray(
              stat?.capAndDebt?.availableCapital || null,
            )}
            curve
            onSelectYear={year => {
              setYearCapAnDebt(year)
            }}
          />
          <DebtStructureChart
            data={stat?.debtAndCustomer?.debtStructure || []}
          />
          <CustomerOverview
            totalCustomer={stat?.debtAndCustomer?.customer?.customersCount || 0}
            bannedCustomer={
              stat?.debtAndCustomer?.customer?.restrictedCustomersCount || 0
            }
          />
          <PersonalCreditStatusChart
            data={stat?.creditPersonalAndCommon?.personalCredit}
          />
          <GeneralCreditStatusChart
            data={stat?.creditPersonalAndCommon?.commonCredit}
          />
          <CreditResolvedList data={stat?.solvedCredit || []} />
          <PersonalTaskList data={stat?.personalTask || null} />
          <AssignedTaskList data={stat?.assignedTask || null} />
          <ContractOverview
            numOfCreditContract={stat?.contract?.creditContractCount || 0}
            numOfMortgageContract={stat?.contract?.mortgageContractCount || 0}
          />
          {/* {allowed_roles.includes(
            USER_PERMISSION.ACTION.DASHBOARD.INFO_FINACIAL,
          ) && (
            <>
              <OtherStats data={stat?.otherStats || null} />
              <DebtChart
                totalDebtData={utils.convertObjectToArray(
                  stat?.capAndDebt?.debtAmount || null,
                )}
                availableFundData={utils.convertObjectToArray(
                  stat?.capAndDebt?.availableCapital || null,
                )}
                curve
                onSelectYear={year => {
                  setYearCapAnDebt(year)
                }}
              />
            </>
          )} */}
          {/* {allowed_roles.includes(
            USER_PERMISSION.ACTION.DASHBOARD.DEBT_AND_CUSTOMER,
          ) && (
            <>
              <DebtStructureChart
                data={stat?.debtAndCustomer?.debtStructure || []}
              />
              <CustomerOverview
                totalCustomer={
                  stat?.debtAndCustomer?.customer?.customersCount || 0
                }
                bannedCustomer={
                  stat?.debtAndCustomer?.customer?.restrictedCustomersCount || 0
                }
              />
            </>
          )} */}
          {/* {allowed_roles.includes(
            USER_PERMISSION.ACTION.DASHBOARD.PERSONAL_AND_COMMON_PROFILE,
          ) && (
            <>
              <PersonalCreditStatusChart
                data={stat?.creditPersonalAndCommon?.personalCredit}
              />
              <GeneralCreditStatusChart
                data={stat?.creditPersonalAndCommon?.commonCredit}
              />
            </>
          )} */}
          {/* {allowed_roles.includes(
            USER_PERMISSION.ACTION.DASHBOARD.SOLVED_CREDIT_CONTRACT,
          ) && <CreditResolvedList data={stat?.solvedCredit || []} />} */}
          {/* {allowed_roles.includes(
            USER_PERMISSION.ACTION.DASHBOARD.PERSONAL_AND_ASSIGNED_TASK,
          ) && (
            <>
              <PersonalTaskList data={stat?.personalTask || null} />
              <AssignedTaskList data={stat?.assignedTask || null} />
              <ContractOverview
                numOfCreditContract={stat?.contract?.creditContractCount || 0}
                numOfMortgageContract={
                  stat?.contract?.mortgageContractCount || 0
                }
              />
            </>
          )} */}
        </AppViewBody>
      </AppScrollViewBody>
    </View>
  )
}

export default HomeScreen

const stylesSheetTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: THEME.colors.background,
    },
    header: {
      backgroundColor: 'transparent',
      borderBottomWidth: 0,
    },
    img_header: {
      height: scale(250),
      width: '100%',
    },
    title_header: {
      color: THEME.colors.white,
      marginLeft: THEME.sizes.mg25,
      width: 0,
      flex: 0,
    },
    icon_change_background: {
      position: 'absolute',
      bottom: scale(OFFSET_HEADER),
      right: scale(13),
      width: scale(35),
      height: scale(35),
      backgroundColor: THEME.colors.white,
      borderRadius: scale(25),
      shadowColor: THEME.colors.black,
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      zIndex: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    last_update: {
      position: 'absolute',
      bottom: scale(OFFSET_HEADER),
      left: scale(13),
      backgroundColor: THEME.colors.white,
      shadowColor: THEME.colors.black,
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      zIndex: 5,
      flexDirection: 'row',
      alignItems: 'center',
      height: scale(35),
      borderRadius: scale(10),
      paddingHorizontal: scale(10),
      gap: scale(5),
    },
    text_last_update: {
      fontSize: scaleFont(12),
    },
    header_right: {
      flex: 1,
    },
  })
