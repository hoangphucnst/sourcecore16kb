/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, View} from 'react-native'
import React, {useCallback, useRef} from 'react'
import {AppTheme} from '~/styles/Theme'
import {useAppStyles} from '~/hooks'
import AppHeader from '~/components/AppHeader'
import {Icons} from '~/assets'
import {scale} from '~/utils/scaleScreen'
import utils from '~/utils'
import BoxView from '~/hoc/BoxView'
import AppText from '~/components/AppText'
import {FONTSFAMILY} from '~/styles/FontsFamily'
import AppInput from '~/components/AppInput'
import AppButton from '~/components/AppButton'
import AppScrollViewBody from '~/components/AppScrollViewBody'
import PersonHandleCard from '../DetailCredit/components/PersonHandleCard'
import OptionSend, {OptionSendRef} from '../DetailCredit/components/OptionSend'
import useDetailCreditContract from '../hooks/useDetailCreditContract'
import {DashLine} from '~/screens/components'
import useActionOnCreditContract from '../hooks/useActionOnCreditContract'

const ReturnToInitiator = props => {
  const {creditIdEncode} = utils.ngetParams(props, ['creditIdEncode'], {
    creditIdEncode: null,
  })
  const {detailCreditContract} = useDetailCreditContract({
    creditIdEncode: creditIdEncode,
  })

  const listHandler = detailCreditContract?.generalInfoScreen?.handlers || []

  const {THEME} = useAppStyles()
  const styles = Styles()
  const refSend = useRef<OptionSendRef>(null)

  const onBack = () => utils.goBackNavigation()
  const refInput = useRef('')

  const {returnToInitiator, sendFeedback} = useActionOnCreditContract()

  const onChangeText = (value: string) => (refInput.current = value)

  const onSubmit = () => {
    // const valueSend = refSend.current?.getValue()
    const feedback = refInput.current
    returnToInitiator({
      creditIdEncode: creditIdEncode,
      feedback: feedback,
    }).then(() => {
      refInput.current === ''
    })
  }

  return (
    <View style={styles.container}>
      <AppHeader
        title="Trả lại"
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
        {/* {Danh sách người thực hiện} */}
        <BoxView>
          <AppText style={styles.title}>Danh sách người thực hiện</AppText>
          {listHandler.map((item, index) => {
            return (
              <PersonHandleCard
                key={`Handler_${item?.departmentName}_${index}`}
                no={1}
                fullName={utils.safeValue(item?.fullName)}
                position={utils.safeValue(item?.roleName)}
                dept={utils.safeValue(item?.departmentName)}
              />
            )
          })}
        </BoxView>

        {/* {Ý kiến xử lý} */}
        <BoxView style={{marginTop: scale(10)}}>
          <AppText style={styles.title}>Ý kiến:</AppText>
          <AppInput
            style={styles.input}
            placeholder="Nhập ý kiến xử lý"
            multiline
            onChangeText={onChangeText}
          />
          {/* <OptionSend ref={refSend} /> */}
          <AppButton
            onPress={onSubmit}
            title="Trả lại"
            styleButton={styles.button}
            styleTitle={{color: THEME.colors.white}}
          />
        </BoxView>
      </AppScrollViewBody>
    </View>
  )
}

export default ReturnToInitiator

const Styles = () => {
  const {THEME} = useAppStyles()
  return StyleSheet.create({
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
      marginTop: scale(20),
      alignSelf: 'center',
      paddingHorizontal: scale(20),
      borderRadius: scale(6),
    },
  })
}
