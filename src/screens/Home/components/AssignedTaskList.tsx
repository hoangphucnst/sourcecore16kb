import {StyleSheet, View} from 'react-native'
import React from 'react'
import {useAppStyles} from '~/hooks'
import {PieChart} from 'react-native-svg-charts'
import AppText from '~/components/AppText'
import {scale} from '~/utils/scaleScreen'
import {AssignedTaskStats} from '~/services/apis/dashboardService'

type PieDataItem = {
  key: number
  value: number
  name: string
  svg: {
    fill: string
  }
}

type Props = {
  data?: AssignedTaskStats | null
}

const AssignedTaskList = ({data}: Props) => {
  const {THEME} = useAppStyles()
  const styles = Styles()

  const labelMap: Record<keyof AssignedTaskStats, string> = {
    EvaluationRequired: 'Cần đánh giá',
    ApprovalRequired: 'Cần phê duyệt',
    DueSoon: 'Sắp đến hạn',
    Overdue: 'Quá hạn',
    NotDueYet: 'Chưa đến hạn',
  }

  const colorKeys = [
    'statistical_1',
    'statistical_2',
    'statistical_3',
    'statistical_4',
    'statistical_5',
  ]

  const stats = data ?? {
    EvaluationRequired: 0,
    ApprovalRequired: 0,
    DueSoon: 0,
    Overdue: 0,
    NotDueYet: 0,
  }

  const pieData: PieDataItem[] = Object.entries(stats)
    .filter(([_, value]) => value >= 0)
    .map(([key, value], index) => ({
      key: index + 1,
      value,
      name: labelMap[key as keyof AssignedTaskStats],
      svg: {
        fill:
          THEME.colors.statistical[colorKeys[index % colorKeys.length]] ||
          '#ccc',
      },
    }))

  const isAllZero = pieData.every(item => item.value === 0)

  const renderDescription = () => (
    <View>
      {pieData.map((item, index) => (
        <View key={index} style={styles.row_description}>
          <View
            style={[styles.dot_description, {backgroundColor: item.svg.fill}]}
          />
          <AppText
            style={[styles.description_text, styles.description_spacing]}>
            {item.name} ({item.value})
          </AppText>
        </View>
      ))}
    </View>
  )

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Công việc đã giao</AppText>
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

export default AssignedTaskList

const Styles = () => {
  const {THEME} = useAppStyles()
  const {colors, sizes} = THEME

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
    chartContainer: {
      height: scale(150),
      width: scale(150),
    },
    chart: {
      height: '100%',
      transform: [{rotate: '90deg'}],
    },
    container_description: {
      flex: 1,
      paddingLeft: 10,
    },
    row_description: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    dot_description: {
      height: 10,
      width: 10,
      borderRadius: 5,
    },
    description_text: {
      color: '#99B2C6',
    },
    description_spacing: {
      marginLeft: sizes.mg5,
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
