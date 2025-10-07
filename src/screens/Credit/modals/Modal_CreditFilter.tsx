/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  View,
} from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import StyledFilterContainer from '~/screens/components/StyledFilterContainer'
import CustomInput, {CustomInputRef} from '~/screens/components/CustomInput'
import {scale} from '~/utils/scaleScreen'
import utils from '~/utils'
import {Screens} from '~/screens/Screens'
import {STATUS_CONTRACT_TEXT} from '~/constants'

export interface Filter {
  creditCode: string // Mã hồ sơ
  creditContractNumber: string // Số HĐTD
  fullName: string // Họ và tên
  status: string | null // Trạng thái
  amountFrom: string // Số tiền (từ khoản)
  amountTo: string // Số tiền (đến khoản)
  createdDateFrom: string | null // Ngày tạo (Từ ngày)
  createdDateTo: string | null // Ngày tạo (Đến ngày)
  deadlineFrom: string | null // Hạn chót (Từ ngày)
  deadlineTo: string | null // Hạn chót (Đến ngày)
}

export const LIST_STATUS_CREDIT_CONTRACT: string[] = [
  'Tất cả',
  ...Object.values(STATUS_CONTRACT_TEXT),
]

const Modal_CreditFilter = props => {
  const styles = Styles()

  const defaultFilter: Filter = {
    creditCode: '',
    creditContractNumber: '',
    fullName: '',
    status: LIST_STATUS_CREDIT_CONTRACT[0],
    amountFrom: '',
    amountTo: '',
    createdDateFrom: null,
    createdDateTo: null,
    deadlineFrom: null,
    deadlineTo: null,
  }

  const {onApplyFilter: onApplyFilter_params, filter: filter_params} =
    utils.ngetParams(props, ['onApplyFilter', 'filter'], {
      onApplyFilter: () => {},
      filter: {...defaultFilter},
    })

  const refFilter = useRef<Filter>({...filter_params})

  const refCreditCode = useRef<TextInput>(null)
  const refCreditContractNumber = useRef<TextInput>(null)
  const refFullName = useRef<TextInput>(null)
  const refAmountFrom = useRef<TextInput>(null)
  const refAmountTo = useRef<TextInput>(null)
  const refStatus = useRef<CustomInputRef>(null)
  const refCreatedDateFrom = useRef<CustomInputRef>(null)
  const refCreatedDateTo = useRef<CustomInputRef>(null)
  const refDeadlineFrom = useRef<CustomInputRef>(null)
  const refDeadlineTo = useRef<CustomInputRef>(null)

  const reset_filter_params = (filter_input: Filter) => {
    const isSame =
      JSON.stringify(filter_input) === JSON.stringify(defaultFilter)
    if (!isSame) {
      refFilter.current = {...filter_input}
      refCreditCode.current?.setNativeProps({text: filter_input.creditCode})
      refCreditContractNumber.current?.setNativeProps({
        text: filter_input.creditContractNumber,
      })

      refFullName.current?.setNativeProps({text: filter_input.fullName})
      refAmountFrom.current?.setNativeProps({text: filter_input.amountFrom})
      refAmountTo.current?.setNativeProps({text: filter_input.amountTo})
      refStatus?.current?.changeSelectedInput(filter_input.status)
      refCreatedDateFrom?.current?.changeSelectedInput(
        filter_input.createdDateFrom
          ? utils.formatDate(filter_input.createdDateFrom)
          : '',
      )
      refCreatedDateTo?.current?.changeSelectedInput(
        filter_input.createdDateTo
          ? utils.formatDate(filter_input.createdDateTo)
          : '',
      )
      refDeadlineFrom?.current?.changeSelectedInput(
        filter_input.deadlineFrom
          ? utils.formatDate(filter_input.deadlineFrom)
          : '',
      )
      refDeadlineTo?.current?.changeSelectedInput(
        filter_input.deadlineTo
          ? utils.formatDate(filter_input.deadlineTo)
          : '',
      )
    } else {
      return defaultFilter
    }
  }

  useEffect(() => {
    refStatus.current?.changeSelectedInput(refFilter.current.status)
  }, [])

  useEffect(() => {
    reset_filter_params(filter_params)
  }, [filter_params])

  const onPick_BeginDate_FromDate = () => {
    utils.navigate(Screens.name.Modal_DatePicker, {
      callbackDate: value => {
        // UI
        refCreatedDateFrom?.current?.changeSelectedInput(
          utils.formatDate(value),
        )
        // Save data
        refFilter.current.createdDateFrom = value
      },
      selectedDate: refFilter.current.createdDateFrom,
    })
  }

  const onPick_BeginDate_ToDate = () => {
    utils.navigate(Screens.name.Modal_DatePicker, {
      callbackDate: value => {
        // UI
        refCreatedDateTo?.current?.changeSelectedInput(utils.formatDate(value))
        // Save data
        refFilter.current.createdDateTo = value
      },
      selectedDate: refFilter.current.createdDateTo,
    })
  }

  const onPick_EndDate_FromDate = () => {
    utils.navigate(Screens.name.Modal_DatePicker, {
      callbackDate: value => {
        // UI
        refDeadlineFrom?.current?.changeSelectedInput(utils.formatDate(value))
        // Save data
        refFilter.current.deadlineFrom = value
      },
      selectedDate: refFilter.current.deadlineFrom,
    })
  }

  const onPick_EndDate_ToDate = () => {
    utils.navigate(Screens.name.Modal_DatePicker, {
      callbackDate: value => {
        // UI
        refDeadlineTo?.current?.changeSelectedInput(utils.formatDate(value))
        // Save data
        refFilter.current.deadlineTo = value
      },
      selectedDate: refFilter.current.deadlineTo,
    })
  }

  const onSelectStatus = () => {
    utils.navigate(Screens.name.Modal_DropdownPicker, {
      // Date
      title: 'Chọn trạng thái',
      data: LIST_STATUS_CREDIT_CONTRACT,
      selectedOption: refFilter.current.status,
      callbackSelectOption: value => {
        // UI
        refStatus?.current?.changeSelectedInput(value)
        // Save data
        refFilter.current.status = value
      },
    })
  }

  ///

  const onReset = () => {
    refFilter.current = {...defaultFilter}
    refCreditCode.current?.setNativeProps({text: defaultFilter.creditCode})
    refCreditContractNumber.current?.setNativeProps({
      text: defaultFilter.creditContractNumber,
    })
    refFullName.current?.setNativeProps({text: defaultFilter.fullName})
    refAmountFrom.current?.setNativeProps({text: defaultFilter.amountFrom})
    refAmountTo.current?.setNativeProps({text: defaultFilter.amountTo})
    refStatus?.current?.changeSelectedInput(defaultFilter.status)
    refCreatedDateFrom?.current?.changeSelectedInput(
      defaultFilter.createdDateFrom
        ? utils.formatDate(defaultFilter.createdDateFrom)
        : '',
    )
    refCreatedDateTo?.current?.changeSelectedInput(
      defaultFilter.createdDateTo
        ? utils.formatDate(defaultFilter.createdDateTo)
        : '',
    )
    refDeadlineFrom?.current?.changeSelectedInput(
      defaultFilter.deadlineFrom
        ? utils.formatDate(defaultFilter.deadlineFrom)
        : '',
    )
    refDeadlineTo?.current?.changeSelectedInput(
      defaultFilter.deadlineTo
        ? utils.formatDate(defaultFilter.deadlineTo)
        : '',
    )

    Keyboard.dismiss()

    onApplyFilter_params(refFilter.current)
    utils.goBackNavigation()
  }

  const onApplyFilter = () => {
    Keyboard.dismiss()

    onApplyFilter_params(refFilter.current)
    utils.goBackNavigation()
  }

  return (
    <StyledFilterContainer onApply={onApplyFilter} onReset={onReset}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
        <CustomInput
          textRef={refCreditCode}
          title="Mã hồ sơ"
          onChangeText={_ => {
            refFilter.current.creditCode = _
          }}
        />
        <CustomInput
          textRef={refCreditContractNumber}
          title="Số HĐTD"
          onChangeText={_ => {
            refFilter.current.creditContractNumber = _
          }}
        />
        <CustomInput
          textRef={refFullName}
          title="Họ và tên"
          onChangeText={_ => {
            refFilter.current.fullName = _
          }}
        />
        <CustomInput
          ref={refStatus}
          title="Trạng thái cá nhân"
          typeInput="Dropdown"
          onPress={onSelectStatus}
        />
        <View style={styles.row}>
          <View style={styles.itemRow}>
            <CustomInput
              typeInput="Money"
              title="Số tiền (từ khoản)"
              onChangeText={_ => {
                refFilter.current.amountFrom = _
              }}
            />
          </View>
          <View style={styles.itemRow}>
            <CustomInput
              typeInput="Money"
              title="Số tiền (đến khoản)"
              onChangeText={_ => {
                refFilter.current.amountTo = _
              }}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.itemRow}>
            <CustomInput
              ref={refCreatedDateFrom}
              title="Ngày tạo (Từ ngày)"
              typeInput="Date"
              statusbar_content="light-content"
              onPress={onPick_BeginDate_FromDate}
            />
          </View>
          <View style={styles.itemRow}>
            <CustomInput
              ref={refCreatedDateTo}
              title="Ngày tạo (Đến ngày)"
              typeInput="Date"
              statusbar_content="light-content"
              onPress={onPick_BeginDate_ToDate}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.itemRow}>
            <CustomInput
              ref={refDeadlineFrom}
              title="Hạn chót (Từ ngày)"
              typeInput="Date"
              statusbar_content="light-content"
              onPress={onPick_EndDate_FromDate}
            />
          </View>
          <View style={styles.itemRow}>
            <CustomInput
              ref={refDeadlineTo}
              title="Hạn chót (Đến ngày)"
              typeInput="Date"
              statusbar_content="light-content"
              onPress={onPick_EndDate_ToDate}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </StyledFilterContainer>
  )
}

export default Modal_CreditFilter

const Styles = () => {
  return StyleSheet.create({
    row: {
      width: '100%',
      flexDirection: 'row',
      gap: scale(10),
    },
    itemRow: {
      flex: 1,
    },
  })
}
