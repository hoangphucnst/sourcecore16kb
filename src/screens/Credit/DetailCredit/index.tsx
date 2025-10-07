/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  LayoutChangeEvent,
  Alert,
} from 'react-native'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import {TabView} from 'react-native-tab-view'
import type {SceneRendererProps, NavigationState} from 'react-native-tab-view'
import {useAppStyles} from '~/hooks'
import AppHeader from '~/components/AppHeader'
import {Icons} from '~/assets'
import utils from '~/utils'
import {p_horizontalScale, scale} from '~/utils/scaleScreen'
import {Fontsfamily} from '~/styles/FontsFamily'
import AppText from '~/components/AppText'
import FinancialInfo from './FinancialInfoTab/FinancialInfo'
import GeneralInfo from './GeneralInfoTab/GeneralInfo'
import ProcessFeedback from './ProcessFeedbackTab/ProcessFeedback'
import FloatButton, {ActionItem} from '~/components/FloatButton'
import LocalConstant from './LocalConstant'
import {FAB_CREDIT} from '~/constants'
import {Screens} from '~/screens/Screens'
import useActionOnCreditContract from '../hooks/useActionOnCreditContract'
import useDetailCreditContract from '../hooks/useDetailCreditContract'
import {useFocusEffect} from '@react-navigation/native'

const initialLayout = {width: Dimensions.get('window').width}

