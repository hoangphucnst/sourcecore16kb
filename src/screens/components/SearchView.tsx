import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native'
import React, {useCallback, useImperativeHandle, useRef} from 'react'
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
}

type SearchViewRefProps = {
  clearSearch: () => void
}

const SearchView = React.forwardRef<SearchViewRefProps, PropsSearchView>(
  (
    {
      isFilter = true,
      onPressFilter = () => {},
      onChangeText = () => {},
      styleContainer = null,
      placeholder = '',
    },
    ref,
  ) => {
    const {THEME} = useAppStyles()
    const styles = useCallback(styleWithTheme, [THEME])(THEME)
    const refInput = useRef<TextInput>(null)

    useImperativeHandle(ref, () => ({
      clearSearch: () => {
        refInput.current?.clear()
      },
    }))
    return (
      <View style={[styles.container, styleContainer]}>
        <View style={styles.framne_search}>
          <AppImage source={Icons.icSearch} style={styles.icon_search} />
          <AppInput
            ref={refInput}
            placeholder={placeholder}
            style={styles.input_search}
            placeholderTextColor={THEME.colors.text.secondary}
            onChangeText={onChangeText}
          />
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

SearchView.displayName = 'SearchView'

export default SearchView

const styleWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: THEME.colors.primary,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
    },
    row_right_header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    input_search: {
      padding: Platform.OS === 'ios' ? THEME.sizes.pd10 : THEME.sizes.pd5,
      flex: 1,
    },
    framne_search: {
      flex: 1,
      borderRadius: scale(8),
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: THEME.colors.white,
    },
    icon_search: {
      width: scale(20),
      height: scale(20),
      marginLeft: scale(11),
    },
    frame_filter: {
      borderWidth: 1,
      borderColor: THEME.colors.white,
      padding: scale(6),
      marginLeft: scale(8),
      borderRadius: scale(6),
    },
    icon_filter: {
      width: scale(24),
      height: scale(24),
    },
  })
