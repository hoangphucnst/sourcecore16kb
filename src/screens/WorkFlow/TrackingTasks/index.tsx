import React from 'react'
import {StyleSheet, View} from 'react-native'
import AppFlatList from '~/components/AppFlatList'
import {useAppStyles} from '~/hooks'
import {EmptyListView, LoadingList} from '~/screens/components'
import HeaderWithBack from '~/screens/components/HeaderWithBack'
import utils from '~/utils'
import {p_verticalScale, scale} from '~/utils/scaleScreen'
import useListTrackingTask from '../hooks/useListTrackingTask'
import InfoTaskCard from './components/InfoTaskCard'
import {DetailTaskQTD} from '~/services/apis/taskService'

const TrackingTasksScreen = (props: any) => {
  const styles = Styles()
  const detailTaskQTD: DetailTaskQTD = utils.ngetParam(
    props,
    'detailTaskQTD',
    null,
  )
  const {list, loadMore, onRefresh} = useListTrackingTask(detailTaskQTD?.taskId)
  return (
    <View style={styles.container}>
      <HeaderWithBack title="Theo dõi công việc" />
      <AppFlatList
        horizontalInit={scale(12)}
        data={list.data}
        keyExtractor={(item: TaskQTD, index) => `${item?.id}_${index}`}
        renderItem={({item}) => <InfoTaskCard data={item} />}
        refreshing={list.refresh}
        onRefresh={onRefresh}
        onEndReached={list.showLoading ? loadMore : null}
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
        ItemSeparatorComponent={<View style={styles.separator} />}
      />
      {/* <AppScrollViewBody
        style={{padding: scale(10)}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.list_card}>
          {createMockDataTrackingTask().map((task, index) => (
            <InfoTaskCard data={task} key={`${task?.createdDate}_${index}`} />
          ))}
        </View>
      </AppScrollViewBody> */}
    </View>
  )
}

export default TrackingTasksScreen

const Styles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    list_card: {
      flex: 1,
      gap: scale(5),
      paddingBottom: scale(100),
    },
    separator: {
      marginTop: scale(5),
    },
  })
}
