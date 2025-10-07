import {StyleSheet, View} from 'react-native'
import React, {useCallback, useRef, useState} from 'react'
import {AppTheme} from '~/styles/Theme'
import {useAppStyles} from '~/hooks'
import AppHeader from '~/components/AppHeader'
import {Icons} from '~/assets'
import {scale} from '~/utils/scaleScreen'
import utils from '~/utils'
import AppScrollViewBody from '~/components/AppScrollViewBody'
import BoxView from '~/hoc/BoxView'
import AppText from '~/components/AppText'
import {FONTSFAMILY} from '~/styles/FontsFamily'
import AppInput from '~/components/AppInput'
import AppButton from '~/components/AppButton'
import OptionSend, {OptionSendRef} from '../DetailCredit/components/OptionSend'
import useActionOnCreditContract from '../hooks/useActionOnCreditContract'
import {TYPE_RETURN} from '~/constants'
import {DashLine, TouchDropDown} from '~/screens/components'
import {Screens} from '~/screens/Screens'

export const LIST_TYPE_REJECT = [TYPE_RETURN.important, TYPE_RETURN.bug]

const RejectCreditContract = props => {
  const {creditIdEncode} = utils.ngetParams(props, ['creditIdEncode'], {
    creditIdEncode: null,
  })

  const {THEME} = useAppStyles()
  const styles = useCallback(styleWithTheme, [THEME])(THEME)
  const refSend = useRef<OptionSendRef>(null)
  const refInput = useRef('')
  const {reject} = useActionOnCreditContract()
  const [typeReturn, setTypeReturn] = useState(LIST_TYPE_REJECT[0])

  const onBack = () => utils.goBackNavigation()

  const onChangeText = (value: string) => (refInput.current = value)

  const onSubmit = () => {
    const content = refInput.current

    const type = refSend.current?.getValue()

    const {sms, email} = type
    const typeSend = [email && 'email', sms && 'sms'].filter(Boolean).join(',')

    utils.log('RejectCreditContract -> chưa gắn typeSend do API', {
      typeSend: typeSend,
    })
    reject({
      creditIdEncode: creditIdEncode,
      feedback: content,
      typeReturn: typeReturn,
    })
  }

  const onSelectTypeReject = () => {
    utils.navigate(Screens.name.Modal_DropdownPicker, {
      title: 'Chọn lý do từ chối',
      data: LIST_TYPE_REJECT,
      selectedOption: typeReturn,
      callbackSelectOption: value => {
        setTypeReturn(value)
      },
    })
  }

  return (
    <View style={styles.container}>
      <AppHeader
        title="Từ chối hợp đồng tín dụng"
        styleHeader={styles.header}
        styleTitle={{color: THEME.colors.white}}
        iconLeft={Icons.icBack}
        styleIconLeft={{
          width: scale(24),
          height: scale(24),
          tintColor: THEME.colors.white,
        }}
        onPressLeft={onBack}
      />
      <AppScrollViewBody
        horizontalInit={scale(10)}
        contentContainerStyle={styles.content}>
        {/* {Ý kiến xử lý} */}
        <BoxView style={{marginTop: scale(10)}}>
          <AppText style={styles.title}>
            Lý do từ chối<AppText style={styles.redTxt}>*</AppText>
          </AppText>
          <TouchDropDown value={typeReturn} onPress={onSelectTypeReject} />
          <DashLine />
          <AppText style={styles.title}>
            Ý kiến<AppText style={styles.redTxt}>*</AppText>
          </AppText>
          <AppInput
            style={styles.input}
            placeholder="Nhập ý kiến xử lý"
            multiline
            onChangeText={onChangeText}
          />
          <OptionSend ref={refSend} />
          <AppButton
            onPress={onSubmit}
            title="Từ chối"
            styleButton={styles.button}
            styleTitle={{color: THEME.colors.white}}
          />
        </BoxView>
      </AppScrollViewBody>
    </View>
  )
}

export default RejectCreditContract

const styleWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: THEME.colors.background,
    },
    header: {
      backgroundColor: THEME.colors.primary,
    },
    content: {
      paddingTop: THEME.sizes.pd10,
    },
    title: {
      fontFamily: FONTSFAMILY.NunitoExtraBold,
      color: THEME.colors.primary,
      marginBottom: THEME.sizes.mg10,
    },
    input: {
      borderWidth: 0.5,
      borderColor: THEME.colors.border,
      textAlignVertical: 'top',
      padding: THEME.sizes.pd10,
      paddingTop: scale(10),
      borderRadius: scale(10),
      height: scale(100),
    },
    button: {
      alignSelf: 'center',
      paddingHorizontal: scale(20),
      marginTop: scale(20),
    },
    redTxt: {
      color: 'red',
    },
  })
