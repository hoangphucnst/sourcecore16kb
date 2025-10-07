import React, {useCallback, useEffect, useState} from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {AreaChart, Grid, YAxis} from 'react-native-svg-charts'
import {Circle, Defs, LinearGradient, Stop, Text} from 'react-native-svg'
import * as shape from 'd3-shape'
import {scale, scaleFont} from '~/utils/scaleScreen'
import AppText from '~/components/AppText'
import {useAppStyles} from '~/hooks'
import {AppTheme} from '~/styles/Theme'
import utils from '~/utils'
import {Screens} from '~/screens/Screens'
import useTheme from '~/redux/reduxHooks/useTheme'
import {NavigationEvents} from '@react-navigation/compat'
import {FONTSFAMILY} from '~/styles/FontsFamily'

const MAX_VALUE_CONVERT = 100

type GradientProps = {
  id: string
  color: string
}

const Gradient = ({id, color}: GradientProps) => (
  <Defs key={id}>
    <LinearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <Stop offset="0%" stopColor={color} stopOpacity={0.3} />
      <Stop offset="100%" stopColor={color} stopOpacity={0.1} />
    </LinearGradient>
  </Defs>
)

// Đảm bảo array có 12 phần tử
const normalizeArray = (input?: number[] | null): number[] => {
  if (!input || input.length === 0) return Array(12).fill(0)
  if (input.length < 12) return [...input, ...Array(12 - input.length).fill(0)]
  return input
}

// Chuẩn hóa dữ liệu về khoảng 0 - 100
const normalizeData = (
  data: number[],
  maxValue: number,
  maxHeight = MAX_VALUE_CONVERT,
): number[] => {
  if (maxValue === 0) return data
  return data.map(value => (value / maxValue) * maxHeight)
}

// Định dạng số lớn (K, M, B, T)
const formatLargeNumber = (value: number): string => {
  try {
    const T = 1_000_000_000_000
    const B = 1_000_000_000
    const M = 1_000_000
    const K = 1_000

    if (value >= T) return `${(value / T).toFixed(1)} T`
    if (value >= B)
      return value / B >= 100
        ? `${(value / 1_000_000_000_000).toFixed(1)} T`
        : `${(value / B).toFixed(1)} B`
    if (value >= M)
      return value / M >= 100
        ? `${(value / 1_000_000_000).toFixed(1)} B`
        : `${(value / M).toFixed(1)} M`
    if (value >= K)
      return value / K >= 100
        ? `${(value / 1_000_000).toFixed(1)} M`
        : `${(value / K).toFixed(1)} K`
    return value.toString()
  } catch (error) {
    return value
  }
}

