import {StyleSheet, View} from 'react-native'
import React from 'react'
import GroupContent from '~/components/GroupContent'
import RowContent from '~/screens/components/RowContent'
import {useAppStyles} from '~/hooks'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {p_verticalScale, scale} from '~/utils/scaleScreen'
import {Fontsfamily} from '~/styles/FontsFamily'
import utils from '~/utils'
import AppText from '~/components/AppText'
import AppImage from '~/components/AppImage'
import {Icons} from '~/assets'
import {
  ALLEY_TYPE_TEXT,
  AREA_LAND_TYPE_TEXT,
  LAND_TYPE_TEXT,
  METHOD_CACULATING_ASSET_TEXT,
} from '~/constants'

export interface AreaItem {
  calculationMethod: string
  landType: string
  dept: string
  square: string
}

export interface LandPricing {
  // Các thuộc tính trước đó (các field đơn lẻ)
  pricingMethod: string
  landType: string
  urbanOrRural: string
  alleyType: string
  alleyWidth: string
  alleyLengthToLand: string
  terrain: string
  squareShape: string
  agriculturalLandPosition: string
  areaSelection: string
  marketPricingMethod: string
  frontageWidth: string
  agriculturalAreaZone: string
  residentialAreaZone: string
  stateAgriculturalAreaZone: string
  agriculturalLandIncreaseRate: string
  favorableCoefficient: string
  adjacentCoefficient: string
  nonAgriculturalLandRatio: string
  square: string
  squareName: string

  // Thêm thuộc tính chứa mảng AreaItem
  areaList: AreaItem[]
}

