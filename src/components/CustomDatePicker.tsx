import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react'
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native'
import moment from 'moment'
import ScrollPicker, {ScrollPickerHandle} from './ScrollPicker'
import {useAppStyles} from '~/hooks'
import AppText from './AppText'
import {AppTheme} from '~/styles/Theme'

export type TypeDatePickerProps = {
  minYear: number
  maxYear: number
  defaultValue?: moment.Moment
  heightWrapper?: number
  heightItem?: number
  ishour?: boolean
  highlightColor?: string
  activeItemTextStyle?: object
  itemTextStyle?: object
  onDateChange?: (value: moment.Moment) => void
  onlyHour?: boolean
}
export type TypeRefCustomDatePickerProps = {
  setValue?: (date: moment.Moment) => void
}

const CustomDatePicker = forwardRef<
  TypeRefCustomDatePickerProps,
  TypeDatePickerProps
>(
  (
    {
      minYear,
      maxYear,
      defaultValue,
      heightWrapper = 100,
      heightItem = 50,
      ishour = true,
      highlightColor = 'gray',
      activeItemTextStyle = {color: 'black'},
      itemTextStyle = {},
      onDateChange = () => {},
      onlyHour = true,
    },
    ref,
  ) => {
    const {THEME} = useAppStyles()
    const styles = stylesWithTheme(THEME)
    const currentYear = new Date().getFullYear()
    const defaultMaxYear = 2999
    const [selectedDay, setSelectedDay] = useState(
      moment(defaultValue, 'DD/MM/YYYY HH:mm', true).date() || moment().date(),
    )
    const [selectedMonth, setSelectedMonth] = useState(
      moment(defaultValue, 'DD/MM/YYYY HH:mm', true).month() + 1 ||
        moment().month() + 1,
    )
    const [selectedYear, setSelectedYear] = useState(
      moment(defaultValue, 'DD/MM/YYYY HH:mm', true).year() || currentYear,
    )
    const [selectedHours, setSelectedHours] = useState(
      moment(defaultValue, 'DD/MM/YYYY HH:mm', true).hour() || currentYear,
    )
    const [selectedMinutes, setSelectedMinutes] = useState(
      moment(defaultValue, 'DD/MM/YYYY HH:mm', true).minute() || currentYear,
    )
    const [selectedIndexDay, setSelectedIndexDay] = useState(-1)
    const [selectedIndexMonth, setSelectedIndexMonth] = useState(-1)
    const [selectedIndexYear, setSelectedIndexYear] = useState(-1)
    const [selectedIndexHours, setSelectedIndexHours] = useState(-1)
    const [selectedIndexMinute, setSelectedIndexMinute] = useState(-1)
    const refDay = useRef<ScrollPickerHandle>(null)
    const refMonth = useRef<ScrollPickerHandle>(null)
    const refYear = useRef<ScrollPickerHandle>(null)
    const refHours = useRef<ScrollPickerHandle>(null)
    const refMinutes = useRef<ScrollPickerHandle>(null)

    useImperativeHandle(ref, () => ({
      setValue: (date: moment.Moment) => {
        const parsedDate = moment(date, 'DD/MM/YYYY HH:mm')
        if (parsedDate.isValid()) {
          setSelectedDay(parsedDate.date())
          setSelectedMonth(parsedDate.month() + 1)
          setSelectedYear(parsedDate.year())
          setSelectedHours(parsedDate.hour())
          setSelectedMinutes(parsedDate.minute())

          const iDay = renderDays().findIndex(
            e => e === parsedDate.date().toString().padStart(2, '0'),
          )
          const iMonth = renderMonths().findIndex(
            e => e === parsedDate.month() + 1,
          )
          const iYear = renderYears().findIndex(e => e === parsedDate.year())
          const iHours = renderHours().findIndex(
            e => e === parsedDate.hour().toString().padStart(2, '0'),
          )
          const iMinutes = renderMinutes().findIndex(
            e => e === parsedDate.minute().toString().padStart(2, '0'),
          )
          setSelectedIndexDay(iDay)
          setSelectedIndexMonth(iMonth)
          setSelectedIndexYear(iYear)
          setSelectedIndexHours(iHours)
          setSelectedIndexMinute(iMinutes)
          refDay.current && refDay.current.scrollToTargetIndex(iDay)
          refMonth.current && refMonth.current.scrollToTargetIndex(iMonth)
          refYear.current && refYear.current.scrollToTargetIndex(iYear)
          refHours.current && refHours.current.scrollToTargetIndex(iHours)
          refMinutes.current && refMinutes.current.scrollToTargetIndex(iMinutes)
        } else {
          console.log('Invalid date:', date)
        }
      },
    }))

    useEffect(() => {
      loadValue()
    }, [])

    const loadValue = () => {
      if (defaultValue) {
        const parsedDate = moment(defaultValue, 'DD/MM/YYYY HH:mm')
        if (parsedDate.isValid()) {
          setSelectedDay(parsedDate.date())
          setSelectedMonth(parsedDate.month() + 1)
          setSelectedYear(parsedDate.year())
          setSelectedHours(parsedDate.hour())
          setSelectedMinutes(parsedDate.minute())

          const iDay = renderDays().findIndex(
            e => e === parsedDate.date().toString().padStart(2, '0'),
          )
          const iMonth = renderMonths().findIndex(
            e => e === parsedDate.month() + 1,
          )
          const iYear = renderYears().findIndex(e => e === parsedDate.year())
          const iHours = renderHours().findIndex(
            e => e === parsedDate.hour().toString().padStart(2, '0'),
          )
          const iMinutes = renderMinutes().findIndex(
            e => e === parsedDate.minute().toString().padStart(2, '0'),
          )
          setSelectedIndexDay(iDay)
          setSelectedIndexMonth(iMonth)
          setSelectedIndexYear(iYear)
          setSelectedIndexHours(iHours)
          setSelectedIndexMinute(iMinutes)
          refDay.current && refDay.current.scrollToTargetIndex(iDay)
          refMonth.current && refMonth.current.scrollToTargetIndex(iMonth)
          refYear.current && refYear.current.scrollToTargetIndex(iYear)
          refHours.current && refHours.current.scrollToTargetIndex(iHours)
          refMinutes.current && refMinutes.current.scrollToTargetIndex(iMinutes)
        } else {
          console.log('Invalid date:', defaultValue)
        }
      }
    }

    useEffect(() => {
      const result = moment(
        `${selectedDay}/${selectedMonth}/${selectedYear}/${selectedHours}/${selectedMinutes}`,
        'DD/MM/YYYY HH:mm HH:mm',
      )
      onDateChange && onDateChange(result)
    }, [
      selectedDay,
      selectedMonth,
      selectedYear,
      selectedHours,
      selectedMinutes,
    ])

    const daysInMonth = (month: number, year: number) => {
      return new Date(year, month, 0).getDate()
    }

    const renderDays = () => {
      const numDays = daysInMonth(selectedMonth, selectedYear)
      const days = []
      for (let i = 1; i <= numDays; i++) {
        days.push(i.toString().padStart(2, '0'))
      }
      return days
    }

    const renderMonths = () => {
      const months = []
      for (let i = 1; i <= 12; i++) {
        months.push(i)
      }
      return months
    }

    const renderYears = () => {
      const years = []
      const max = maxYear || defaultMaxYear
      for (let i = max; i >= minYear; i--) {
        years.push(i)
      }
      return years.reverse()
    }

    const renderHours = () => {
      const hours = []
      for (let i = 23; i >= 0; i--) {
        hours.push(i.toString().padStart(2, '0'))
      }
      return hours.reverse()
    }

    const renderMinutes = () => {
      const minutes = []
      for (let i = 59; i >= 0; i--) {
        minutes.push(i.toString().padStart(2, '0'))
      }
      return minutes.reverse()
    }

    const renderMonthItem = (
      data: number,
      index: number,
      isSelected: boolean,
    ) => {
      return (
        <Text style={[isSelected ? activeItemTextStyle : itemTextStyle]}>
          Tháng {data}
        </Text>
      )
    }

    useEffect(() => {
      const dayArr = renderDays()
      const numericDayArr: number[] = dayArr.map(day => parseInt(day, 10))

      if (selectedDay > dayArr.length) {
        setSelectedDay(numericDayArr[dayArr.length - 1])
        const iDay = dayArr.findIndex(e => e === dayArr[dayArr.length - 1])
        setSelectedIndexDay(iDay)
        refDay?.current && refDay?.current?.scrollToTargetIndex(iDay)
      }
    }, [renderDays, selectedDay, selectedMonth, selectedYear])

    return (
      <>
        <View style={styles.container}>
          {selectedIndexDay >= 0 &&
          selectedIndexMonth >= 0 &&
          selectedIndexYear >= 0 ? (
            <>
              {!onlyHour && (
                <>
                  <ScrollPicker
                    ref={refDay}
                    dataSource={renderDays().map(year =>
                      year.toString().padStart(2, '0'),
                    )}
                    selectedIndex={selectedIndexDay}
                    onValueChange={(data, selectedIndex) => {
                      setSelectedDay(Number(data))
                      setSelectedIndexDay(selectedIndex)
                    }}
                    wrapperHeight={heightWrapper}
                    wrapperBackground="#FFFFFF"
                    itemHeight={heightItem}
                    highlightColor={highlightColor}
                    highlightBorderWidth={1}
                    activeItemTextStyle={activeItemTextStyle}
                    itemTextStyle={itemTextStyle}
                    styleHighlight={[styles.stHilight, styles.hight_light_left]}
                    headerScroll={
                      <View style={styles.stViewHead}>
                        <AppText style={styles.stHeaderTime}>{'Ngày'}</AppText>
                      </View>
                    }
                  />
                  <ScrollPicker
                    ref={refMonth}
                    dataSource={renderMonths()}
                    selectedIndex={selectedIndexMonth}
                    onValueChange={(data, selectedIndex) => {
                      setSelectedMonth(data)
                      setSelectedIndexMonth(selectedIndex)
                    }}
                    renderItem={renderMonthItem}
                    wrapperHeight={heightWrapper}
                    wrapperBackground="#FFFFFF"
                    itemHeight={heightItem}
                    highlightColor={highlightColor}
                    highlightBorderWidth={1}
                    activeItemTextStyle={activeItemTextStyle}
                    itemTextStyle={itemTextStyle}
                    styleHighlight={styles.stHilight}
                    headerScroll={
                      <View style={styles.stViewHead}>
                        <AppText style={styles.stHeaderTime}>{'Tháng'}</AppText>
                      </View>
                    }
                  />
                  <ScrollPicker
                    ref={refYear}
                    dataSource={renderYears()}
                    selectedIndex={selectedIndexYear}
                    onValueChange={(data, selectedIndex) => {
                      setSelectedYear(data)
                      setSelectedIndexYear(selectedIndex)
                    }}
                    wrapperHeight={heightWrapper}
                    wrapperBackground="#FFFFFF"
                    itemHeight={heightItem}
                    highlightColor={highlightColor}
                    highlightBorderWidth={1}
                    activeItemTextStyle={activeItemTextStyle}
                    itemTextStyle={itemTextStyle}
                    styleHighlight={[
                      styles.stIsHour,
                      !ishour && styles.hight_light_right,
                    ]}
                    headerScroll={
                      <View style={styles.stViewHead}>
                        <AppText style={styles.stHeaderTime}>{'Năm'}</AppText>
                      </View>
                    }
                  />
                </>
              )}
              {/* Ngày giời */}
              {ishour && (
                <>
                  <ScrollPicker
                    ref={refHours}
                    dataSource={renderHours()}
                    selectedIndex={selectedIndexHours}
                    onValueChange={(data, selectedIndex) => {
                      setSelectedHours(Number(data))
                      setSelectedIndexHours(selectedIndex)
                    }}
                    wrapperHeight={heightWrapper}
                    wrapperBackground="#FFFFFF"
                    itemHeight={heightItem}
                    highlightColor={highlightColor}
                    highlightBorderWidth={1}
                    activeItemTextStyle={activeItemTextStyle}
                    itemTextStyle={itemTextStyle}
                    styleHighlight={[
                      styles.stIsHour,
                      onlyHour && styles.hight_light_left,
                    ]}
                    headerScroll={
                      <View style={styles.stViewHead}>
                        <AppText style={styles.stHeaderTime}>{'Giờ'}</AppText>
                      </View>
                    }
                  />
                  {/* <Components.AppIconVector.EntypoIcon name="dots-two-vertical" size={THEME.sizes.icon_18} /> */}
                  <ScrollPicker
                    ref={refMinutes}
                    dataSource={renderMinutes()}
                    selectedIndex={selectedIndexMinute}
                    onValueChange={(data, selectedIndex) => {
                      setSelectedMinutes(Number(data))
                      setSelectedIndexMinute(selectedIndex)
                    }}
                    wrapperHeight={heightWrapper}
                    wrapperBackground="#FFFFFF"
                    itemHeight={heightItem}
                    highlightColor={highlightColor}
                    highlightBorderWidth={1}
                    activeItemTextStyle={activeItemTextStyle}
                    itemTextStyle={itemTextStyle}
                    styleHighlight={[
                      styles.stHilight,
                      styles.hight_light_right,
                    ]}
                    headerScroll={
                      <View style={styles.sHealScoll}>
                        <AppText style={styles.stHeaderTime}>{'Phút'}</AppText>
                      </View>
                    }
                  />
                </>
              )}
              {/* </View> */}
            </>
          ) : (
            <View
              style={[styles.stIndicator, style_heightWrapper(heightWrapper)]}>
              <ActivityIndicator size="large" color={THEME.colors.primary} />
            </View>
          )}
        </View>
      </>
    )
  },
)

CustomDatePicker.defaultProps = {
  minYear: 2000,
}

const style_heightWrapper = (height: number) => {
  return {height: height + 35}
}

const stylesWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    stHilight: {
      backgroundColor: '#F2F2F2',
    },
    hight_light_left: {
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
    },
    sHealScoll: {
      borderBottomColor: 'rgba(0,0,0,0.2)',
      borderBottomWidth: 0.5,
      paddingBottom: THEME.sizes.pd10,
    },
    stHeaderTime: {
      textAlign: 'center',
      fontWeight: 'bold',
    },
    stViewHead: {
      borderBottomColor: 'rgba(0,0,0,0.2)',
      borderBottomWidth: 0.5,
      paddingBottom: THEME.sizes.pd10,
    },
    stIndicator: {
      // height: heightWrapper + 35,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    hight_light_right: {
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
    },
    stIsHour: {
      backgroundColor: '#F2F2F2',
    },
  })
CustomDatePicker.displayName = 'CustomDatePicker'
export default CustomDatePicker
