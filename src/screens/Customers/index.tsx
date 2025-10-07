import React, {useCallback, useRef, useState} from 'react'
import {Keyboard, StyleSheet, View} from 'react-native'
import AppHeader from '~/components/AppHeader'
import {useAppStyles} from '~/hooks'
import {AppTheme} from '~/styles/Theme'
import {scale} from '~/utils/scaleScreen'
import CardCustomer from '../components/CardCustomer'
import AppFlatList from '~/components/AppFlatList'
import Separator from '../components/Separator'
import utils from '~/utils'
import {Screens} from '../Screens'
import {Customer} from '~/services/apis/customerService'
import useCustomerList from './hooks/useCustomerList'
import EmptyListView from '../components/EmptyListView'
import {CUSTOMER_STATUS} from '~/constants'
import {Filter} from './modals/Modal_Filter'
import SearchViewDebounce, {
  SearchViewRefProps,
} from '../components/SearchViewDebounce'
import InfoUserAndNotificationCard from '../components/InfoUserAndNotificationCard'
import LoadingList from '../components/LoadingList'
import useScreenState from '~/redux/reduxHooks/useScreenState'
import {useFocusEffect, useNavigation} from '@react-navigation/native'

const Customers = props => {
  const navigation = useNavigation()
  const needRefresh: string = utils.ngetParam(props, 'needRefresh', false)
  const {THEME} = useAppStyles()
  const styles = useCallback(styleWithTheme, [THEME])(THEME)
  const refSearchView = useRef<SearchViewRefProps>(null)
  const {countNoti, refreshCountNoti} = useScreenState()

  const {
    list: customerList,
    onRefresh: refreshCustomerList,
    loadMore: loadMoreCustomerList,
    setSearch: setSearchTextCustomerList,
    setFilter: setFilterCustomerList,
    reset,
  } = useCustomerList()

  const defaultFilter = {
    customerCode: '',
    fullName: '',
    address: '',
    birthDay: null,
    cccd: '',
    status: CUSTOMER_STATUS.ALL,
  }
  const [filter, setFilter] = useState<Filter>(defaultFilter)

  useFocusEffect(
    useCallback(() => {
      if (needRefresh) {
        refSearchView.current.setSearchValue('')
        refreshCountNoti()
        setFilter(defaultFilter)
        reset()
      }

      navigation.setParams({needRefresh: false})
    }, [needRefresh]),
  )

  const openFilter = () => {
    Keyboard.dismiss()
    utils.navigate(Screens.name.Modal_Filter_Customers, {
      onApplyFilter,
      filter,
    })
  }

  const renderItemCustomer = ({item}: {item: Customer}) => {
    return (
      <CardCustomer
        customer={item}
        onPress={() => {
          utils.navigate(Screens.name.DetailsCutomer, {
            customer: item,
          })
        }}
      />
    )
  }

  const onApplyFilter = (filter_input: typeof defaultFilter) => {
    setFilter(filter_input)
    const formatedFilter: Partial<typeof defaultFilter> = {}

    // utils.log('onApplyFilter', filter_input)

    // Handle riêng cho status
    switch (filter_input.status) {
      case CUSTOMER_STATUS.LOCK:
        formatedFilter.status = '0'
        break
      case CUSTOMER_STATUS.UNLOCK:
        formatedFilter.status = '1'
        break
    }

    if (utils.isDefined(filter_input.dateOfBirth)) {
      formatedFilter.dateOfBirth = utils.formatDate(filter_input.dateOfBirth)
    }

    for (const key in filter_input) {
      if (key === 'status' || key === 'dateOfBirth') continue

      if (
        filter_input[key as keyof typeof filter_input] !==
        defaultFilter[key as keyof typeof defaultFilter]
      ) {
        formatedFilter[key as keyof typeof filter_input] =
          filter_input[key as keyof typeof filter_input]
      }
    }

    // utils.log('Formated', formatedFilter)

    setFilterCustomerList(formatedFilter)
  }

  return (
    <View style={styles.container}>
      <AppHeader
        title="Khách hàng"
        styleHeader={styles.header}
        styleTitle={{
          color: THEME.colors.white,
          marginLeft: THEME.sizes.mg25,
        }}
        componentRight={<InfoUserAndNotificationCard countNoti={countNoti} />}
      />
      <SearchViewDebounce
        ref={refSearchView}
        onChangeText={textValue => {
          utils.log('SearchViewDebounce', {textValue: textValue})
          setSearchTextCustomerList(textValue)
        }}
        onPressFilter={openFilter}
        placeholder="Tìm kiếm"
        timeDebounce={1000}
      />
      <AppFlatList
        showsVerticalScrollIndicator={false}
        horizontalInit={THEME.sizes.pd10}
        contentContainerStyle={{
          padding: THEME.sizes.pd10,
          paddingBottom: scale(100),
        }}
        data={customerList.data}
        renderItem={renderItemCustomer}
        ItemSeparatorComponent={<Separator />}
        refreshing={customerList.refresh}
        onRefresh={refreshCustomerList}
        onEndReached={customerList.showLoading ? loadMoreCustomerList : null}
        onEndReachedThreshold={0.1}
        keyExtractor={item => item?.customerId?.toString()}
        ListFooterComponent={
          customerList.showLoading ? <LoadingList isScrollable={true} /> : null
        }
        ListEmptyComponent={
          <EmptyListView
            showImageEmpty={!customerList.refresh}
            textEmpty={
              customerList.refresh ? 'Đang tải...' : 'Không có dữ liệu'
            }
          />
        }
      />
    </View>
  )
}

export default Customers

const styleWithTheme = (THEME: AppTheme) => {
  const {colors} = THEME
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.primary,
      borderBottomWidth: 0,
    },
    right_header_warpper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(16),
    },
    icon_warpper: {
      borderRadius: scale(22),
      borderWidth: scale(0.8),
      borderColor: THEME.colors.white,
      backgroundColor: THEME.colors.white,

      // iOS Shadow
      shadowColor: '#363636',
      shadowOffset: {width: 2, height: 3},
      shadowOpacity: 0.25,
      shadowRadius: 4,

      // Android Shadow
      elevation: 5,
    },
    icon: {
      width: scale(22),
      height: scale(22),
    },
  })
}
