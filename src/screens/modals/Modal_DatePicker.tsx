import React, {useRef, useState} from 'react'
import utils from '~/utils'
import {useAppStyles} from '~/hooks'
import moment from 'moment'
import StyledFilterContainer from '../components/StyledFilterContainer'
import CustomDatePicker from '~/components/CustomDatePicker'
import {StyleSheet} from 'react-native'

const Modal_DatePicker = props => {
  const key_params = ['title', 'selectedDate', 'callbackDate']
  const default_params = {
    title: 'Chọn thời gian',
    selectedDate: null,
    callbackDate: () => {},
  }
  const {
    title,
    selectedDate: selectedDate_params,
    callbackDate,
  } = utils.ngetParams(props, key_params, default_params)

  const {THEME} = useAppStyles()
  const styles = ModalStyles(THEME)

  const datePickerRef = useRef(null)
  const [selectedDate, setSelectedDate] = useState(
    selectedDate_params ? selectedDate_params : moment(),
  )

  const handleDateChange = newDate => {
    setSelectedDate(newDate)
  }

  return (
    <StyledFilterContainer
      title={title}
      onApply={() => {
        utils.goBackNavigation()
        callbackDate(selectedDate)
      }}
      nameButtonApply={'Chọn'}
      onReset={() => {
        utils.goBackNavigation()
      }}
      nameButtonReset={'Hủy'}>
      <CustomDatePicker
        ref={datePickerRef}
        minYear={1960}
        maxYear={2100}
        defaultValue={selectedDate}
        heightWrapper={120}
        heightItem={40}
        onDateChange={handleDateChange}
        onlyHour={false}
        ishour={false}
        itemTextStyle={styles.text_datePicker}
      />
    </StyledFilterContainer>
  )
}

export default Modal_DatePicker

const ModalStyles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    text_datePicker: {
      color: colors.text.primary,
    },
  })
}
