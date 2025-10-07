import {ListRenderItem, StyleSheet, TouchableOpacity, View} from 'react-native'
import React, {useCallback, useEffect, useState} from 'react'
import {AppTheme} from '~/styles/Theme'
import {useAppStyles} from '~/hooks'
import HeaderWithBack from '~/screens/components/HeaderWithBack'
import AppFlatList from '~/components/AppFlatList'
import AppText from '~/components/AppText'
import {scale} from '~/utils/scaleScreen'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import AppImage from '~/components/AppImage'
import {Icons} from '~/assets'
import utils from '~/utils'
import {Screens} from '~/screens/Screens'
import moment from 'moment'
import useSolvedCredit from '../hooks/useSolvedCredit'
import {SolvedCreditProfile} from '~/services/apis/dashboardService'
import {EmptyListView, LoadingList} from '~/screens/components'

const CreditResolved = () => {
  const {THEME} = useAppStyles()
  const styles = useCallback(styleWithTheme, [THEME])(THEME)
  const {bottom} = useSafeAreaInsets()
  const [datePicker, setDatePicker] = useState({
    fromDate: moment(new Date()).startOf('month'),
    toDate: moment(new Date()),
  })

  const {list, setDate, onRefresh, loadMore} = useSolvedCredit()
  const MAX_COUNT = Math.max(...list.data.map(item => item.count))

  useEffect(() => {
    setDate({
      fromDate: datePicker.fromDate,
      toDate: datePicker.toDate,
    })
  }, [datePicker.fromDate, datePicker.toDate])

  const renderItem: ListRenderItem<SolvedCreditProfile> = ({item}) => {
    const ratio = item?.count / MAX_COUNT

    return (
      <View style={styles.row}>
        <AppText style={[styles.name, {flex: 3} as const]}>
          {utils.safeValue(item?.fullName)}
        </AppText>
        <AppText style={[styles.count, {flex: 1} as const]}>
          {utils.safeValue(item?.count)}
        </AppText>
        <View style={[styles.barContainer, {flex: 2} as const]}>
          <View style={styles.barBackground}>
            <View style={[styles.barFill, {width: `${ratio * 100}%`}]} />
          </View>
        </View>
      </View>
    )
  }

  const onDatePicker = (type: 'FROMDATE' | 'TODATE') => () => {
    utils.navigate(Screens.name.Modal_DatePicker, {
      callbackDate: value => {
        //Từ ngày phải nhỏ hơn đến ngayf
        const diffDate = moment(value).diff(
          type === 'FROMDATE' ? datePicker.toDate : datePicker.fromDate,
          'days',
          true,
        )

        const isValid = type === 'FROMDATE' ? diffDate <= 0 : diffDate >= 0

        if (!isValid) {
          console.log('Call setDatePicker')
          setDatePicker(old =>
            type === 'FROMDATE'
              ? {...old, fromDate: old.toDate}
              : {...old, toDate: old.fromDate},
          )
          return utils.showMessageFlash({
            message: 'Thông báo',
            description: 'Từ ngày phải nhỏ hơn hoặc bằng Đến ngày',
            icon: 'warning',
            type: 'warning',
          })
        }

        //Từ ngày và đến ngày không vượt quá 12 tháng
        const isWithin12Months =
          Math.abs(
            value.diff(
              type === 'FROMDATE' ? datePicker.toDate : datePicker.fromDate,
              'months',
              true,
            ),
          ) <= 12

        if (isWithin12Months) {
          console.log('Call setDatePicker')
          setDatePicker(old => {
            if (type === 'FROMDATE') {
              return {
                ...old,
                fromDate: value,
              }
            } else {
              return {
                ...old,
                toDate: value,
              }
            }
          })
        } else {
          utils.showMessageFlash({
            message: 'Thông báo',
            description: 'Vui lòng không chọn thời gian vượt quá 12 tháng',
            icon: 'warning',
            type: 'warning',
          })
        }
      },
      selectedDate:
        type === 'FROMDATE' ? datePicker.fromDate : datePicker.toDate,
    })
  }

  return (
    <View style={styles.container}>
      <HeaderWithBack title="Hồ sơ tín dụng giải quyết" />
      <View style={styles.container_date_picker}>
        <View style={styles.container_drop_picker}>
          <AppText>Từ ngày</AppText>
          <TouchableOpacity
            onPress={onDatePicker('FROMDATE')}
            style={styles.picker}>
            <AppText style={styles.placeholder_picker}>
              {moment(datePicker.fromDate).format('DD/MM/YYYY')}
            </AppText>
            <AppImage source={Icons.icCalendar} style={styles.icon_date} />
          </TouchableOpacity>
        </View>
        <View style={styles.container_drop_picker}>
          <AppText>Đến ngày</AppText>
          <TouchableOpacity
            onPress={onDatePicker('TODATE')}
            style={styles.picker}>
            <AppText style={styles.placeholder_picker}>
              {moment(datePicker.toDate).format('DD/MM/YYYY')}
            </AppText>
            <AppImage source={Icons.icCalendar} style={styles.icon_date} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.body, {marginBottom: bottom}]}>
        <View style={styles.header}>
          <AppText style={[styles.headerAppText, {flex: 3} as const]}>
            Tên
          </AppText>
          <AppText style={[styles.headerAppText, {flex: 1} as const]}>
            Hồ sơ
          </AppText>
          <AppText style={[styles.headerAppText, {flex: 2} as const]}>
            Hạng
          </AppText>
        </View>
        <AppFlatList
          horizontalInit={scale(13)}
          data={list.data}
          keyExtractor={(item, index) => `${item.name}_${index}`}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListFooterComponent={
            list.showLoading && (
              <LoadingList theme={THEME} isScrollable={true} />
            )
          }
          refreshing={list.refresh}
          onRefresh={onRefresh}
          onEndReached={list.showLoading ? loadMore : null}
          onEndReachedThreshold={0.1}
          ListEmptyComponent={
            <EmptyListView
              showImageEmpty={!list.refresh}
              textEmpty={list.refresh ? 'Đang tải...' : 'Không có dữ liệu'}
            />
          }
        />
      </View>
    </View>
  )
}

