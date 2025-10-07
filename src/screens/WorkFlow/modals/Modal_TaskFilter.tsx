/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, View} from 'react-native'
import React, {useEffect, useRef} from 'react'
import StyledFilterContainer from '~/screens/components/StyledFilterContainer'
import CustomInput, {CustomInputRef} from '~/screens/components/CustomInput'
import utils from '~/utils'
import {Screens} from '~/screens/Screens'
import {scale} from '~/utils/scaleScreen'
import {
  STATUS_TASK_QTD,
  TYPE_PROCESSS_TASK_QTD,
  TYPE_TASK_QTD,
} from '~/constants'

export const LIST_STATUS_TASK_QTD = [
  'Tất cả',
  ...Object.values(STATUS_TASK_QTD),
]

export const LIST_TYPE_TASK_QTD = ['Tất cả', ...Object.values(TYPE_TASK_QTD)]

export const LIST_TYPE_PROCESSS_TASK_QTD = [
  'Tất cả',
  ...Object.values(TYPE_PROCESSS_TASK_QTD),
]

export interface Filter {
  statusTask: string | null
  typeTask: string | null
  statusPerson: string | null
  deadlineStart: string | null
  deadlineTo: string | null
}

const Modal_TaskFilter = props => {
  const defaultFilter: Filter = {
    statusTask: LIST_STATUS_TASK_QTD[0],
    typeTask: LIST_TYPE_TASK_QTD[0],
    statusPerson: LIST_TYPE_PROCESSS_TASK_QTD[0],
    deadlineStart: null,
    deadlineTo: null,
  }

  const refFilter = useRef<Filter>({...defaultFilter})
  const refStatusTask = useRef<CustomInputRef>(null)
  const refTypeTask = useRef<CustomInputRef>(null)
  const refStatusPerson = useRef<CustomInputRef>(null)
  const refDeadlineStart = useRef<CustomInputRef>(null)
  const refDeadlineTo = useRef<CustomInputRef>(null)

  const {onApplyFilter: onApplyFilter_params, filter: filter_params} =
    utils.ngetParams(props, ['onApplyFilter', 'filter'], {
      onApplyFilter: () => {},
      filter: {...defaultFilter},
    })

  const reset_filter_params = (filter_input: Filter) => {
    const isSame =
      JSON.stringify(filter_input) === JSON.stringify(defaultFilter)
    if (!isSame) {
      // Update data
      refFilter.current.statusTask = filter_input.statusTask
      refFilter.current.typeTask = filter_input.typeTask
      refFilter.current.statusPerson = filter_input.statusPerson
      refFilter.current.deadlineStart = filter_input.deadlineStart
      refFilter.current.deadlineTo = filter_input.deadlineTo
      // Update UI
      refStatusTask.current?.changeSelectedInput(filter_input.statusTask)
      refTypeTask.current?.changeSelectedInput(filter_input.typeTask)
      refStatusPerson.current?.changeSelectedInput(filter_input.statusPerson)
      refDeadlineStart?.current?.changeSelectedInput(
        filter_input.deadlineStart === null
          ? ''
          : utils.formatDate(filter_input.deadlineStart),
      )
      refDeadlineTo?.current?.changeSelectedInput(
        filter_input.deadlineTo === null
          ? ''
          : utils.formatDate(filter_input.deadlineTo),
      )
    } else {
      return defaultFilter
    }
  }

  useEffect(() => {
    reset_filter_params(filter_params)
  }, [filter_params])

  useEffect(() => {
    refStatusTask?.current?.changeSelectedInput(refFilter.current.statusTask)
    refTypeTask?.current?.changeSelectedInput(refFilter.current.typeTask)
    refStatusPerson?.current?.changeSelectedInput(
      refFilter.current.statusPerson,
    )
  }, [])

  const onSelectStatusTask = () => {
    utils.navigate(Screens.name.Modal_DropdownPicker, {
      // Date
      title: 'Chọn trạng thái công việc',
      data: LIST_STATUS_TASK_QTD,
      selectedOption: refFilter.current.statusTask,
      callbackSelectOption: value => {
        // UI
        refStatusTask?.current?.changeSelectedInput(value)
        // Save data
        refFilter.current.statusTask = value
      },
    })
  }

  const onSelectTypeTask = () => {
    utils.navigate(Screens.name.Modal_DropdownPicker, {
      // Date
      title: 'Chọn loại công việc',
      data: LIST_TYPE_TASK_QTD,
      selectedOption: refFilter.current.typeTask,
      callbackSelectOption: value => {
        // UI
        refTypeTask?.current?.changeSelectedInput(value)
        // Save data
        refFilter.current.typeTask = value
      },
    })
  }

  const onSelectStatusPerson = () => {
    utils.navigate(Screens.name.Modal_DropdownPicker, {
      // Date
      title: 'Chọn trạng thái cá nhân',
      data: LIST_TYPE_PROCESSS_TASK_QTD,
      selectedOption: refFilter.current.statusPerson,
      callbackSelectOption: value => {
        // UI
        refStatusPerson?.current?.changeSelectedInput(value)
        // Save data
        refFilter.current.statusPerson = value
      },
    })
  }

  const onPickDeadlineStart = () => {
    utils.navigate(Screens.name.Modal_DatePicker, {
      callbackDate: value => {
        // utils.log('⚠️ deadlineStart', value)
        // utils.log('⚠️ deadlineTo', refFilter.current.deadlineTo)
        // utils.log(
        //   '✅ isValidDateRange',
        //   utils.isValidDateRange(value, refFilter.current.deadlineTo),
        // )
        if (
          refFilter.current.deadlineTo !== null &&
          !utils.isValidDateRange(value, refFilter.current.deadlineTo)
        ) {
          utils.showMessageFlash({
            message: 'Thông báo',
            description:
              'Ngày tạo (đến ngày) không thể nhỏ hơn ngày tạo (từ ngày)',
            icon: 'warning',
            type: 'warning',
          })

          refDeadlineStart?.current?.changeSelectedInput(
            utils.formatDate(refFilter.current.deadlineStart),
          )
          refFilter.current.deadlineTo = refFilter.current.deadlineStart
        } else {
          refDeadlineStart?.current?.changeSelectedInput(
            utils.formatDate(value),
          )
          refFilter.current.deadlineStart = value
        }
      },
    })
  }
  const onPickDeadlineTo = () => {
    utils.navigate(Screens.name.Modal_DatePicker, {
      callbackDate: value => {
        // utils.log('⚠️ deadlineStart', refFilter.current.deadlineStart)
        // utils.log('⚠️ deadlineTo', value)
        // utils.log(
        //   '✅ isValidDateRange',
        //   utils.isValidDateRange(refFilter.current.deadlineStart, value),
        // )
        if (
          refFilter.current.deadlineStart !== null &&
          !utils.isValidDateRange(refFilter.current.deadlineStart, value)
        ) {
          utils.showMessageFlash({
            message: 'Thông báo',
            description:
              'Ngày tạo (đến ngày) không thể nhỏ hơn ngày tạo (từ ngày)',
            icon: 'warning',
            type: 'warning',
          })

          refDeadlineTo?.current?.changeSelectedInput(
            utils.formatDate(refFilter.current.deadlineStart),
          )
          refFilter.current.deadlineTo = refFilter.current.deadlineStart
        } else {
          refDeadlineTo?.current?.changeSelectedInput(utils.formatDate(value))
          refFilter.current.deadlineTo = value
        }
      },
    })
  }

  const onReset = () => {
    // Reset data
    refFilter.current = {...defaultFilter}

    // Reset UI
    refStatusTask.current?.changeSelectedInput(defaultFilter.statusTask)
    refTypeTask.current?.changeSelectedInput(defaultFilter.typeTask)
    refStatusPerson.current?.changeSelectedInput(defaultFilter.statusPerson)
    refDeadlineStart?.current?.changeSelectedInput(defaultFilter.deadlineStart)
    refDeadlineTo?.current?.changeSelectedInput(defaultFilter.deadlineTo)

    onApplyFilter_params(defaultFilter)
    utils.goBackNavigation()
  }

  return (
    <StyledFilterContainer
      onReset={onReset}
      onApply={() => {
        onApplyFilter_params(refFilter.current)
        utils.goBackNavigation()
      }}>
      <CustomInput
        ref={refStatusTask}
        title="Trạng thái công việc"
        typeInput="Dropdown"
        onPress={onSelectStatusTask}
      />
      <CustomInput
        ref={refTypeTask}
        title="Loại công việc"
        typeInput="Dropdown"
        onPress={onSelectTypeTask}
      />
      <CustomInput
        ref={refStatusPerson}
        title="Trạng thái cá nhân"
        typeInput="Dropdown"
        onPress={onSelectStatusPerson}
      />
      <View style={{flexDirection: 'row', gap: scale(10)}}>
        <View style={{flex: 1}}>
          <CustomInput
            ref={refDeadlineStart}
            title="Hạn chót (Từ ngày)"
            typeInput="Date"
            onPress={onPickDeadlineStart}
          />
        </View>
        <View style={{flex: 1}}>
          <CustomInput
            ref={refDeadlineTo}
            title="Hạn chót (Đến ngày)"
            typeInput="Date"
            onPress={onPickDeadlineTo}
          />
        </View>
      </View>
    </StyledFilterContainer>
  )
}

export default Modal_TaskFilter

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = StyleSheet.create({})
