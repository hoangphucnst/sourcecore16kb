import {ActivityIndicator, StyleSheet, View} from 'react-native'
import React, {useCallback, useRef, useState} from 'react'
import {useAppStyles} from '~/hooks'
import AppHeader from '~/components/AppHeader'
import {scale} from '~/utils/scaleScreen'
import AppFlatList from '~/components/AppFlatList'
import LoanCard from './components/LoanCard'
import {Screens} from '../Screens'
import utils from '~/utils'
import Separator from '../components/Separator'
import {AppTheme} from '~/styles/Theme'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import EmptyListView from '../components/EmptyListView'
import useMortgageList from './hooks/useMortgageList'
import {Mortgage} from '~/services/apis/mortgageService'
import SearchViewDebounce from '../components/SearchViewDebounce'
import InfoUserAndNotificationCard from '../components/InfoUserAndNotificationCard'
import useScreenState from '~/redux/reduxHooks/useScreenState'
import {useFocusEffect, useNavigation} from '@react-navigation/native'

export interface Filter {
  mortgageContractCode: string
  mortgageOwner: string
  amount: string
  fromDate: string | null
  toDate: string | null
}

const MortgageScreen = props => {
  const navigation = useNavigation()
  const needRefresh: string = utils.ngetParam(props, 'needRefresh', false)
  const {THEME} = useAppStyles()
  const styles = MortgageScreenStyles(THEME)
  const refSearchView = useRef(null)
  const defaultFilter = {
    mortgageContractCode: '',
    mortgageOwner: '',
    amount: '',
    fromDate: null,
    toDate: null,
  }
  const [filter, setFilter] = useState<Filter>(defaultFilter)
  const {countNoti, refreshCountNoti} = useScreenState()

  const {
    list: mortgageList,
    onRefresh: refreshMortgageList,
    loadMore: loadMoreMortgageList,
    reset,
    setSearch: setSearchTextMortgageList,
    setFilter: setFilterMortgageList,
  } = useMortgageList()

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
    utils.navigate(Screens.name.Modal_Filter_Loan, {
      filter: filter,
      onApplyFilter: (filter_input: Filter) => {
        setFilter(filter_input)

        const formatedFilter: Partial<Filter> = {}

        if (utils.isDefined(filter_input.mortgageContractCode)) {
          formatedFilter.mortgageContractCode =
            filter_input.mortgageContractCode
        }

        if (utils.isDefined(filter_input.mortgageOwner)) {
          formatedFilter.mortgageOwner = filter_input.mortgageOwner
        }

        if (utils.isDefined(filter_input.amount)) {
          formatedFilter.amount = filter_input.amount
        }

        if (utils.isDefined(filter_input.fromDate)) {
          formatedFilter.fromDate = utils.formatDate(filter_input.fromDate)
        }

        if (utils.isDefined(filter_input.toDate)) {
          formatedFilter.toDate = utils.formatDate(filter_input.toDate)
        }

        utils.log('Modal_Filter_Loan', {
          formatedFilter: formatedFilter,
        })

        setFilterMortgageList(formatedFilter)
      },
    })
  }

  const renderItem_LoanApplication = ({
    item,
    index,
  }: {
    item: Mortgage
    index: number
  }) => {
    return (
      <LoanCard
        key={index}
        customerName={item?.mortgageOwnerString ?? '---'}
        profileCode={item?.mortgageContractCode ?? '---'}
        contractNumber={item?.mortgageContractNumber ?? '---'}
        loanAmount={item?.amount ?? '---'}
        createdAt={item?.createTime ?? '---'}
        onPress={() => {
          utils.navigate(Screens.name.MortgageContractDetails, {
            mortgageContractId: item?.mortgageContractId,
          })
        }}
      />
    )
  }

  return (
    <View style={styles.container}>
      <AppHeader
        title="Hợp đồng thế chấp"
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
          setSearchTextMortgageList(textValue)
        }}
        onPressFilter={openFilter}
        placeholder="Tìm kiếm"
        timeDebounce={500}
      />
      <AppFlatList
        showsVerticalScrollIndicator={false}
        horizontalInit={THEME.sizes.pd10}
        contentContainerStyle={{
          padding: THEME.sizes.pd10,
        }}
        data={mortgageList.data}
        keyExtractor={(item: Mortgage) =>
          `FL_Mortgage_${item.mortgageContractId.toString()}`
        }
        renderItem={renderItem_LoanApplication}
        ItemSeparatorComponent={<Separator />}
        refreshing={mortgageList.refresh}
        onRefresh={refreshMortgageList}
        onEndReached={loadMoreMortgageList}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          mortgageList.showLoading && (
            <LoadingList theme={THEME} isScrollable={true} />
          )
        }
        ListEmptyComponent={
          <EmptyListView
            showImageEmpty={!mortgageList.refresh}
            textEmpty={
              mortgageList.refresh ? 'Đang tải...' : 'Không có dữ liệu'
            }
          />
        }
      />
    </View>
  )
}

export default MortgageScreen

const MortgageScreenStyles = (THEME: AppTheme) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

const LoadingList = ({
  theme,
  isScrollable,
}: {
  theme: AppTheme
  isScrollable: boolean
}) => {
  if (!isScrollable) return null
  const styles = LoadingListStyles(theme)
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  )
}

const LoadingListStyles = (theme: AppTheme) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {colors, fonts} = theme
  const {bottom} = useSafeAreaInsets()
  return StyleSheet.create({
    container: {
      paddingHorizontal: scale(24),
      paddingTop: scale(24),
      paddingBottom: scale(24) + bottom,
    },
  })
}
