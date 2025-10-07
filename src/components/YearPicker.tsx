import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react'
import {View, StyleSheet} from 'react-native'
import moment from 'moment'
import ScrollPicker, {ScrollPickerHandle} from './ScrollPicker'
import AppText from './AppText'
import {useAppStyles} from '~/hooks'
import {scaleFont} from '~/utils/scaleScreen'
import {FONTSFAMILY} from '~/styles/FontsFamily'
import utils from '~/utils'

export type YearPickerProps = {
  minYear: number
  maxYear: number
  defaultValue?: moment.Moment
  heightWrapper?: number
  heightItem?: number
  highlightColor?: string
  activeItemTextStyle?: object
  itemTextStyle?: object
  onYearChange?: (year: number) => void
}

export type YearPickerRef = {
  setYear: (year: number) => void
}

const YearPicker = forwardRef<YearPickerRef, YearPickerProps>(
  (
    {
      minYear,
      maxYear,
      defaultValue,
      heightWrapper = 100,
      heightItem = 50,
      highlightColor = 'gray',
      activeItemTextStyle = {color: 'black'},
      itemTextStyle = {},
      onYearChange = () => {},
    },
    ref,
  ) => {
    const {THEME} = useAppStyles()
    const styles = stylesWithTheme(THEME)

    const refYear = useRef<ScrollPickerHandle>(null)
    const [selectedYear, setSelectedYear] = useState(
      defaultValue?.year() || moment().year(),
    )
    const [selectedIndexYear, setSelectedIndexYear] = useState(-1)

    const renderYears = () => {
      const years: number[] = []
      for (let i = minYear; i <= maxYear; i++) {
        years.push(i)
      }
      return years.reverse()
    }

    utils.log('YearPicker -> defaultValue', defaultValue)

    useEffect(() => {
      const years = renderYears()
      const idx = years.findIndex(y => y === selectedYear)
      setSelectedIndexYear(idx)
      setTimeout(() => {
        refYear.current?.scrollToTargetIndex(idx)
      }, 300)
    }, [])

    useImperativeHandle(ref, () => ({
      setYear: (year: number) => {
        setSelectedYear(year)
        const idx = renderYears().findIndex(y => y === year)
        setSelectedIndexYear(idx)
        refYear.current?.scrollToTargetIndex(idx)
      },
    }))

    useEffect(() => {
      onYearChange && onYearChange(selectedYear)
    }, [selectedYear])

    return (
      <View style={styles.container}>
        <ScrollPicker
          ref={refYear}
          dataSource={renderYears()}
          selectedIndex={selectedIndexYear}
          onValueChange={(data, index) => {
            setSelectedYear(data)
            setSelectedIndexYear(index)
          }}
          wrapperHeight={heightWrapper}
          wrapperBackground="#FFFFFF"
          itemHeight={heightItem}
          highlightColor={highlightColor}
          highlightBorderWidth={1}
          activeItemTextStyle={activeItemTextStyle}
          itemTextStyle={itemTextStyle}
          styleHighlight={styles.highlight}
          headerScroll={
            <View style={styles.header}>
              <AppText style={styles.headerText}>{'Năm'}</AppText>
            </View>
          }
        />
      </View>
    )
  },
)
YearPicker.displayName = 'YearPicker'
export default YearPicker

const stylesWithTheme = (THEME: any) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    highlight: {
      borderRadius: 8,
      backgroundColor: '#F2F2F2',
    },
    header: {
      alignItems: 'center',
      paddingBottom: 4,
    },
    headerText: {
      fontSize: scaleFont(18),
      color: THEME.colors.text_primary,
      fontFamily: FONTSFAMILY.NunitoBold,
    },
  })
