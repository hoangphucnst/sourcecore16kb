import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
  useEffect,
} from 'react'
import {View, StyleSheet, BackHandler, Platform} from 'react-native'
import {useAppStyles} from '~/hooks'
import {AppTheme} from '~/styles/Theme'
import moment from 'moment'
import CustomDatePicker, {
  TypeRefCustomDatePickerProps,
} from '~/components/CustomDatePicker'
import utils from '~/utils'
import {BottomSheetModal, BottomSheetView} from '@gorhom/bottom-sheet'
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context'
import CustomBackdrop from './CustomBackdrop'
import {useTheme} from '~/redux/reduxHooks'
import AppButton from '../AppButton'

export type TypeChoiseDate = {
  date?: moment.Moment
  isHour?: boolean
  checkAffter?: boolean
  getDate?: (date: moment.Moment) => void
  onlyHour?: boolean
}

export type TypeRefChoiseDate = {
  expand: (option: TypeChoiseDate) => void
  close: () => void
}

const ChoiseDate = forwardRef<TypeRefChoiseDate>((props, ref) => {
  const {THEME} = useAppStyles()
  const insets = useSafeAreaInsets()
  const styles = useCallback(stylesWithTheme, [THEME, insets])(THEME, insets)
  const refBottom = useRef<BottomSheetModal>(null)
  const refFromDate = React.useRef<TypeRefCustomDatePickerProps>(null)
  const [date, setDate] = useState(moment())
  const timeMoment = moment()
  const maxYear = timeMoment.year() + 100
  const minYear = timeMoment.year() - 30
  const infoScreen = useTheme()
  const {isLandscape} = infoScreen
  const [ready, setReady] = useState<boolean>(false)
  const heightDate = isLandscape ? 150 : 200

  const refCurrentOption = useRef<TypeChoiseDate>({})

  const onChangeFromDate = (dateMonent: moment.Moment) => {
    setDate(moment(dateMonent))
  }

  const refIndex = useRef(-1)

  useEffect(() => {
    const currentTime = moment()
    const selectedDate = moment(date)
    if (
      refCurrentOption.current?.checkAffter &&
      selectedDate.isBefore(currentTime, 'minute') &&
      refIndex.current >= 0 &&
      ready
    ) {
      refFromDate?.current?.setValue?.(currentTime)
      setDate(currentTime)
    } else setDate(date)
  }, [date, refIndex, ready])

  const onBottomSheet = (option: TypeChoiseDate) => {
    const currentTime = moment()
    const selectedDate = moment(option.date)
    setDate(
      selectedDate.isBefore(currentTime, 'minute')
        ? moment()
        : moment(option.date),
    )
    onPressBottomSheet()
    refCurrentOption.current = option
  }

  useImperativeHandle(ref, () => ({
    expand: (option: TypeChoiseDate) => onBottomSheet(option),
    close: () => {
      refBottom.current?.close()
    },
  }))

  const onPressBottomSheet = useCallback(() => {
    refBottom.current?.present()
  }, [])

  // PressConFirm
  const onPressConfirm = () => {
    const currentTime = moment()
    if (
      date.isBefore(currentTime, 'minute') &&
      refCurrentOption.current.checkAffter
    ) {
      utils.messageBox({
        title: 'Thông báo',
        message: 'Không được chọn lịch trước ngày hôm nay',
        showCancel: false,
        labelConfirm: 'Đóng',
      })
      refFromDate?.current?.setValue?.(currentTime)
      setDate(currentTime)
    } else {
      refCurrentOption.current?.getDate?.(date)
      refBottom.current?.close()
    }
  }

  const handleAndroidBackButton = useCallback(() => {
    if (Platform.OS === 'android' && refIndex.current >= 0) {
      refBottom.current?.close()
      refIndex.current = -1
      return true // Consume the back press event
    }
    return false // Allow default back press behavior if bottom sheet is closed
  }, [refBottom, refIndex])

  React.useEffect(() => {
    setTimeout(() => {
      setReady(true)
    }, 1000)
    const backHandlerSubscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleAndroidBackButton,
    )

    return () => {
      backHandlerSubscription.remove()
      setReady(false)
    }
  }, [handleAndroidBackButton])

  // const snapPoints = useMemo(
  //   () => (isLandscape ? ['80%'] : [350]),
  //   [isLandscape],
  // )

  const onCancel = () => refBottom.current?.close()

  return (
    <BottomSheetModal
      ref={refBottom}
      // snapPoints={snapPoints}
      onChange={index => (refIndex.current = index)}
      backdropComponent={CustomBackdrop}
      enablePanDownToClose={true}
      enableOverDrag={true}
      keyboardBehavior={'interactive'}
      keyboardBlurBehavior={'restore'}
      detached={false}
      // bottomInset={0}
      enableDynamicSizing
      // topInset={100}
      enableContentPanningGesture>
      <BottomSheetView style={styles.stFlex_1}>
        {ready && (
          <>
            <View style={styles.styeChoiseDate}>
              <CustomDatePicker
                ref={refFromDate}
                minYear={minYear}
                maxYear={maxYear}
                defaultValue={date}
                highlightColor={THEME.colors.black}
                ishour={refCurrentOption?.current?.isHour}
                activeItemTextStyle={styles.stActiveItem}
                itemTextStyle={styles.stStyleText}
                heightWrapper={heightDate}
                onDateChange={onChangeFromDate}
                heightItem={40}
              />
            </View>
            <View style={styles.siteButtom}>
              <AppButton
                title="Đóng"
                styleButton={[
                  styles.styleButton,
                  {backgroundColor: THEME.colors.offline},
                ]}
                onPress={onCancel}
              />
              <AppButton
                title="Xác nhận"
                styleButton={styles.styleButton}
                onPress={onPressConfirm}
              />
            </View>
          </>
        )}
      </BottomSheetView>
    </BottomSheetModal>
  )
})
ChoiseDate.displayName = 'ChoiseDate'

export default ChoiseDate

const stylesWithTheme = (THEME: AppTheme, insets?: EdgeInsets) =>
  StyleSheet.create({
    stFlex_1: {
      // flex: 1,
      paddingBottom: insets ? insets.bottom : 0,
    },
    container: {
      backgroundColor: 'white',
      flex: 1,
    },
    styeChoiseDate: {
      marginBottom: THEME.sizes.mg20,
      marginHorizontal: THEME.sizes.mg10,
    },
    styleButton: {
      height: 40,
      width: 160,
    },
    siteButtom: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    stbottomSheet: {
      backgroundColor: 'rgba(0, 0, 0, 1)',
    },
    stActiveItem: {
      fontWeight: 'bold',
      color: THEME.colors.primary,
      fontSize: THEME.sizes.h2,
    },
    stStyleText: {
      color: 'gray',
      fontSize: THEME.sizes.h3,
    },
  })
