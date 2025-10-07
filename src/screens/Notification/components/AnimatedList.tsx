import {StyleSheet, View} from 'react-native'
import React from 'react'
import AppFlatList from '~/components/AppFlatList'
import NotiAnimatedItem from './NotiAnimatedItem'
import {Notification} from '~/services/apis/notificationService'
import LoadingList from '~/screens/components/LoadingList'
import EmptyListView from '~/screens/components/EmptyListView'
import {scale} from '~/utils/scaleScreen'

const AnimatedList = ({
  data = [],
  refreshing = false,
  showLoading = false,
  onPressItem = () => {},
  onRefresh = () => {},
  loadMore = () => {},
}: {
  data: Notification[]
  showLoading: boolean
  refreshing: boolean
  onPressItem: (item: Notification, index: number) => void
  onRefresh: () => void
  loadMore: () => void
}) => {
  return (
    <AppFlatList
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(item, index) => `Noti_item_${index}`}
      renderItem={({item, index}) => (
        <NotiAnimatedItem item={item} index={index} onPressItem={onPressItem} />
      )}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={showLoading ? loadMore : null}
      onEndReachedThreshold={0.1}
      ListFooterComponent={
        showLoading ? (
          <LoadingList isScrollable={true} />
        ) : (
          <View style={{height: scale(150)}} />
        )
      }
      ListEmptyComponent={
        <EmptyListView
          showImageEmpty={!refreshing}
          textEmpty={refreshing ? 'Đang tải...' : 'Hiện không có thông báo'}
        />
      }
    />
  )
}

export default AnimatedList

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = StyleSheet.create({})
