import React, {useCallback, useRef, useState} from 'react'
import {Keyboard, StyleSheet, View} from 'react-native'
import {p_verticalScale, scale} from '~/utils/scaleScreen'
import {useAppStyles} from '~/hooks'
import {AppTheme} from '~/styles/Theme'
import utils from '~/utils'
import {Screens} from '../Screens'
import AppHeader from '~/components/AppHeader'
import InfoUserAndNotificationCard from '../components/InfoUserAndNotificationCard'
import SearchViewDebounce, {
  SearchViewRefProps,
} from '../components/SearchViewDebounce'
import AppFlatList from '~/components/AppFlatList'
import TaskCard from './components/TaskCard'
import useTaskQTD from './hooks/useTaskQTD'
import {TaskQTD} from '~/services/apis/taskService'
import LoadingList from '../components/LoadingList'
import EmptyListView from '../components/EmptyListView'
import {
  Filter,
  LIST_STATUS_TASK_QTD,
  LIST_TYPE_PROCESSS_TASK_QTD,
  LIST_TYPE_TASK_QTD,
} from './modals/Modal_TaskFilter'
import {STATUS_TASK_QTD, TYPE_TASK_QTD} from '~/constants'
import useScreenState from '~/redux/reduxHooks/useScreenState'
import {useFocusEffect, useNavigation} from '@react-navigation/native'

const WorkFlowScreen = props => {
  const navigation = useNavigation()
  const key_params = ['needRefresh']
  const default_params = {
    needRefresh: false,
  }
  const {needRefresh} = utils.ngetParams(props, key_params, default_params)

  const {THEME} = useAppStyles()
  const styles = stylesSheetTheme(THEME)
  const refSearchView = useRef<SearchViewRefProps>(null)
  const {countNoti, refreshCountNoti} = useScreenState()

  const {
    list,
    loeadMore,
    reset,
    onRefresh,
    setFilter: setFilterTaskQTD,
    setSearch: setSearchTaskQTD,
  } = useTaskQTD()

  const defaultFilter: Filter = {
    statusTask: LIST_STATUS_TASK_QTD[0],
    typeTask: LIST_TYPE_TASK_QTD[0],
    statusPerson: LIST_TYPE_PROCESSS_TASK_QTD[0],
    deadlineStart: null,
    deadlineTo: null,
  }
  const [filter, setFilter] = useState<Filter>(defaultFilter)

  useFocusEffect(
    useCallback(() => {
      if (needRefresh) {
        refSearchView.current.setSearchValue('')
        refreshCountNoti()
        reset()
        setFilter(defaultFilter) // reset filter local
      }
      navigation.setParams({needRefresh: false})
    }, [needRefresh]),
  )

  const onApplyFilter = (filter_input: typeof defaultFilter) => {
    setFilter(filter_input)

    const formatedFilter: Partial<{
      taskName?: string
      quickSearch?: string
      dateFrom?: string
      dateTo?: string
      completionDate?: string
      taskType?: string
      taskStatus?: string
      personalStatus?: string
    }> = {}

    if (utils.isDefined(filter_input.deadlineStart)) {
      formatedFilter.dateFrom = utils.formatDate(filter_input.deadlineStart)
    }

    if (utils.isDefined(filter_input.deadlineTo)) {
      formatedFilter.dateTo = utils.formatDate(filter_input.deadlineTo)
    }

    if (filter_input.typeTask !== LIST_TYPE_TASK_QTD[0]) {
      formatedFilter.taskType = utils.reverseConstantValue(
        TYPE_TASK_QTD,
        filter_input.typeTask,
      )
    }

    if (filter_input.statusTask !== LIST_STATUS_TASK_QTD[0]) {
      formatedFilter.taskStatus = utils.reverseConstantValue(
        STATUS_TASK_QTD,
        filter_input.statusTask,
      )
    }

    if (filter_input.statusPerson !== LIST_TYPE_PROCESSS_TASK_QTD[0]) {
      formatedFilter.personalStatus = utils.reverseConstantValue(
        LIST_TYPE_PROCESSS_TASK_QTD,
        filter_input.statusPerson,
      )
    }

    setFilterTaskQTD(formatedFilter)
  }

  const openFilter = () => {
    Keyboard.dismiss()
    utils.navigate(Screens.name.Modal_TaskFilter, {
      onApplyFilter,
      filter,
    })
  }

  return (
    <View style={[styles.container]}>
      <AppHeader
        title="Công việc thực hiện"
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
          setSearchTaskQTD(textValue)
        }}
        placeholder="Tìm kiếm"
        timeDebounce={500}
        onPressFilter={openFilter}
      />
      <AppFlatList
        data={list.data}
        keyExtractor={(item: TaskQTD, index) => `${item?.id}_${index}`}
        renderItem={({item}) => (
          <TaskCard
            data={item}
            onPress={() => {
              utils.navigate(Screens.name.DetailTask, {taskInfo: item})
            }}
          />
        )}
        refreshing={list.refresh}
        onRefresh={onRefresh}
        onEndReached={list.showLoading ? loeadMore : null}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={<View style={{height: scale(5)}} />}
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
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default WorkFlowScreen

const stylesSheetTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: THEME.colors.background,
    },
    header: {
      backgroundColor: THEME.colors.primary,
      borderBottomWidth: 0,
    },
    blockList: {
      paddingTop: scale(5),
      paddingBottom: scale(20),
    },
  })