const InfoLandPricingSection = ({data}: {data: LandPricing}) => {
  const {THEME} = useAppStyles()
  const styles = InfoLandPricingSectionStyles(THEME)

  return (
    <GroupContent
      showGroup={false}
      // title="Định giá tài sản thế chấp"
      title="Mô tả tài sản"
      onPressGroup={utils.onChangeLayoutAnimation}
      style={styles.container_group}>
      <View style={styles.content_master}>
        {/* Thông tin định giá chung */}
        <View style={styles.content_main}>
          <Header_2 text={'Thông tin định giá chung'} />
          <View style={styles.content_text}>
            <RowContent
              styleLabel={styles.half_view_label}
              label="Cách tính"
              value={utils.safeValue(
                utils.isDefined(data?.pricingMethod)
                  ? METHOD_CACULATING_ASSET_TEXT[data?.pricingMethod]
                  : null,
              )}
            />
            <RowContent
              styleLabel={styles.half_view_label}
              label="Loại đất"
              value={utils.safeValue(
                utils.isDefined(data?.landType)
                  ? LAND_TYPE_TEXT[data?.landType]
                  : null,
              )}
            />
            <RowContent
              styleLabel={styles.half_view_label}
              label="Nông thôn/Đô thị"
              value={utils.safeValue(
                utils.isDefined(data?.urbanOrRural)
                  ? AREA_LAND_TYPE_TEXT[data?.urbanOrRural]
                  : null,
              )}
            />
            <RowContent
              styleLabel={styles.half_view_label}
              label="Loại hẻm"
              value={utils.safeValue(
                utils.isDefined(data?.alleyType)
                  ? ALLEY_TYPE_TEXT[data?.alleyType]
                  : null,
              )}
            />
            {utils.isDefined(data?.alleyType) &&
              data?.landType !== ALLEY_TYPE_TEXT.NOALLEY && (
                <RowContent
                  styleLabel={styles.half_view_label}
                  label="Chiều dài hẻm đến vị trí lô đất (mét)"
                  value={utils.safeValue(data?.alleyLengthToLand)}
                />
              )}
            {utils.isDefined(data?.alleyType) &&
              data?.landType !== ALLEY_TYPE_TEXT.NOALLEY && (
                <RowContent
                  styleLabel={styles.half_view_label}
                  label="Chiều rộng hẻm (mét)"
                  value={utils.safeValue(data?.alleyWidth)}
                />
              )}
            <RowContent
              styleLabel={styles.half_view_label}
              label="Cao hơn/thấp hơn mặt đường (mét)"
              value={utils.safeValue(data?.terrain)}
            />
            <RowContent
              styleLabel={styles.half_view_label}
              label="Hình dạng lô đất"
              value={utils.safeValue(data?.squareName)}
            />
            <RowContent
              styleLabel={styles.half_view_label}
              label="Vị trí đất nông nghiệp"
              value={utils.safeValue(data?.agriculturalLandPosition)}
            />
          </View>
        </View>
        {/* Thông tin định giá thị trường */}
        {utils.isDefined(data?.pricingMethod) &&
          (data?.pricingMethod === METHOD_CACULATING_ASSET_TEXT.MARKET ||
            data?.pricingMethod === METHOD_CACULATING_ASSET_TEXT.BOTH) && (
            <View style={styles.content_main}>
              <Header_2 text={'Thông tin định giá thị trường '} />
              <View style={styles.content_text}>
                <RowContent
                  styleLabel={styles.half_view_label}
                  label="Chọn khu vực"
                  value={utils.safeValue(data?.areaSelection)}
                />
                <RowContent
                  styleLabel={styles.half_view_label}
                  label="Phương pháp tính"
                  value={utils.safeValue(data?.marketPricingMethod)}
                />
                <RowContent
                  styleLabel={styles.half_view_label}
                  label="Chiều rộng mặt tiền (mét)"
                  value={utils.safeValue(data?.frontageWidth)}
                />
                <RowContent
                  styleLabel={styles.half_view_label}
                  label="Khu vực (Đất nông nghiệp)"
                  value={utils.safeValue(data?.agriculturalAreaZone)}
                />
              </View>
            </View>
          )}
        {/* Thông tin định giá Nhà nước */}
        {utils.isDefined(data?.pricingMethod) &&
          (data?.pricingMethod === METHOD_CACULATING_ASSET_TEXT.STATE ||
            data?.pricingMethod === METHOD_CACULATING_ASSET_TEXT.BOTH) && (
            <View style={styles.content_main}>
              <Header_2 text={'Thông tin định giá Nhà nước'} />
              <View style={styles.content_text}>
                <RowContent
                  styleLabel={styles.half_view_label}
                  label="Khu vực (Đất ở)"
                  value={utils.safeValue(data?.residentialAreaZone)}
                />
                <RowContent
                  styleLabel={styles.half_view_label}
                  label="Khu vực (Đất nông nghiệp)"
                  value={utils.safeValue(data?.stateAgriculturalAreaZone)}
                />
                <RowContent
                  styleLabel={styles.half_view_label}
                  label="Tỷ lệ tăng đất nông nghiệp ở khu dân cư"
                  value={utils.safeValue(data?.agriculturalLandIncreaseRate)}
                />
                <RowContent
                  styleLabel={styles.half_view_label}
                  label="Hệ số thuận lợi"
                  value={utils.safeValue(data?.favorableCoefficient)}
                />
                <RowContent
                  styleLabel={styles.half_view_label}
                  label="Hệ số giáp ranh"
                  value={utils.safeValue(data?.adjacentCoefficient)}
                />
                <RowContent
                  styleLabel={styles.half_view_label}
                  label="Tỷ lệ đất phi nông nghiệp so với đất ở"
                  value={utils.safeValue(data?.nonAgriculturalLandRatio)}
                />
              </View>
            </View>
          )}

        {/* Danh sách diện tích định giá theo từng thành phần */}
        {utils.isDefined(data?.pricingMethod) &&
          data?.pricingMethod !== METHOD_CACULATING_ASSET_TEXT.SURVEY && (
            <View style={styles.content_main}>
              <Header_2
                text={'Danh sách diện tích định giá theo từng thành phần'}
              />
              <View style={styles.content_text}>
                {data.areaList && data.areaList.length > 0 ? (
                  data.areaList.map((item, index) => (
                    <CardArea key={index.toString()} data={item} />
                  ))
                ) : (
                  <View style={styles.container_empty_text}>
                    <AppText>Không có dữ liệu</AppText>
                  </View>
                )}
              </View>
            </View>
          )}
      </View>
    </GroupContent>
  )
}

