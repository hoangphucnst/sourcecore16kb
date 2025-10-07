import {StyleSheet, View} from 'react-native'
import React, {useCallback} from 'react'
import {AppTheme} from '~/styles/Theme'
import {useAppStyles} from '~/hooks'
import {PieChart} from 'react-native-svg-charts'
import AppText from '~/components/AppText'
import {scale} from '~/utils/scaleScreen'

type PieDataItem = {
  key: number
  value: number
  name: string
  svg: {
    fill: string
    onPress?: () => void
  }
}

const PieChartKitHalf = () => {
  const {THEME} = useAppStyles()
  const styles = useCallback(styleWithTheme, [THEME])(THEME)

  const data: PieDataItem[] = [
    {
      key: 1,
      value: 10,
      name: 'Thông tin 1',
      svg: {
        fill: THEME.colors.statistical.statistical_1,
        onPress: () => console.log('press'),
      },
    },
    {
      key: 2,
      name: 'Thông tin 2',
      value: 10,
      svg: {fill: THEME.colors.statistical.statistical_2},
    },
    {
      key: 3,
      name: 'Thông tin 3',
      value: 10,
      svg: {fill: THEME.colors.statistical.statistical_3},
    },
    {
      key: 4,
      name: 'Thông tin 4',
      value: 20,
      svg: {fill: THEME.colors.statistical.statistical_4},
    },
    {key: 5, name: '', value: 50, svg: {fill: '#ffffff'}},
  ]

  const renderDescription = () => {
    return (
      <View>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.row_desciption}>
              <View
                style={[
                  styles.dot_description,
                  {backgroundColor: item.svg.fill},
                ]}
              />
              <AppText
                key={index}
                style={{
                  color: '#99B2C6',
                  marginLeft: THEME.sizes.mg5,
                }}>
                {item.name}
              </AppText>
            </View>
          )
        })}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Cơ cấu dư nợ</AppText>
      <View style={styles.row}>
        <View style={styles.chartContainer}>
          <PieChart
            style={styles.chart}
            data={data}
            padAngle={0.03}
            animate={true}
            animationDuration={1000}
          />
        </View>
        <View style={styles.container_description}>{renderDescription()}</View>
      </View>
    </View>
  )
}

export default PieChartKitHalf

const styleWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
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
  })
