import React, {useEffect, useRef, useState} from 'react'
import utils from '~/utils'
import {useAppStyles} from '~/hooks'
import StyledFilterContainer from '../components/StyledFilterContainer'
import YearPicker, {YearPickerRef} from '~/components/YearPicker'
import {StyleSheet} from 'react-native'
import moment from 'moment'

const Modal_YearPicker = props => {
  const key_params = ['title', 'selectedYear', 'callbackYear']
  const default_params = {
    title: 'Chọn năm',
    selectedYear: moment().year(),
    callbackYear: () => {},
  }
  const {
    title,
    statusbar_bg,
    statusbar_content,
    selectedYear: selectedYearParams,
    callbackYear,
  } = utils.ngetParams(props, key_params, default_params)

  const {THEME} = useAppStyles()
  const styles = ModalStyles(THEME)

  const yearPickerRef = useRef<YearPickerRef>(null)
  const [selectedYear, setSelectedYear] = useState(selectedYearParams)

  useEffect(() => {
    if (selectedYearParams) {
      setSelectedYear(selectedYearParams)
    }
  }, [selectedYearParams])

  const handleYearChange = year => {
    setSelectedYear(year)
  }

  return (
    <StyledFilterContainer
      title={title}
      statusBar={{
        background: statusbar_bg,
        style: statusbar_content,
      }}
      onApply={() => {
        utils.goBackNavigation()
        callbackYear(selectedYear)
      }}
      nameButtonApply={'Chọn'}
      onReset={() => {
        utils.goBackNavigation()
      }}
      nameButtonReset={'Hủy'}>
      <YearPicker
        ref={yearPickerRef}
        minYear={1960}
        maxYear={new Date().getFullYear()}
        defaultValue={moment().year(selectedYear)}
        onYearChange={handleYearChange}
        heightWrapper={120}
        heightItem={40}
        itemTextStyle={styles.text_yearPicker}
      />
    </StyledFilterContainer>
  )
}

export default Modal_YearPicker

const ModalStyles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    text_yearPicker: {
      color: colors.text.primary,
    },
  })
}