const DebtChart = ({
  totalDebtData = [
    0, 25000, 30000, 50000, 40000, 20000, 30000, 25000, 15000, 35000, 50000, 0,
  ],
  availableFundData = [
    0, 10000, 15000, 20000, 10000, 18000, 20000, 9000, 13000, 20000, 30000, 0,
  ],
  curve = false,
  onSelectYear = () => {},
}: {
  totalDebtData: number[]
  availableFundData: number[]
  curve: boolean
  onSelectYear: (year: number) => void
}) => {
  const {THEME} = useAppStyles()
  const {infoScreen} = useTheme()
  const [chartKey, setChartKey] = useState(utils.generateUUIDv4())
  useEffect(() => {
    setChartKey(utils.generateUUIDv4())
  }, [infoScreen.isLandscape])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const monthsData = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const styles = useCallback(styleWithTheme, [THEME])(THEME)

  const currentYear = new Date().getFullYear()
  const [year, setYear] = useState(currentYear)

  const rawTotalDebtData = normalizeArray(totalDebtData)
  const rawAvailableFundData = normalizeArray(availableFundData)

  const allRawData = [...rawTotalDebtData, ...rawAvailableFundData]
  const yMax = Math.max(...allRawData)
  const yMin = Math.min(...allRawData)

  const combinedMax = Math.max(...rawTotalDebtData, ...rawAvailableFundData)
  const normalizedTotalDebtData = normalizeData(rawTotalDebtData, combinedMax)
  const normalizedAvailableFundData = normalizeData(
    rawAvailableFundData,
    combinedMax,
  )

  const yAxisSteps = utils.generateSteps(yMin, yMax, 7)

  const contentInset = {top: 30, bottom: 10}

  const openYearModal = () => {
    utils.navigate(Screens.name.Modal_YearPicker, {
      selectedYear: year,
      callbackYear: (_year: number) => {
        onSelectYear(_year)
        setYear(_year)
      },
    })
  }

  const onTouchMonthIn = (index: number) => () => {
    setSelectedIndex(index)
  }

  const onTouchMonthOut = () => {
    setSelectedIndex(null)
  }

  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillFocus={() => setChartKey(utils.generateUUIDv4())}
      />
      <View style={styles.row_header}>
        <AppText style={styles.title}>Tổng dư nợ/Vốn sẵn có</AppText>
        <TouchableOpacity
          onPress={openYearModal}
          activeOpacity={0.5}
          style={styles.button_dropdown}>
          <AppText>Năm: {year}</AppText>
        </TouchableOpacity>
      </View>
      <View style={styles.chartRow}>
        <YAxis
          style={{width: scale(30)}}
          data={yAxisSteps}
          contentInset={contentInset}
          svg={{
            fill: '#9db4c0',
            fontSize: 10,
          }}
          numberOfTicks={6}
          formatLabel={(value: number) => formatLargeNumber(value)}
        />
        <View key={chartKey} style={styles.chartArea}>
          <AreaChart
            style={styles.chart}
            data={normalizedTotalDebtData}
            contentInset={contentInset}
            curve={curve ? shape.curveMonotoneY : shape.curveLinear}
            animate
            yMin={0}
            yMax={MAX_VALUE_CONVERT}
            svg={{fill: 'url(#gradientDebt)'}}>
            <Grid />
            <Gradient id="gradientDebt" color="#4FC3F7" />
          </AreaChart>

          <AreaChart
            style={StyleSheet.absoluteFillObject}
            data={normalizedAvailableFundData}
            contentInset={contentInset}
            curve={curve ? shape.curveMonotoneY : shape.curveLinear}
            animate
            yMin={0}
            yMax={MAX_VALUE_CONVERT}
            svg={{fill: 'url(#gradientFund)'}}>
            <Gradient id="gradientFund" color="#4F46E5" />
          </AreaChart>
        </View>
        {selectedIndex != null && (
          <View
            pointerEvents="box-none"
            style={[StyleSheet.absoluteFillObject, styles.description]}>
            <View style={styles.content_descript}>
              <AppText
                style={{
                  textAlign: 'center',
                  fontFamily: FONTSFAMILY.NunitoBold,
                }}>
                Tháng {selectedIndex + 1}
              </AppText>
              <AppText style={styles.text_descript}>
                Nợ: {utils.formatMoney(totalDebtData[selectedIndex])}{' '}
              </AppText>
              <AppText style={styles.text_descript}>
                Vốn: {utils.formatMoney(availableFundData[selectedIndex])}{' '}
              </AppText>
            </View>
          </View>
        )}
      </View>

      <View style={styles.months}>
        {monthsData.map((month, index) => (
          <TouchableOpacity
            key={index}
            onPressIn={onTouchMonthIn(index)}
            onPressOut={onTouchMonthOut}>
            <AppText style={styles.monthAppText}>{month}</AppText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

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
    },
    chartRow: {
      flexDirection: 'row',
      height: scale(150),
    },
    chartArea: {
      flex: 1,
      marginLeft: 5,
    },
    chart: {
      height: scale(150),
    },
    months: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: scale(12),
      paddingLeft: scale(28),
    },
    monthAppText: {
      fontSize: 10,
      color: '#7f9bb3',
    },
    row_header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    button_dropdown: {
      backgroundColor: THEME.colors.white,
      borderWidth: 0.5,
      borderRadius: 8,
      borderColor: '#d1d1d1',
      padding: scale(5),
    },
    description: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    content_descript: {
      backgroundColor: THEME.colors.white,
      padding: scale(5),
      borderRadius: scale(10),
      shadowColor: THEME.colors.black,
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      borderRadius: scale(8),
    },
    text_descript: {
      fontSize: scaleFont(12),
    },
  })

export default DebtChart