const DetailCreditScreen = props => {
  const {creditIdEncode, group, creditId} = utils.ngetParams(
    props,
    ['creditIdEncode', 'group', 'creditId'],
    {
      creditIdEncode: null,
      group: null,
      creditId: null,
    },
  )

  const styles = DetailCreditStyles()
  const {THEME} = useAppStyles()
  const {colors} = THEME

  const detailCreditContractHook = useDetailCreditContract({
    creditIdEncode: creditIdEncode,
  })
  const {detailCreditContract, refreshDetail, refreshFeedback} =
    detailCreditContractHook
  const isCallAPI = useRef(false)

  useFocusEffect(
    useCallback(() => {
      console.log('Screen is being focus')
      if (isCallAPI.current) return
      isCallAPI.current = true
      refreshDetail()
      refreshFeedback()
    }, []),
  )

  const {HiddenMenu, StaticMenu, TabRoutes} = LocalConstant()
  const staticMenu = StaticMenu(detailCreditContract?.rolesButton)
  const hiddenMenu = HiddenMenu(detailCreditContract?.rolesButton)
  const [index, setIndex] = useState(0)
  const [routes, setRoutes] = useState(TabRoutes)

  const scrollRef = useRef<ScrollView>(null)
  const tabRefs = useRef<(View | null)[]>([])
  const {approve, maskAsCompleted} = useActionOnCreditContract()

  useEffect(() => {
    try {
      scrollRef?.current?.scrollTo({
        x:
          tabRefs.current.find(e => e.index === index)?.x -
          p_horizontalScale(100) / 2,
        y: 0,
        animated: true,
      })
    } catch (error) {
      utils.log('DetailCreditScreen', {SCROLL: error})
    }
  }, [index])

  const renderScene = ({route}: {route: {key: string}}) => {
    if (route.key === routes[index].key) {
      switch (route.key) {
        case 'general':
          return (
            <GeneralInfo detailCreditContractHook={detailCreditContractHook} />
          )
        case 'financial':
          return (
            <FinancialInfo
              detailCreditContractHook={detailCreditContractHook}
            />
          )
        case 'feedback':
          return (
            <ProcessFeedback
              tabInfo={route}
              creditIdEncode={creditIdEncode}
              detailCreditContractHook={detailCreditContractHook}
            />
          )
        default:
          return null
      }
    } else {
      return <View style={styles.whiteScreen} />
    }
  }

  const renderTabBar = (
    sceneProps: SceneRendererProps & {
      navigationState: NavigationState<{key: string; title: string}>
    },
  ) => {
    return (
      <View style={styles.tabBarContainer}>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {sceneProps.navigationState.routes.map((route, tabIndex) => {
            const isFocus = tabIndex === sceneProps.navigationState.index

            return (
              <TouchableOpacity
                onLayout={event => {
                  tabRefs.current.push({
                    index: tabIndex,
                    x: event.nativeEvent.layout.x,
                    width: event.nativeEvent.layout.width,
                  })
                  tabRefs.current = [
                    ...new Map(
                      // eslint-disable-next-line dot-notation
                      tabRefs.current.map(item => [item['index'], item]),
                    ).values(),
                  ]
                }}
                key={`HorizontalTabMenu_${tabIndex}`}
                onPress={() => sceneProps.jumpTo(route.key)}>
                <View style={isFocus ? styles.tab_focus : styles.tab}>
                  <View>
                    <AppText style={isFocus ? styles.text_focus : styles.text}>
                      {route.title}
                    </AppText>
                    <View
                      style={
                        isFocus
                          ? styles.indicator_tab_active
                          : styles.indicator_tab
                      }
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    )
  }

  const onActionChange = (item: ActionItem) => {
    switch (item.name) {
      // case FAB_CREDIT.Approve: {
      //   approve({creditIdEncode: creditIdEncode})
      //   break
      // }
      // case FAB_CREDIT.Reject: {
      //   utils.navigate(Screens.name.Modal_Credit_RejectContract, {
      //     creditIdEncode: creditIdEncode,
      //   })
      //   break
      // }
      // case FAB_CREDIT.Tracking: {
      //   utils.navigate(Screens.name.Modal_Credit_TrackingTasks, {
      //     creditIdEncode: creditIdEncode,
      //     // creditId: creditId,
      //   })
      //   break
      // }
      // case FAB_CREDIT.UpdateLoanGroup: {
      //   utils.navigate(Screens.name.Modal_Credit_UpdateGroupLoan, {
      //     creditIdEncode: creditIdEncode,
      //   })
      //   break
      // }
      // case FAB_CREDIT.ReturnToInitiator: {
      //   utils.navigate(Screens.name.Modal_Credit_ReturnToInitiator, {
      //     creditIdEncode: creditIdEncode,
      //   })
      //   break
      // }
      // case FAB_CREDIT.CompleteLoan: {
      //   maskAsCompleted({creditIdEncode: creditIdEncode})
      //   break
      // }
      default: {
        Alert.alert(
          'Đang phát triển',
          'Tính năng đang trong giai đoạn phát triển',
          [{text: 'Đã hiểu', style: 'cancel'}],
          {cancelable: true},
        )
        break
      }
    }
  }

  const onChangeLayoutHeader = (e: LayoutChangeEvent | undefined) => {
    const heightHeader = e?.nativeEvent.layout.height
    setRoutes(old => old.map(tab => ({...tab, heightHeader})))
  }

  return (
    <View style={styles.container}>
      <AppHeader
        title="Thông tin hợp đồng tín dụng"
        styleHeader={styles.header}
        styleTitle={styles.title_header}
        iconLeft={Icons.icBack}
        styleIconLeft={styles.icon}
        onPressLeft={() => utils.goBackNavigation()}
        onLayoutHeader={onChangeLayoutHeader}
      />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
        lazy
      />
      {routes[index].key !== TabRoutes[2].key && (
        <FloatButton
          styleOption={{
            width: scale(48),
            height: scale(48),
          }}
          colorOptionActive={colors.fab.darkGray}
          actions={hiddenMenu}
          style={{
            right: scale(40),
            bottom: scale(70),
          }}
          rotation={'90deg'}
          onPress={onActionChange}
          stateModal={state => {
            //true show button, false ẩn button
          }}
          styleAction={{
            width: scale(40),
            height: scale(40),
          }}
          actionsCover={staticMenu}
        />
      )}
    </View>
  )
}

export default DetailCreditScreen

// Styles
const DetailCreditStyles = () => {
  const {THEME} = useAppStyles()
  const {colors, sizes} = THEME
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.primary,
      borderBottomWidth: 0,
    },
    title_header: {
      color: colors.white,
      marginLeft: sizes.mg15,
    },
    icon: {
      width: scale(24),
      height: scale(24),
      tintColor: colors.white,
    },
    tabBarContainer: {
      borderBottomWidth: 0.5,
      borderBottomColor: colors.background,
      backgroundColor: colors.white,
    },
    tab: {
      paddingHorizontal: scale(13),
      paddingTop: scale(10),
    },
    tab_focus: {
      paddingTop: scale(10),
      paddingHorizontal: scale(13),
    },
    text: {
      fontFamily: Fontsfamily.OpenSans.Regular,
      color: colors.text.secondary,
    },
    text_focus: {
      fontFamily: Fontsfamily.OpenSans.SemiBold,
      color: colors.primary,
    },
    whiteScreen: {flex: 1, backgroundColor: colors.background},
    indicator_tab_active: {
      height: 4,
      backgroundColor: colors.primary,
      marginTop: scale(8),
      borderTopLeftRadius: scale(5),
      borderTopRightRadius: scale(5),
      borderCurve: 'continuous',
    },
    indicator_tab: {
      height: 5,
      marginTop: scale(8),
    },
  })
}
