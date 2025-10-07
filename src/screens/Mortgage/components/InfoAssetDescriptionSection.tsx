import {StyleSheet, View} from 'react-native'
import React from 'react'
import GroupContent from '~/components/GroupContent'
import RowContent from '~/screens/components/RowContent'
import {useAppStyles} from '~/hooks'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {p_verticalScale, scale} from '~/utils/scaleScreen'
import {Fontsfamily} from '~/styles/FontsFamily'
import utils from '~/utils'

export interface Valuation {
  assetValue: string // Giá trị tài sản thế chấp
  valuationDate: string // Ngày định giá
  startingPrice: string // Giá khởi điểm bán tài sản
  assetLocationDescription: string // Mô tả vị trí tài sản
  collateralDescription: string // Mô tả về tài sản thế chấp
  landAttachedAssetDescription: string // Mô tả tài sản gắn liền với đất đem thế chấp
  valuationDocument: string // Định giá giá trị tài sản (tên/tài liệu)
  landAndAssetProof: string
}

const InfoAssetDescriptionSection = ({data}: {data: Valuation}) => {
  const {THEME} = useAppStyles()
  const styles = InfoAssetDescriptionStyles(THEME)
  return (
    <GroupContent
      showGroup={false}
      // title="Mô tả tài sản"
      title="Định giá tài sản thế chấp"
      onPressGroup={utils.onChangeLayoutAnimation}
      style={styles.container_group}>
      <View style={styles.content_group}>
        {/* <RowContent
          label="Giá khởi điểm bán tài sản"
          value={data?.startingPrice}
        /> */}
        <RowContent
          label="Quyền sở hữu tài sản gắn liền với đất"
          value={data?.landAndAssetProof}
        />
        <RowContent
          label="Mô tả vị trí tài sản"
          value={data?.assetLocationDescription}
        />
        <RowContent
          label="Mô tả về tài sản thế chấp"
          value={data?.collateralDescription}
        />
        <RowContent
          label="Mô tả tài sản gắn liền với đất đem thế chấp"
          value={data?.landAttachedAssetDescription}
        />
        <RowContent
          label="Định giá giá trị tài sản"
          value={
            utils.isDefined(data?.valuationDocument)
              ? data?.valuationDocument
              : '---'
          }
        />
        <RowContent
          label="Giá trị tài sản thế chấp"
          value={
            utils.isDefined(data?.assetValue)
              ? utils.formatMoney(data?.assetValue)
              : '---'
          }
        />
        <RowContent label="Ngày định giá" value={data?.valuationDate} />
      </View>
    </GroupContent>
  )
}

export default InfoAssetDescriptionSection

const InfoAssetDescriptionStyles = (theme: AppTheme) => {
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
    content_group: {
      gap: scale(8),
      marginTop: scale(8),
    },
    quarter_label: {
      flex: 0.6,
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
  })
}
