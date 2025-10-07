import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native'
import React, {useCallback, useImperativeHandle, useRef, useState} from 'react'
import AppInput from '~/components/AppInput'
import {useAppStyles} from '~/hooks'
import {AppTheme} from '~/styles/Theme'
import {scale} from '~/utils/scaleScreen'
import AppImage from '~/components/AppImage'
import {Icons} from '~/assets'

type PropsSearchView = {
  onPressFilter: () => void
  onChangeText: (textValue: string) => void
  styleContainer: ViewProps
  isFilter?: boolean
  placeholder?: string
  timeDebounce: number
}

export type SearchViewRefProps = {
  clearSearch: () => void
  setSearchValue: (value: string) => void
}

const SearchViewDebounce = React.forwardRef<
  SearchViewRefProps,
  PropsSearchView
>(
  (
    {
      isFilter = true,
      onPressFilter = () => {},
      onChangeText = () => {},
      styleContainer = null,
      placeholder = '',
      timeDebounce = 300,
    },
    ref,
  ) => {
    const {THEME} = useAppStyles()
    const styles = useCallback(styleWithTheme, [THEME])(THEME)
    const refInput = useRef<TextInput>(null)
    const [textValue, setTextValue] = useState('')
    const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

    useImperativeHandle(ref, () => ({
      clearSearch: () => {
        refInput.current?.clear()
        setTextValue('')
      },
      setSearchValue: (value: string) => {
        refInput.current?.setNativeProps({text: value})
        setTextValue(value)
        onChangeText(value) // có thể debounce nếu cần
      },
    }))

    const debouncedOnChangeText = (text: string) => {
      setTextValue(text)
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
      debounceTimeout.current = setTimeout(() => {
        onChangeText(text)
      }, timeDebounce)
    }

    const handleReset = () => {
      refInput.current?.clear()
      setTextValue('')
      onChangeText('')
    }

    return (
      <View style={[styles.container, styleContainer]}>
        <View style={styles.frameSearch}>
          <AppImage source={Icons.icSearch} style={styles.icon_search} />
          <AppInput
            ref={refInput}
            placeholder={placeholder}
            style={styles.input_search}
            placeholderTextColor={THEME.colors.text.secondary}
            onChangeText={debouncedOnChangeText}
          />
          {Boolean(textValue.length > 0) && (
            <TouchableOpacity
              style={styles.container_reset_ic}
              onPress={handleReset}>
              <AppImage source={Icons.icClose} style={styles.ic_reset} />
            </TouchableOpacity>
          )}
        </View>
        {isFilter && (
          <TouchableOpacity onPress={onPressFilter}>
            <View style={styles.frame_filter}>
              <AppImage source={Icons.icFilter} style={styles.icon_filter} />
            </View>
          </TouchableOpacity>
        )}
      </View>
    )
  },
)

SearchViewDebounce.displayName = 'SearchViewDebounce'

export default SearchViewDebounce

const styleWithTheme = (THEME: AppTheme) => {
  const {colors, sizes} = THEME
  return StyleSheet.create({
    container: {
      backgroundColor: colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: scale(8),
      paddingHorizontal: scale(12),
      paddingTop: 0,
    },
    row_right_header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    input_search: {
      padding: Platform.OS === 'ios' ? sizes.pd10 : sizes.pd5,
      flex: 1,
    },
    frameSearch: {
      flex: 1,
      borderRadius: scale(8),
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.white,
    },
    icon_search: {
      width: scale(20),
      height: scale(20),
      marginLeft: scale(11),
    },
    frame_filter: {
      borderWidth: 1,
      borderColor: colors.white,
      padding: scale(5),
      marginLeft: scale(8),
      borderRadius: scale(6),
    },
    icon_filter: {
      width: scale(24),
      height: scale(24),
    },
    container_reset_ic: {
      // position: 'absolute',
      // right: scale(10),
      paddingRight: scale(10),
      backgroundColor: colors.white,
    },
    ic_reset: {
      width: scale(20),
      height: scale(20),
      // transform: [{rotate: '-45deg'}],
      tintColor: colors.black,
    },
  })
}