export default CreditResolved

const styleWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: THEME.colors.background,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 6,
    },
    name: {
      fontSize: 14,
      fontWeight: '600',
      color: '#1E293B',
    },
    count: {
      fontSize: 14,
      color: '#475569',
    },
    barContainer: {
      justifyContent: 'center',
    },
    barBackground: {
      height: 8,
      backgroundColor: '#E2E8F0',
      borderRadius: 4,
      overflow: 'hidden',
    },
    barFill: {
      height: '100%',
      backgroundColor: '#4F46E5',
      borderRadius: 4,
    },
    list: {
      padding: scale(13),
      paddingTop: 0,
      //   backgroundColor: THEME.colors.white,
    },
    body: {
      backgroundColor: THEME.colors.white,
      flex: 1,
      margin: scale(13),
      borderRadius: scale(8),
      paddingVertical: scale(2),
      marginTop: 0,
    },
    header: {
      flexDirection: 'row',
      paddingHorizontal: scale(13),
      paddingTop: scale(13),
    },
    headerAppText: {
      fontSize: 12,
      color: '#94A3B8',
      fontWeight: '600',
    },
    icon_date: {
      width: scale(20),
      height: scale(20),
      resizeMode: 'contain',
    },
    container_date_picker: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: scale(10),
      margin: scale(13),
    },
    picker: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: THEME.colors.white,
      borderRadius: scale(10),
      padding: scale(10),
    },
    placeholder_picker: {
      flex: 1,
    },
    container_drop_picker: {
      flex: 1,
      gap: scale(5),
    },
    emptyBase: {
      paddingVertical: scale(30),
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyText: {
      color: THEME.colors.text.secondary,
    },
  })
