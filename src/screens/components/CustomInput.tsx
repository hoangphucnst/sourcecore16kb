import {
  StyleSheet,
  StyleSheetProperties,
  TouchableOpacity,
  View,
} from 'react-native'
import React, {useImperativeHandle, useState} from 'react'
import AppText from '~/components/AppText'
import AppInput from '~/components/AppInput'
import AppViewBody from '~/components/AppViewBody'
import {useAppStyles} from '~/hooks'
import {scale, scaleFont} from '~/utils/scaleScreen'
import {Icons} from '~/assets'
import AppImage from '~/components/AppImage'
import utils from '~/utils'

export interface CustomInputRef {
  changeSelectedInput: (value: string) => void
}

interface CustomInputProps {
  title: string
  style?: StyleSheetProperties
  typeInput: 'Text' | 'Date' | 'Dropdown' | 'Money' | 'Number'
  textRef: React.RefObject

  onPress?: () => void
  onChangeText: (newText: string) => void
}

const CustomInput = React.forwardRef(
  (
    {
      title = 'Set title here',
      onChangeText = () => {},
      typeInput = 'Text',
      onPress = () => {},
      textRef = null,
    }: CustomInputProps,
    ref,
  ) => {
    const {THEME} = useAppStyles()
    const styles = CustomInputStyles(THEME)
    const [value, setValue] = useState('')
    const [inputValue, setInputValue] = useState('')

    useImperativeHandle(ref, () => ({
      changeSelectedInput: setValue,
    }))

    switch (typeInput) {
      case 'Text': {
        return (
          <AppViewBody style={styles.container_input}>
            <AppText style={styles.text}>{title}</AppText>
            <AppInput
              ref={textRef}
              onChangeText={text => {
                onChangeText(text)
              }}
              placeholder=""
              style={styles.input}
            />
          </AppViewBody>
        )
      }

      case 'Number': {
        return (
          <AppViewBody style={styles.container_input}>
            <AppText style={styles.text}>{title}</AppText>
            <AppInput
              ref={textRef}
              onChangeText={text => {
                onChangeText(text)
              }}
              placeholder=""
              style={styles.input}
              keyboardType="numeric"
            />
          </AppViewBody>
        )
      }

      case 'Money': {
        return (
          <AppViewBody style={styles.container_input}>
            <AppText style={styles.text}>{title}</AppText>
            <AppInput
              ref={textRef}
              value={utils.formatMoney(inputValue)}
              onChangeText={text => {
                const raw = text.replace(/\D/g, '')
                setInputValue(raw)
                onChangeText(raw)
              }}
              keyboardType="numeric"
              placeholder=""
              style={styles.input}
            />
          </AppViewBody>
        )
      }

      case 'Date': {
        return (
          <AppViewBody style={styles.container_input}>
            <AppText style={styles.text}>{title}</AppText>
            <TouchableOpacity onPress={onPress}>
              <View>
                <View style={styles.input}>
                  <AppText style={styles.text_dropdown}>{value}</AppText>
                </View>
                <AppImage source={Icons.icCalendar} style={styles.iconRight} />
              </View>
            </TouchableOpacity>
          </AppViewBody>
        )
      }

      case 'Dropdown': {
        return (
          <AppViewBody style={styles.container_input}>
            <AppText style={styles.text}>{title}</AppText>
            <TouchableOpacity onPress={onPress}>
              <View>
                <View style={styles.input}>
                  <AppText style={styles.text_dropdown}>{value}</AppText>
                </View>
                <AppImage source={Icons.icArrowDown} style={styles.iconRight} />
              </View>
            </TouchableOpacity>
          </AppViewBody>
        )
      }

      default: {
        return <></>
      }
    }
  },
)

CustomInput.displayName = 'CustomInput'

export default CustomInput

const CustomInputStyles = (theme: AppTheme) => {
  const {colors} = theme
  return StyleSheet.create({
    container_input: {
      gap: scale(8),
      marginVertical: scale(4),
    },
    text: {
      fontSize: scaleFont(14),
      color: colors.text.secondary,
    },
    text_remember: {
      fontSize: scaleFont(14),
    },
    input: {
      backgroundColor: colors.input.background,
      borderColor: colors.border,
      borderWidth: scale(1),
      width: '100%',
      height: scale(38),
      borderRadius: scale(8),
      paddingHorizontal: scale(8),
      paddingVertical: scale(9),
      fontSize: scaleFont(14),
    },
    text_dropdown: {
      fontSize: scaleFont(14),
      color: colors.text.secondary,
    },
    iconRight: {
      position: 'absolute',
      top: scale(8),
      right: scale(8),
      width: scale(20),
      height: scale(20),
    },
  })
}
