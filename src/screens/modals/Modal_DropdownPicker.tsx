import {StyleSheet, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import utils from '~/utils'
import {useAppStyles} from '~/hooks'
import {scale, scaleFont} from '~/utils/scaleScreen'
import AppText from '~/components/AppText'
import {Fontsfamily} from '~/styles/FontsFamily'
import StyledFilterContainer, {
  StyledFilterContainerRef,
} from '../components/StyledFilterContainer'

const Modal_DropdownPicker = props => {
  const key_params = ['title', 'data', 'selectedOption', 'callbackSelectOption']
  const defaul_params = {
    title: 'Chọn',
    data: [],
    selectedOption: null,
    callbackSelectOption: () => {},
  }
  const {
    title,
    data,
    selectedOption: option_params,
    callbackSelectOption,
  } = utils.ngetParams(props, key_params, defaul_params)

  const styles = ModalStyles()
  const fixedData = Array.isArray(data) ? data : Object.values(data)

  const [selectedOption, setSelectedOption] = useState(
    option_params === null ? data[0] : option_params,
  )

  const refStyledFilterContainer = useRef<StyledFilterContainerRef>(null)

  useEffect(() => {
    setSelectedOption(option_params === null ? data[0] : option_params)
  }, [data])

  return (
    <StyledFilterContainer
      ref={refStyledFilterContainer}
      showBottom={false}
      title={title}>
      <View style={{gap: scale(8)}}>
        {fixedData.length > 0 &&
          fixedData.map((option, index) => {
            const isSelected = selectedOption === option
            return (
              <TouchableOpacity
                key={`Option_${index}`}
                onPress={() => {
                  setSelectedOption(option)
                  refStyledFilterContainer?.current?.callbackClose({
                    callback: () => {
                      callbackSelectOption(option)
                      utils.goBackNavigation()
                    },
                  })
                }}>
                <View
                  style={isSelected ? styles.button : styles.button_notCheck}>
                  <AppText
                    style={isSelected ? styles.text : styles.text_notCheck}>
                    --- {option} ---
                  </AppText>
                </View>
              </TouchableOpacity>
            )
          })}
      </View>
    </StyledFilterContainer>
  )
}

export default Modal_DropdownPicker

const ModalStyles = () => {
  const {THEME} = useAppStyles()
  const {colors, radius} = THEME
  return StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.table.background,
      padding: scale(8),
    },
    button_notCheck: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius.xl,
      padding: scale(8),
    },
    text: {
      color: colors.primary,
      fontSize: scaleFont(16),
      fontFamily: Fontsfamily.Nunito.Bold,
    },
    text_notCheck: {
      color: colors.text.primary,
      fontSize: scaleFont(16),
    },
  })
}
