import {StyleSheet, View} from 'react-native'
import React, {useCallback, useEffect, useState} from 'react'
import {AppTheme} from '~/styles/Theme'
import {useAppStyles} from '~/hooks'
import {PieChart} from 'react-native-svg-charts'
import AppText from '~/components/AppText'
import {scale} from '~/utils/scaleScreen'
import {EmptyFileView} from '~/screens/components'

type DebtStructureItem = {
  content: string
  goalCount: number
}

type PieDataItem = {
  key: number
  value: number
  name: string
  svg: {
    fill: string
    onPress?: () => void
  }
}

type DebtStructureChartProps = {
  data: DebtStructureItem[]
}

const DebtStructureChart = ({data}: DebtStructureChartProps) => {
  const {THEME} = useAppStyles()
  const styles = useCallback(styleWithTheme, [THEME])(THEME)
  const [pieData, setPieData] = useState<PieDataItem[]>([])

  const chartColors = THEME.colors.statistical
  const colorKeys = Object.keys(chartColors)

  const randomColor = () =>
    ('#' + Math.floor(Math.random() * 0xffffff).toString(16) + '000000').slice(
      0,
      7,
    )

  useEffect(() => {
    const parsedData: PieDataItem[] = data.map((item, index) => ({
      key: index + 1,
      value: item.goalCount,
      name: item.content,
      svg: {
        fill: chartColors[colorKeys[index % colorKeys.length]] || randomColor(),
      },
    }))
    setPieData(parsedData)
  }, [data])

  const total = pieData.reduce((sum, item) => sum + item.value, 0)

  const renderDescription = () => {
    return (
      <View>
        {pieData.map((item, index) => (
          <View key={index} style={styles.row_desciption}>
            <View
              style={[styles.dot_description, {backgroundColor: item.svg.fill}]}
            />
            <AppText style={styles.cardText}>
              {item.name} ({item.value})
            </AppText>
          </View>
        ))}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Cơ cấu dư nợ</AppText>
      <View style={styles.row}>
        {data.length === 0 ? (
          <View style={styles.emptyBase}>
            <EmptyFileView />
          </View>
        ) : (
          <>
            <View style={styles.chartContainer}>
              <PieChart
                style={styles.chart}
                data={pieData}
                padAngle={0.03}
                animate
                animationDuration={1000}
              />
              <View style={styles.inner_title} pointerEvents="box-none">
                <AppText style={styles.chartText}>{`Tổng\n${total}`}</AppText>
              </View>
            </View>
            <View style={styles.container_description}>
              {renderDescription()}
            </View>
          </>
        )}
      </View>
    </View>
  )
}

export default DebtStructureChart

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
      marginBottom: 12,
      color: '#1E293B',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    inner_title: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
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
    },
    chartText: {
      textAlign: 'center',
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
    cardText: {
      color: '#99B2C6',
      marginLeft: THEME.sizes.mg5,
    },
    emptyBase: {
      flex: 1,
      alignItems: 'center',
    },
  })
