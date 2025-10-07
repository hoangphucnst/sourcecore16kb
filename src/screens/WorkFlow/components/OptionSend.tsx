import {StyleSheet, TouchableOpacity, View} from 'react-native'
import React, {useCallback, useImperativeHandle, useState} from 'react'
import {AppTheme} from '~/styles/Theme'
import {useAppStyles} from '~/hooks'
import AppImage from '~/components/AppImage'
import {Icons} from '~/assets'
import {scale} from '~/utils/scaleScreen'
import AppText from '~/components/AppText'

type OptionSendProps = {
  defaultSms?: boolean
  defaultEmail?: boolean
}

export type OptionSendRef = {
  getValue: () => {sms: boolean; email: boolean}
  setValue: ({sms: boolean, email: boolean}) => void
}

const OptionSend = React.forwardRef<OptionSendRef, OptionSendProps>(
  (props, ref) => {
    const {defaultEmail = false, defaultSms = false} = props
    const [sendSms, setSendSms] = useState(defaultSms)
    const [sendEmail, setSendEmail] = useState(defaultEmail)

    useImperativeHandle(ref, () => ({
      getValue: () => ({
        sms: sendSms,
        email: sendEmail,
      }),
      setValue: data => {
        setSendEmail(data.email)
        setSendSms(data.sms)
      },
    }))

    const {THEME} = useAppStyles()
    const styles = useCallback(styleWithTheme, [THEME])(THEME)

    const onChangeCheckBox = (type: 'EMAIL' | 'SMS') => () => {
      if (type === 'EMAIL') {
        setSendEmail(old => !old)
      } else {
        setSendSms(old => !old)
      }
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onChangeCheckBox('EMAIL')}
          style={styles.row}>
          <AppImage
            source={sendEmail ? Icons.icCheckBoxActive : Icons.icCheckBox}
            style={styles.icon_checkbox}
          />
          <AppText>Gửi Email</AppText>
        </TouchableOpacity>
        <TouchableOpacity onPress={onChangeCheckBox('SMS')} style={styles.row}>
          <AppImage
            source={sendSms ? Icons.icCheckBoxActive : Icons.icCheckBox}
            style={styles.icon_checkbox}
          />
          <AppText>Gửi SMS</AppText>
        </TouchableOpacity>
      </View>
    )
  },
)

OptionSend.displayName = 'OptionSend'
export default OptionSend

const styleWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: scale(20),
      paddingVertical: scale(16),
    },
    row: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: scale(10),
    },
    icon_checkbox: {
      width: THEME.sizes.icon_20,
      height: THEME.sizes.icon_20,
      resizeMode: 'contain',
    },
  })
