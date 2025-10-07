import {
  BackHandler,
  FlatList,
  ListRenderItem,
  Platform,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import React, {useCallback, useMemo, useRef, useState} from 'react'
import CustomBackdrop from '~/components/Popup/CustomBackdrop'
import {
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import AppText from './AppText'
import {AppTheme} from '~/styles/Theme'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import {useAppStyles} from '~/hooks'
import AppIconVector from './AppIconVector'
import utils from '~/utils'
import useTheme from '~/redux/reduxHooks/useTheme'

export type OptionAppPicker<T> = {
  key: string | number
  value: T
}

type Props<T extends {[key: string]: any}> = {
  title?: string | undefined | null
  style?: ViewStyle | ViewStyle[]
  styleTitle?: TextStyle | TextStyle[]
  options?: OptionAppPicker<T>[] | []
  optionComponent?: (option: OptionAppPicker<T>) => React.ReactNode
  onChange?: (option: OptionAppPicker<T>) => void
  value?: OptionAppPicker<T> | null
  nameKeyDisplay?: string | ''
  nameKeyId?: string | ''
  styleOptionActive?: TextStyle | TextStyle[]
  styleOption?: TextStyle | TextStyle[]
}

const AppPicker = <T extends {[key: string]: any}>(props: Props<T>) => {
  const refBottom = useRef<BottomSheetModal>(null)
  const insets = useSafeAreaInsets()
  const {THEME} = useAppStyles()
  const styles = useCallback(stylesWithTheme, [THEME, insets])(THEME, insets)
  const refIndex = useRef(-1)
  const {
    title = 'Selection',
    value,
    options,
    optionComponent,
    nameKeyDisplay = '',
    nameKeyId = '',
    styleOptionActive,
    styleOption,
    onChange,
  } = props
  const [current, setCurrent] = useState(value || null)
  const infoScreen = useTheme()
  const {width, height, isLandscape} = infoScreen
  const [dataShow, setDataShow] = useState<OptionAppPicker<T>[]>(options || [])

  const onOpenOptionAppPickers = useCallback(() => {
    refBottom.current?.present()
  }, [])

  const handleAndroidBackButton = useCallback(() => {
    if (Platform.OS === 'android' && refIndex.current >= 0) {
      refBottom.current?.close()
      refIndex.current = -1
      return true // Consume the back press event
    }
    return false // Allow default back press behavior if bottom sheet is closed
  }, [refBottom, refIndex])

  React.useEffect(() => {
    const backHandlerSubscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleAndroidBackButton,
    )

    return () => {
      backHandlerSubscription.remove()
    }
  }, [handleAndroidBackButton])

  const onSelect = (item: OptionAppPicker<T>) => () => {
    setCurrent(item)
    refBottom.current?.close()
    if (typeof onChange === 'function') {
      onChange(item)
    }
  }

  const renderOptionAppPicker = ({item}: {item: OptionAppPicker<T>}) => {
    const valueString =
      nameKeyDisplay && item.value[nameKeyDisplay]
        ? item.value[nameKeyDisplay].toString()
        : ''
    let isCurrent = false
    if (value !== null) {
      isCurrent =
        nameKeyId &&
        item.value[nameKeyId] &&
        item.value[nameKeyId] === current?.value[nameKeyId]
    }

    return (
      <TouchableOpacity onPress={onSelect(item)}>
        {optionComponent ? (
          optionComponent(item)
        ) : (
          <AppText
            style={
              isCurrent
                ? [styles.optionActive, styleOptionActive]
                : [styles.option, styleOption]
            }>
            {valueString}
          </AppText>
        )}
      </TouchableOpacity>
    )
  }

  const styleList: ViewStyle = useMemo(
    () => ({
      height: isLandscape ? height * 0.8 : width * 0.6,
    }),
    [height, width, isLandscape],
  )

  const onSearch = (textSearch: string) => {
    if (textSearch.length === 0) setDataShow(options || [])
    else
      setDataShow(
        options?.filter(e =>
          utils
            .removeAccents(e.value[nameKeyDisplay].toString())
            .includes(utils.removeAccents(textSearch)),
        ) || [],
      )
  }

  const debounceSearch = utils.debounce(onSearch, 1000)

  const renderEmpty = () => (
    <AppText style={styles.text_empty}>Không có dữ liệu</AppText>
  )

  const onDismissSelect = () => {
    setDataShow(options || [])
  }

  return (
    <View>
      <TouchableOpacity onPress={onOpenOptionAppPickers}>
        <View style={styles.dropdown}>
          <AppText
            style={
              current && current.value[nameKeyDisplay]
                ? styles.optionCurrent
                : styles.optionEmpty
            }>
            {current && current.value[nameKeyDisplay]
              ? current.value[nameKeyDisplay].toString()
              : title}
          </AppText>
          <AppIconVector.FontAwesome5Icon
            name="caret-down"
            color={THEME.colors.black}
          />
        </View>
      </TouchableOpacity>
      <BottomSheetModal
        ref={refBottom}
        onChange={index => (refIndex.current = index)}
        backdropComponent={CustomBackdrop}
        enablePanDownToClose={true}
        enableOverDrag={true}
        keyboardBehavior={'interactive'}
        keyboardBlurBehavior={'restore'}
        detached={false}
        onDismiss={onDismissSelect}
        enableDynamicSizing
        enableContentPanningGesture>
        <BottomSheetView style={styles.container}>
          <BottomSheetTextInput
            placeholder="Tìm kiếm"
            style={styles.textInput}
            onChangeText={debounceSearch}
          />
          <FlatList
            showsVerticalScrollIndicator={false}
            data={dataShow}
            keyExtractor={item => item.key.toString()}
            renderItem={renderOptionAppPicker}
            style={[styleList, styles.container]}
            ListEmptyComponent={renderEmpty}
            keyboardShouldPersistTaps="handled"
          />
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  )
}

export default AppPicker

const stylesWithTheme = (THEME: AppTheme, insets?: EdgeInsets) =>
  StyleSheet.create({
    horizontal_icon: {
      paddingHorizontal: 2,
    },
    row_center_icon: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: THEME.sizes.mg5,
    },
    ctn_middle_card: {
      marginBottom: THEME.sizes.mg15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    ctn_body: {
      flex: 1,
      backgroundColor: 'white',
      paddingBottom: insets?.bottom ? insets.bottom : 0,
      paddingHorizontal: THEME.sizes.horizontal_13,
    },
    content: {flex: 1},
    title_header: {
      fontSize: THEME.sizes.h3,
      textAlign: 'center',
    },
    container: {marginBottom: insets ? insets.bottom : 0},
    dropdown: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: THEME.colors.border,
    },
    listOptionAppPickers: {
      maxHeight: 200,
    },
    option: {
      fontSize: THEME.sizes.h4,
      padding: 10,
      textAlign: 'center',
    },
    optionActive: {
      fontSize: THEME.sizes.h4,
      padding: 10,
      textAlign: 'center',
      fontWeight: 'bold',
      color: THEME.colors.primary,
      backgroundColor: 'rgba(0,0,0,0.05)',
    },
    optionCurrent: {
      color: THEME.colors.primary,
      fontWeight: 'bold',
    },
    optionEmpty: {
      color: THEME.colors.text.placeHolder,
    },
    textInput: {
      marginHorizontal: 12,
      marginBottom: 12,
      padding: 12,
      borderRadius: 12,
      backgroundColor: 'rgba(0,0,0,0.1)',
      color: THEME.colors.text.primary,
    },
    text_empty: {
      textAlign: 'center',
    },
  })
