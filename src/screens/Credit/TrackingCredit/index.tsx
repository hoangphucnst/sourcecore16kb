import {StyleSheet, View} from 'react-native'
import React from 'react'
// import InfoTaskCard from './components/InfoTaskCard'
import HeaderWithBack from '~/screens/components/HeaderWithBack'
import {useAppStyles} from '~/hooks'
import {p_verticalScale, scale} from '~/utils/scaleScreen'
import useCreditTrackingList from '../hooks/useCreditTrackingList'
import utils from '~/utils'
import AppFlatList from '~/components/AppFlatList'
import {EmptyListView, LoadingList} from '~/screens/components'
import {CreditLogUser} from '~/services/apis/creditService'
import InfoTaskCard from './components/InfoTaskCard'
// import LocalConstant from '../DetailCredit/LocalConstant'

const TrackingCredit = props => {
  const {creditIdEncode, creditId} = utils.ngetParams(
    props,
    ['creditIdEncode', 'creditId'],
    {
      creditIdEncode: null,
      creditId: null,
    },
  )
  const styles = Styles()
  const {list, onRefresh, loadMore} = useCreditTrackingList({
    creditEncodeId: creditIdEncode,
    // creditId: creditId,
  })

  const renderItem = ({item}) => {
    return <InfoTaskCard data={item} mode="credit" />
  }

  return (
    <View style={styles.container}>
      <HeaderWithBack title="Theo dõi" />
      {/* <AppScrollViewBody
        style={{padding: scale(10)}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.list_card}>
          
        </View>
      </AppScrollViewBody> */}
      <AppFlatList
        showsVerticalScrollIndicator={false}
        data={list.data}
        keyExtractor={(item: CreditLogUser, index) =>
          `Credit_Log_${item?.objectId}_${index}`
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

export default TrackingCredit

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
      alignItems: 'center',
      gap: scale(5),
      paddingBottom: scale(100),
    },
  })
}
