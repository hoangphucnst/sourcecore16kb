import {StyleSheet, View} from 'react-native'
import React from 'react'
import GroupContent from '~/components/GroupContent'
import RowContent from '~/screens/components/RowContent'
import {useAppStyles} from '~/hooks'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {p_verticalScale, scale} from '~/utils/scaleScreen'
import {Fontsfamily} from '~/styles/FontsFamily'
import utils from '~/utils'
import {LIMIT_TEXT} from '~/constants'

export interface AssetInfo {
  landLot: string // Thửa đất
  mapSheet: string // Tờ bản đồ số
  address: string // Địa chỉ đất
  landUseExpiry: string // Thời hạn sử dụng
  landArea: string // Diện tích đất
  landAreaWords: string // Diện tích (bằng chữ)
  privateArea: string // Diện tích đất sử dụng riêng
  commonArea: string // Diện tích đất sử dụng chung
  origin: string // Nguồn gốc sử dụng đất
  assetSpecificAddress: string // Địa chỉ cụ thể của tài sản thế chấp
  landUsePurpose: string // Mục đích sử dụng đất
  aKeepLender: string // Phần bên A giữ (Bên cho vay)
  bKeepBorrower: string // Phần bên B giữ (Bên đi vay)
  landUseRestriction: string
  dateOfRelease: string
  placeOfRelease: string
  gcnNumber: string
  bookNumber: string
}

const InfoInUseAreaSection = ({data}: {data: AssetInfo}) => {
  const {THEME} = useAppStyles()
  const styles = InfoInUseAreaSectionStyles(THEME)
  return (
    <GroupContent
      showGroup={false}
      title="Thông tin QSD đất"
      onPressGroup={utils.onChangeLayoutAnimation}
      style={styles.container_group}>
      <View style={styles.content_group}>
        <RowContent label="Thửa đất" value={data?.landLot} />
        <RowContent label="Tờ bản đồ số" value={data?.mapSheet} />
        <RowContent label="Địa chỉ đất" value={data?.address} />
        <RowContent
          styleLabel={styles.half_view_label}
          label="Thời hạn sử dụng"
          value={data?.landUseExpiry}
        />
        <RowContent label="Diện tích" value={data?.landArea + ' m\u00b2'} />
        <RowContent label="Diện tích (bằng chữ)" value={data?.landAreaWords} />
        <RowContent
          label="Diện tích đất sử dụng riêng"
          value={data?.privateArea + ' m\u00b2'}
        />
        <RowContent
          label="Diện tích đất sử dụng chung"
          value={data?.commonArea + ' m\u00b2'}
        />
        <RowContent label="Nguồn gốc sử dụng đất" value={data?.origin} />
        <RowContent
          label="Địa chỉ cụ thể của tài sản thế chấp"
          value={data?.assetSpecificAddress}
        />
        <RowContent label="Mục đích sử dụng đất" value={data?.landUsePurpose} />
        <RowContent label="GCN số" value={data?.gcnNumber} />
        <RowContent label="Số vào sổ" value={data?.bookNumber} />
        <RowContent label="Nơi cấp" value={data?.placeOfRelease} />
        <RowContent label="Ngày cấp" value={data?.dateOfRelease} />
        <RowContent
          label="Hạn chế QSD"
          value={utils.safeValue(
            utils.isDefined(data?.landUseRestriction)
              ? LIMIT_TEXT[data?.landUseRestriction]
              : null,
          )}
        />
        {/* <RowContent
          label="Phần bên A giữ (Bên cho vay)"
          value={data?.aKeepLender}
        />
        <RowContent
          label="Phần bên B giữ (Bên đi vay)"
          value={data?.bKeepBorrower}
        /> */}
      </View>
    </GroupContent>
  )
}

export default InfoInUseAreaSection

const InfoInUseAreaSectionStyles = (theme: AppTheme) => {
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
    half_view_label: {
      flex: 0.7,
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
