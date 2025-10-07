import {StyleSheet, View} from 'react-native'
import React, {useCallback, useRef} from 'react'
import {AppTheme} from '~/styles/Theme'
import {useAppStyles} from '~/hooks'
import AppHeader from '~/components/AppHeader'
import {Icons} from '~/assets'
import {scale} from '~/utils/scaleScreen'
import utils from '~/utils'
import AppScrollViewBody from '~/components/AppScrollViewBody'
import PersonHandleCard from '../components/PersonHandleCard'
import BoxView from '~/hoc/BoxView'
import AppText from '~/components/AppText'
import {FONTSFAMILY} from '~/styles/FontsFamily'
import AppInput from '~/components/AppInput'
import OptionSend, {OptionSendRef} from '../components/OptionSend'
import AppButton from '~/components/AppButton'
import useActionTaskQTD from '../hooks/useActionTaskQTD'

const RejectTaskScreen = props => {
  const taskId: string = utils.ngetParam(props, 'taskId', null)
  const {THEME} = useAppStyles()
  const styles = useCallback(styleWithTheme, [THEME])(THEME)
  const refSend = useRef<OptionSendRef>(null)

  const onBack = () => utils.goBackNavigation()
  const refInput = useRef('')

  const onChangeText = (value: string) => (refInput.current = value)
  const {rejectingTask} = useActionTaskQTD()

  const onSubmit = () => {
    const valueSend = refSend.current?.getValue()
    const contentHandle = refInput.current
    utils.log('RejectTaskScreen', {
      valueSend: valueSend,
      contentHandle: contentHandle,
    })

    const type = refSend.current?.getValue()

    const {sms, email} = type
    const typeSend = [email && 'email', sms && 'sms'].filter(Boolean).join(',')

    rejectingTask({
      taskId: taskId,
      content: refInput.current,
      typeSend: typeSend,
    })
  }

  return (
    <View style={styles.container}>
      <AppHeader
        title="Từ chối công việc"
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
          <PersonHandleCard
            no={1}
            fullName="Nguyễn Văn A"
            position="Trưởng phòng"
            dept="Phòng tín dụng"
          />
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

export default RejectTaskScreen

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
    },
  })
