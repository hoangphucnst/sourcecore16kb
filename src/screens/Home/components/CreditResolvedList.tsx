/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useMemo} from 'react'
import {View, StyleSheet, ListRenderItem, TouchableOpacity} from 'react-native'
import AppFlatList from '~/components/AppFlatList'
import AppIconVector from '~/components/AppIconVector'
import AppText from '~/components/AppText'
import {useAppStyles} from '~/hooks'
import {Screens} from '~/screens/Screens'
import {FONTSFAMILY} from '~/styles/FontsFamily'
import {AppTheme} from '~/styles/Theme'
import utils from '~/utils'
import {scale} from '~/utils/scaleScreen'

type CreditResolvedItem = {
  userId: number
  fullName: string
  count: number
}

type Props = {
  data: CreditResolvedItem[]
}

const CreditResolvedList = ({data = []}: Props) => {
  const {THEME} = useAppStyles()
  const styles = useCallback(styleWithTheme, [THEME])(THEME)

  const MAX_COUNT = useMemo(
    () => Math.max(...data.map(item => item.count), 1),
    [data],
  )

  const renderItem: ListRenderItem<CreditResolvedItem> = ({item}) => {
    const ratio = item.count / MAX_COUNT

    return (
      <View style={styles.row}>
        <AppText style={[styles.name, {flex: 3}]}>{item.fullName}</AppText>
        <AppText style={[styles.count, {flex: 1}]}>{item.count}</AppText>
        <View style={[styles.barContainer, {flex: 2}]}>
          <View style={styles.barBackground}>
            <View style={[styles.barFill, {width: `${ratio * 100}%`}]} />
          </View>
        </View>
      </View>
    )
  }

  const onShowDetails = () => utils.navigate(Screens.name.CreditResolved)

  return (
    <View style={styles.container}>
      <View style={styles.view_header}>
        <AppText style={styles.title}>Hồ sơ tín dụng giải quyết</AppText>
        <TouchableOpacity onPress={onShowDetails}>
          <AppText style={styles.title_button_more}>
            Xem thêm{' '}
            <AppIconVector.SimpleLineIcons
              name="arrow-right"
              size={scale(12)}
            />
          </AppText>
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <AppText style={[styles.headerAppText, {flex: 3}]}>Tên</AppText>
        <AppText style={[styles.headerAppText, {flex: 1}]}>Hồ sơ</AppText>
        <AppText style={[styles.headerAppText, {flex: 2}]}>Hạng</AppText>
      </View>

      <AppFlatList
        scrollEnabled={false}
        data={data}
        keyExtractor={item => `${item.userId}`}
        renderItem={renderItem}
        ListFooterComponent={
          <View style={styles.emptyBase}>
            {data.length === 0 && (
              <AppText style={styles.emptyText}>Không có dữ liệu</AppText>
            )}
          </View>
        }
      />
    </View>
  )
}

export default CreditResolvedList

const styleWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: THEME.colors.white,
      borderWidth: 0.5,
      borderRadius: 8,
      marginTop: 10,
      borderColor: '#d1d1d1',
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
      color: '#1E293B',
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      marginBottom: 6,
    },
    headerAppText: {
      fontSize: 12,
      color: '#94A3B8',
      fontWeight: '600',
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
    view_header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      paddingBottom: scale(10),
    },
    title_button_more: {
      color: THEME.colors.primary,
      fontFamily: FONTSFAMILY.NunitoSemiBoldItalic,
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
