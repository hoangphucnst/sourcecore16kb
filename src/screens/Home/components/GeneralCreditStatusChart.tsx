/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native'
import React from 'react'
import {useAppStyles} from '~/hooks'
import {PieChart} from 'react-native-svg-charts'
import AppText from '~/components/AppText'
import {scale} from '~/utils/scaleScreen'
import {CreditCategoryStatus} from '~/services/apis/dashboardService'

type PieDataItem = {
  key: number
  value: number
  name: string
  svg: {
    fill: string
  }
}

type Props = {
  data: CreditCategoryStatus
}

const GeneralCreditStatusChart = ({data}: Props) => {
  const {THEME} = useAppStyles()
  const styles = Styles()

  const labelMap = {
    Return: 'Đã trả',
    DueSoon: 'Sắp đến hạn',
    Overdue: 'Quá hạn',
    NotDueYet: 'Chưa đến hạn',
  }

  const colorKeys = [
    'statistical_1',
    'statistical_2',
    'statistical_3',
    'statistical_4',
  ]

  const fallbackData: CreditStatusInput = {
    Return: 0,
    DueSoon: 0,
    Overdue: 0,
    NotDueYet: 0,
  }

  const safeData = data ?? fallbackData

  const rawItems = Object.entries(safeData) as [
    keyof CreditStatusInput,
    number,
  ][]

  const pieData: PieDataItem[] = rawItems
    .filter(([_, value]) => value >= 0)
    .map(([key, value], index) => ({
      key: index + 1,
      value,
      name: labelMap[key],
      svg: {
        fill:
          THEME.colors.statistical[colorKeys[index % colorKeys.length]] ||
          '#ccc',
      },
    }))

  const isAllZero = rawItems.every(([_, value]) => value === 0)

  const renderDescription = () => (
    <View>
      {pieData.map((item, index) => (
        <View key={index} style={styles.row_desciption}>
          <View
            style={[styles.dot_description, {backgroundColor: item.svg.fill}]}
          />
          <AppText
            style={{
              color: '#99B2C6',
              marginLeft: THEME.sizes.mg5,
            }}>
            {item.name} ({item.value})
          </AppText>
        </View>
      ))}
    </View>
  )

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Hồ sơ tín dụng chung</AppText>
      <View style={styles.row}>
        <View style={styles.chartContainer}>
          {isAllZero && (
            <View style={styles.emptyBase}>
              <AppText style={styles.emptyText}>Không có dữ liệu</AppText>
            </View>
          )}
          <PieChart
            style={styles.chart}
            data={pieData}
            padAngle={0.03}
            animate
            animationDuration={1000}
          />
        </View>
        <View style={styles.container_description}>{renderDescription()}</View>
      </View>
    </View>
  )
}

export default GeneralCreditStatusChart

const Styles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: '#fff',
      borderWidth: 0.5,
      borderRadius: 8,
      marginTop: 10,
      borderColor: '#d1d1d1',
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 12,
      color: '#1E293B',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    container_description: {
      flex: 1,
      paddingLeft: 10,
    },
    chartContainer: {
      height: scale(150),
      width: scale(150),
    },
    chart: {
      height: '100%',
      transform: [{rotate: '90deg'}],
      marginTop: 0,
    },
    dot_description: {
      height: 10,
      width: 10,
      borderRadius: 5,
    },
    row_desciption: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    emptyBase: {
      paddingTop: scale(30),
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyText: {
      color: colors.text.secondary,
    },
  })
}