export default InfoLandPricingSection

const InfoLandPricingSectionStyles = (theme: AppTheme) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {colors, fonts, sizes} = theme
  const {bottom} = useSafeAreaInsets()
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    container_press_out: {
      flex: 1,
      backgroundColor: colors.transparent,
    },
    container_modal: {
      height: p_verticalScale(85),
      backgroundColor: colors.white,
      borderTopRightRadius: scale(32),
      borderTopLeftRadius: scale(32),
      gap: scale(8),
      paddingVertical: scale(16),
      paddingHorizontal: scale(10),
      paddingBottom: scale(16) + bottom,
    },
    titleText: {
      fontFamily: Fontsfamily.OpenSans.SemiBold,
    },
    title_group: {
      fontSize: sizes.h4,
      fontFamily: Fontsfamily.OpenSans.SemiBold,
      color: colors.text.primary,
    },
    content_master: {
      gap: scale(16),
      marginTop: scale(16),
    },
    content_main: {
      gap: scale(12),
    },
    content_text: {
      gap: scale(8),
    },
    half_view_label: {
      flex: 0.8,
    },
    long_label: {
      flex: 1.4,
    },
    long_long_label: {
      flex: 1.8,
    },
    container_group: {
      gap: scale(8),
      marginBottom: scale(4),
    },
    container_empty_text: {
      paddingVertical: scale(8),
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
}

const Header_2 = ({text = ''}: {text: string}) => {
  const styles = useHeader2Styles()
  return (
    <View style={styles.container}>
      <AppImage source={Icons.icTermInfo} style={styles.icon} />
      <AppText style={styles.text}>{text}</AppText>
    </View>
  )
}

const useHeader2Styles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: scale(8),
    },
    icon: {
      width: scale(20),
      height: scale(20),
    },
    text: {
      color: colors.primary,
      fontFamily: Fontsfamily.Nunito.SemiBold,
    },
  })
}

const CardArea = ({
  data = null,
  emptyText = '---',
}: {
  data: AreaItem | null
  emptyText?: string
}) => {
  const styles = useCardAreaStyles()
  return (
    <View style={styles.container}>
      <View style={styles.container_ic}>
        <AppImage source={Icons.icLand} style={styles.icon} />
      </View>
      <View style={styles.container_text_master}>
        <AppText style={styles.primary_text}>
          {data?.landType ?? emptyText}
        </AppText>
        <View style={styles.container_text}>
          <AppText
            style={
              styles.secondary_text
            }>{`Cách tính: ${data?.calculationMethod ?? emptyText}`}</AppText>
          <AppText
            style={
              styles.secondary_text
            }>{`Chiều sâu: ${data?.dept ?? emptyText}`}</AppText>
          <AppText
            style={
              styles.secondary_text
            }>{`Diện tích: ${data?.square ?? emptyText}`}</AppText>
        </View>
      </View>
    </View>
  )
}

const useCardAreaStyles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: scale(8),
    },
    container_ic: {
      width: scale(24),
      height: scale(24),
      borderRadius: scale(24) / 2,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.button.background,
    },
    icon: {
      width: scale(16),
      height: scale(16),
    },
    primary_text: {
      color: colors.primary,
    },
    secondary_text: {
      color: colors.text.primary,
    },
    container_text_master: {
      gap: scale(10),
    },
    container_text: {
      gap: scale(8),
    },
  })
}
