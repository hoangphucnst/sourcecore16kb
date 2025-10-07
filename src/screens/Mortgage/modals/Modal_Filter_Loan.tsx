/* eslint-disable react-native/no-inline-styles */
import {Keyboard, TextInput, View} from 'react-native'
import React, {useEffect, useRef} from 'react'
import {useAppStyles} from '~/hooks'
import {scale} from '~/utils/scaleScreen'
import utils from '~/utils'
import CustomInput, {CustomInputRef} from '~/screens/components/CustomInput'
import {Screens} from '~/screens/Screens'
import StyledFilterContainer from '~/screens/components/StyledFilterContainer'

export interface Filter {
  mortgageContractCode: string
  mortgageOwner: string
  amount: string
  fromDate: string | null
  toDate: string | null
}

const Modal_Filter_Loan = props => {
  const {onApplyFilter: onApplyFilter_params, filter: filter_params} =
    utils.ngetParams(props, ['onApplyFilter', 'filter'], {
      onApplyFilter: () => {},
      filter: {
        mortgageContractCode: '',
        mortgageOwner: '',
        amount: '',
        fromDate: null,
        toDate: null,
      },
    })

  // ================================================================
  const {THEME} = useAppStyles()
  const {colors} = THEME

  const refProfileCode = useRef<TextInput>(null)
  const refFullName = useRef<TextInput>(null)
  const refLoanAmount = useRef<TextInput>(null)

  const refCreatedDate_fromDate = useRef<CustomInputRef>(null)
  const refCreatedDate_toDate = useRef<CustomInputRef>(null)

  const defaultFilter: Filter = {
    mortgageContractCode: '',
    mortgageOwner: '',
    amount: '',
    fromDate: null,
    toDate: null,
  }
  const refFilter = useRef<Filter>(defaultFilter)

  const reset_filter_params = (filter_input: Filter) => {
    const isSame =
      JSON.stringify(filter_input) === JSON.stringify(defaultFilter)
    if (!isSame) {
      // Update data
      refFilter.current.mortgageContractCode = filter_input.mortgageContractCode
      refFilter.current.mortgageOwner = filter_input.mortgageOwner
      refFilter.current.amount = filter_input.amount
      refFilter.current.fromDate = filter_input.fromDate
      refFilter.current.toDate = filter_input.toDate
      // // Update UI
      refProfileCode.current?.setNativeProps({
        text: filter_input.mortgageContractCode,
      })
      refFullName.current?.setNativeProps({text: filter_input.mortgageOwner})
      refLoanAmount.current?.setNativeProps({
        text: utils.formatMoney(filter_input.amount),
      })
      refCreatedDate_fromDate?.current?.changeSelectedInput(
        filter_input.fromDate === null
          ? ''
          : utils.formatDate(filter_input.fromDate),
      )
      refCreatedDate_toDate?.current?.changeSelectedInput(
        filter_input.toDate === null
          ? ''
          : utils.formatDate(filter_input.toDate),
      )
    } else {
      refFilter.current = defaultFilter
    }
  }

  useEffect(() => {
    reset_filter_params(filter_params)
  }, [filter_params])

  const onReset = () => {
    // Update UI
    refFilter.current = {
      mortgageContractCode: '',
      mortgageOwner: '',
      amount: '',
      fromDate: null,
      toDate: null,
    }

    // Update Data
    refProfileCode.current?.setNativeProps({text: ''})
    refFullName.current?.setNativeProps({text: ''})
    refLoanAmount.current?.setNativeProps({text: ''})
    refCreatedDate_fromDate?.current?.changeSelectedInput(null)
    refCreatedDate_toDate?.current?.changeSelectedInput(null)

    Keyboard.dismiss()

    onApplyFilter_params(refFilter.current)
    utils.goBackNavigation()
  }

  const onApplyFilter = () => {
    Keyboard.dismiss()
    onApplyFilter_params(refFilter.current)
    utils.goBackNavigation()
  }

  const onPick_CreatedDate_FromDate = () => {
    utils.navigate(Screens.name.Modal_DatePicker, {
      callbackDate: value => {
        // UI
        refCreatedDate_fromDate?.current?.changeSelectedInput(
          utils.formatDate(value),
        )
        // Save data
        refFilter.current.fromDate = value

        utils.log('FromDate', {date: value})

        if (
          refFilter.current.toDate !== null &&
          !utils.isValidDateRange(value, refFilter.current.toDate)
        ) {
          utils.showMessageFlash({
            message: 'Thông báo',
            description:
              'Ngày tạo (từ ngày) không thể lớn hơn ngày tạo (đến ngày)',
            icon: 'warning',
            type: 'warning',
          })

          refCreatedDate_fromDate?.current?.changeSelectedInput(
            utils.formatDate(refFilter.current.toDate),
          )
          refFilter.current.fromDate = refFilter.current.toDate
        } else {
          refCreatedDate_fromDate?.current?.changeSelectedInput(
            utils.formatDate(value),
          )
          refFilter.current.fromDate = value
        }
      },
      selectedDate: refFilter.current.fromDate,
    })
  }

  const onPick_CreatedDate_ToDate = () => {
    utils.navigate(Screens.name.Modal_DatePicker, {
      callbackDate: value => {
        if (
          refFilter.current.fromDate !== null &&
          !utils.isValidDateRange(refFilter.current.fromDate, value)
        ) {
          utils.showMessageFlash({
            message: 'Thông báo',
            description:
              'Ngày tạo (đến ngày) không thể nhỏ hơn ngày tạo (từ ngày)',
            icon: 'warning',
            type: 'warning',
          })

          refCreatedDate_toDate?.current?.changeSelectedInput(
            utils.formatDate(refFilter.current.fromDate),
          )
          refFilter.current.toDate = refFilter.current.fromDate
        } else {
          refCreatedDate_toDate?.current?.changeSelectedInput(
            utils.formatDate(value),
          )
          refFilter.current.toDate = value
        }
      },
      selectedDate: refFilter.current.toDate,
    })
  }

  return (
    <StyledFilterContainer
      statusBar={{
        background: colors.primary,
        style: 'light-content',
      }}
      onApply={onApplyFilter}
      onReset={onReset}>
      {/* <CustomInput
        title="Mã hồ sơ"
        onChangeText={_ => {
          refFilter.current.mortgageContractCode = _
        }}
        textRef={refProfileCode}
      /> */}
      <CustomInput
        title="Họ và tên"
        onChangeText={_ => {
          refFilter.current.mortgageOwner = _
        }}
        textRef={refFullName}
      />
      <CustomInput
        typeInput="Money"
        title="ĐB số tiền"
        onChangeText={_ => {
          refFilter.current.amount = _
        }}
        textRef={refLoanAmount}
      />
      <View style={{flexDirection: 'row', gap: scale(10)}}>
        <View style={{flex: 1}}>
          <CustomInput
            ref={refCreatedDate_fromDate}
            title="Ngày tạo (Từ ngày)"
            typeInput="Date"
            statusbar_content="light-content"
            onPress={onPick_CreatedDate_FromDate}
          />
        </View>
        <View style={{flex: 1}}>
          <CustomInput
            ref={refCreatedDate_toDate}
            title="Ngày tạo (Đến ngày)"
            typeInput="Date"
            statusbar_content="light-content"
            onPress={onPick_CreatedDate_ToDate}
          />
        </View>
      </View>
    </StyledFilterContainer>
  )
}

export default Modal_Filter_Loan
