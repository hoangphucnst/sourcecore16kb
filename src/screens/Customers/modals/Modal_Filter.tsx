import {Keyboard, KeyboardAvoidingView, Platform, TextInput} from 'react-native'
import React, {useCallback, useEffect, useRef} from 'react'
import {CUSTOMER_STATUS} from '~/constants'
import CustomInput, {CustomInputRef} from '~/screens/components/CustomInput'
import utils from '~/utils'
import {Screens} from '~/screens/Screens'
import StyledFilterContainer from '~/screens/components/StyledFilterContainer'

export interface Filter {
  customerCode: string
  fullName: string
  address: string
  dateOfBirth: string | null
  cccd: string
  status: string | null
}

const LIST_STATUS_CUSTOMER = [
  CUSTOMER_STATUS.ALL,
  CUSTOMER_STATUS.UNLOCK,
  CUSTOMER_STATUS.LOCK,
]

const Modal_Filter_Customers = props => {
  const defaultFilter = {
    customerCode: '',
    fullName: '',
    address: '',
    dateOfBirth: null,
    cccd: '',
    status: LIST_STATUS_CUSTOMER[0],
  }

  const {onApplyFilter: onApplyFilter_params, filter: filter_params} =
    utils.ngetParams(props, ['onApplyFilter', 'filter'], {
      onApplyFilter: () => {},
      filter: {...defaultFilter},
    })

  // Filter data
  const refFilter = useRef<Filter>({...defaultFilter})

  const reset_filter_params = (filter_input: Filter) => {
    const isSame =
      JSON.stringify(filter_input) === JSON.stringify(defaultFilter)
    if (!isSame) {
      // // Update data
      refFilter.current.customerCode = filter_input.customerCode
      refFilter.current.fullName = filter_input.fullName
      refFilter.current.address = filter_input.address
      refFilter.current.cccd = filter_input.cccd
      refFilter.current.status = filter_input.status
      refFilter.current.dateOfBirth = filter_input.dateOfBirth
      // // Update UI
      refCodeCustomer.current?.setNativeProps({text: filter_input.customerCode})
      refFullName.current?.setNativeProps({text: filter_input.fullName})
      refAddress.current?.setNativeProps({text: filter_input.address})
      refCCCD.current?.setNativeProps({text: filter_input.cccd})
      refDate?.current?.changeSelectedInput(
        filter_input.dateOfBirth === null
          ? ''
          : utils.formatDate(filter_input.dateOfBirth),
      )
      refStatus?.current?.changeSelectedInput(filter_input.status)
    } else {
      return defaultFilter
    }
  }

  useEffect(() => {
    reset_filter_params(filter_params)
  }, [filter_params])

  // UI controler
  const refCodeCustomer = useRef<TextInput>(null)
  const refFullName = useRef<TextInput>(null)
  const refAddress = useRef<TextInput>(null)
  const refCCCD = useRef<TextInput>(null)
  const refStatus = useRef<CustomInputRef>(null)
  const refDate = useRef<CustomInputRef>(null)

  useEffect(() => {
    refStatus?.current?.changeSelectedInput(refFilter.current.status)
  }, [])

  const onDatePick = useCallback(() => {
    utils.navigate(Screens.name.Modal_DatePicker, {
      callbackDate: value => {
        // UI
        refDate?.current?.changeSelectedInput(utils.formatDate(value))
        // Save data
        refFilter.current.dateOfBirth = value
      },
      selectedDate: refFilter.current.dateOfBirth,
    })
  }, [filter_params])

  const onSelectStatus = () => {
    utils.navigate(Screens.name.Modal_DropdownPicker, {
      // Date
      title: 'Chọn trạng thái',
      data: LIST_STATUS_CUSTOMER,
      selectedOption: refFilter.current.status,
      callbackSelectOption: value => {
        // UI
        refStatus?.current?.changeSelectedInput(value)
        // Save data
        refFilter.current.status = value
      },
    })
  }

  const onReset = () => {
    refCodeCustomer.current?.setNativeProps({text: defaultFilter.customerCode})
    refFullName.current?.setNativeProps({text: defaultFilter.fullName})
    refAddress.current?.setNativeProps({text: defaultFilter.address})
    refCCCD.current?.setNativeProps({text: defaultFilter.cccd})

    refFilter.current = {...defaultFilter}

    Keyboard.dismiss()

    onApplyFilter_params(refFilter.current)
    utils.navigate(Screens.name.Customers)
  }

  const onApplyFilter = () => {
    Keyboard.dismiss()

    onApplyFilter_params(refFilter.current)
    utils.navigate(Screens.name.Customers)
  }

  return (
    <StyledFilterContainer onApply={onApplyFilter} onReset={onReset}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
        <CustomInput
          title="Mã khách hàng"
          onChangeText={newText => {
            refFilter.current.customerCode = newText
          }}
          textRef={refCodeCustomer}
        />
        <CustomInput
          title="Họ và tên"
          onChangeText={newText => {
            refFilter.current.fullName = newText
          }}
          textRef={refFullName}
        />
        <CustomInput
          title="Địa chỉ"
          onChangeText={newText => {
            refFilter.current.address = newText
          }}
          textRef={refAddress}
        />
        <CustomInput
          ref={refDate}
          title="Ngày sinh"
          typeInput="Date"
          statusbar_content="light-content"
          onPress={onDatePick}
        />
        <CustomInput
          title="CCCD"
          onChangeText={newText => {
            refFilter.current.cccd = newText
          }}
          textRef={refCCCD}
        />
        <CustomInput
          ref={refStatus}
          title="Trạng thái"
          typeInput="Dropdown"
          onPress={onSelectStatus}
        />
      </KeyboardAvoidingView>
    </StyledFilterContainer>
  )
}

export default Modal_Filter_Customers
