import {StyleSheet, View} from 'react-native'
import React, {useCallback, useState} from 'react'
import {AppTheme} from '~/styles/Theme'
import useAppStyles from '~/hooks/useAppStyles'
import utils from '~/utils'
import AppButton from '~/components/AppButton'
import {scale} from '~/utils/scaleScreen'
import {TYPE_SIGN} from '~/constants'
import StyledFilterContainer, {
  StyledFilterContainerRef,
} from '~/screens/components/StyledFilterContainer'
import {DashLine, TouchDropDown} from '~/screens/components'
import {Screens} from '~/screens/Screens'

const LIST_OPTION = ['Đồng ý', 'Không đồng ý']

const Modal_Credit_OptionSign = props => {
  const {THEME} = useAppStyles()
  const styles = useCallback(styleWithTheme, [THEME])(THEME)
  const callBackPickSign = utils.ngetParam(props, 'onSignCallback', () => {})
  const refModal = React.useRef<StyledFilterContainerRef>(null)
  const [isAgree, setIsAgree] = useState(LIST_OPTION[0])

  const onSign = (type: string) => () => {
    refModal.current?.triggerClose()
    const agree = isAgree === LIST_OPTION[0]
    callBackPickSign(type, agree)
  }

  const onSelect = () => {
    utils.navigate(Screens.name.Modal_DropdownPicker, {
      title: 'Lựa chọn',
      data: LIST_OPTION,
      selectedOption: isAgree,
      callbackSelectOption: value => {
        setIsAgree(value)
      },
    })
  }

  return (
    <StyledFilterContainer
      ref={refModal}
      title={'Chọn phương thức ký'}
      onApply={() => {
        utils.goBackNavigation()
      }}
      showBottom={false}>
      <View style={styles.container}>
        <TouchDropDown value={isAgree} onPress={onSelect} />
        <DashLine />
        <AppButton
          title="Ký thường"
          onPress={onSign(TYPE_SIGN.NORMAL)}
          styleTitle={styles.textbutton}
        />
        <AppButton
          title="Ký Sim CA"
          styleTitle={styles.textbutton}
          onPress={onSign(TYPE_SIGN.SIM_CA)}
        />
        <AppButton
          title="Ký Ca Cloud"
          onPress={onSign(TYPE_SIGN.CA_CLOUD)}
          styleTitle={styles.textbutton}
        />
      </View>
    </StyledFilterContainer>
  )
}

export default Modal_Credit_OptionSign

const styleWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    container: {
      gap: scale(10),
    },
    textbutton: {
      color: THEME.colors.white,
    },
    disable: {
      backgroundColor: THEME.colors.border,
    },
  })
