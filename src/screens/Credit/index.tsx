import React, {useCallback, useState} from 'react'
import {ListRenderItem, StyleSheet, View} from 'react-native'
import {p_verticalScale} from '~/utils/scaleScreen'
import {useAppStyles} from '~/hooks'
import utils from '~/utils'
import {Screens} from '../Screens'
import AppHeader from '~/components/AppHeader'
import AppFlatList from '~/components/AppFlatList'
import {CreditContractCard} from './components'
import {
  EmptyListView,
  InfoUserAndNotificationCard,
  LoadingList,
  SearchViewDebounce,
} from '../components'
import useScreenState from '~/redux/reduxHooks/useScreenState'
import useCreditContractList from './hooks/useCreditContractList'
import {CreditContract} from '~/services/apis/creditService'
import {Filter, LIST_STATUS_CREDIT_CONTRACT} from './modals/Modal_CreditFilter'
import {STATUS_CONTRACT_TEXT} from '~/constants'
import {useFocusEffect, useNavigation} from '@react-navigation/native'

const defaultFilter: Filter = {
  creditCode: '',
  creditContractNumber: '',
  fullName: '',
  status: LIST_STATUS_CREDIT_CONTRACT[0],
  amountFrom: '',
  amountTo: '',
  createdDateFrom: null,
  createdDateTo: null,
  deadlineFrom: null,
  deadlineTo: null,
}

const CreditScreen = props => {
  const navigation = useNavigation()
  const needRefresh: string = utils.ngetParam(props, 'needRefresh', false)
  const styles = useCreditStyles()
  const {countNoti} = useScreenState()
  const [filter, setFilter] = useState<Filter>(defaultFilter)

  const {
    list,
    onRefresh,
    loadMore,
    setFilter: setFilterCredit,
    setSearch: setSearchTextCredit,
  } = useCreditContractList()

  useFocusEffect(
    useCallback(() => {
      if (needRefresh) {
        setFilter(defaultFilter) // reset filter local
        setFilterCredit({}) // reset filter server (trigger useEffect trong hook)
        setSearchTextCredit('') // reset search nếu cần
        onRefresh() // gọi lại API
      }
      navigation.setParams({needRefresh: false})
    }, [needRefresh]),
  )

  const onApplyFilter = (filter_input: Filter) => {
    setFilter(filter_input)

    let formatedFilter = {}

    if (utils.isDefined(filter_input.creditCode)) {
      formatedFilter = {
        ...(formatedFilter ?? {}),
        creditCode: filter_input.creditCode,
      }
    }

    if (utils.isDefined(filter_input.creditContractNumber)) {
      formatedFilter = {
        ...(formatedFilter ?? {}),
        numberCreditStr: filter_input.creditContractNumber,
      }
    }

    if (utils.isDefined(filter_input.fullName)) {
      formatedFilter = {
        ...(formatedFilter ?? {}),
        borrower: filter_input.fullName,
      }
    }

    if (
      utils.isDefined(filter_input.status) &&
      filter_input.status !== LIST_STATUS_CREDIT_CONTRACT[0]
    ) {
      formatedFilter = {
        ...(formatedFilter ?? {}),
        status: utils.getKeyFromLabel(
          filter_input.status,
          STATUS_CONTRACT_TEXT,
        ),
      }
    }

    if (utils.isDefined(filter_input.amountFrom)) {
      // formatedFilter = {
      //   ...(formatedFilter ?? {}),
      //   amountFrom: filter_input.amountFrom,
      // }
    }
    if (utils.isDefined(filter_input.amountTo)) {
      // formatedFilter = {
      //   ...(formatedFilter ?? {}),
      //   amountFrom: filter_input.amountFrom,
      // }
    }

    if (utils.isDefined(filter_input.createdDateFrom)) {
      formatedFilter = {
        ...(formatedFilter ?? {}),
        contractCreationFrom: new Date(
          filter_input.createdDateFrom,
        ).toLocaleDateString('vi-VN'),
      }
    }

    if (utils.isDefined(filter_input.createdDateTo)) {
      formatedFilter = {
        ...(formatedFilter ?? {}),
        contractCreationTo: new Date(
          filter_input.createdDateTo,
        ).toLocaleDateString('vi-VN'),
      }
    }

    if (utils.isDefined(filter_input.deadlineFrom)) {
      // formatedFilter = {
      //   ...(formatedFilter ?? {}),
      //   amountFrom: filter_input.amountFrom,
      // }
    }

    if (utils.isDefined(filter_input.deadlineTo)) {
      // formatedFilter = {
      //   ...(formatedFilter ?? {}),
      //   amountFrom: filter_input.amountFrom,
      // }
    }

    setFilterCredit(formatedFilter)
  }

  const renderItem: ListRenderItem<CreditContract> = ({item}) => {
    return (
      <CreditContractCard
        item={item}
        onPress={() => {
          utils.navigate(Screens.name.DetailCredit, {
            creditIdEncode: item?.creditContractEncodeId || null,
            group: item?.group,
            creditId: item?.numberCreditStr,
          })
        }}
      />
    )
  }

  return (
    <View style={[styles.container]}>
      <AppHeader
        title="Hợp đồng tín dụng"
        styleHeader={styles.header}
        styleTitle={styles.title_header}
        componentRight={<InfoUserAndNotificationCard countNoti={countNoti} />}
      />
      <SearchViewDebounce
        placeholder="Tìm kiếm"
        onChangeText={textValue => {
          utils.log('CreditScreen -> Tìm kiếm', {textValue: textValue})
          setSearchTextCredit(textValue)
        }}
        onPressFilter={() => {
          utils.navigate(Screens.name.Modal_CreditFilter, {
            filter: filter,
            onApplyFilter,
          })
        }}
      />
      <AppFlatList
        showsVerticalScrollIndicator={false}
        data={list.data}
        keyExtractor={(item: CreditContract, index) =>
          `Credit_${item?.creditContractId}_${index}`
        }
        renderItem={renderItem}
        refreshing={list.refresh}
        onRefresh={onRefresh}
        onEndReached={list.showLoading ? loadMore : null}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          list.showLoading ? (
            <LoadingList isScrollable={true} />
          ) : (
            <View style={{height: p_verticalScale(20)}} />
          )
        }
        ListEmptyComponent={
          <EmptyListView
            showImageEmpty={!list.refresh}
            textEmpty={list.refresh ? 'Đang tải...' : 'Không có dữ liệu'}
          />
        }
      />
    </View>
  )
}

export default CreditScreen

const useCreditStyles = () => {
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
      marginLeft: sizes.mg25,
    },
  })
}
