import {StyleSheet, View} from 'react-native'
import React, {useState} from 'react'
import GroupContent from '~/components/GroupContent'
import RowContent from '~/screens/components/RowContent'
import {useAppStyles} from '~/hooks'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {p_verticalScale, scale} from '~/utils/scaleScreen'
import {Fontsfamily} from '~/styles/FontsFamily'
import utils from '~/utils'
import AppButton from '~/components/AppButton'

export interface AssetAttached {
  assetType: string // Loại tài sản
  houseType: string // Loại nhà/CTSX
  constructionArea: string // Diện tích xây dựng
  usageArea: string // Diện tích sử dụng
  structure: string // Kết cấu nhà/CTXD
  actualConstructionArea: string // Diện tích xây dựng thực tế (nếu có)
  completedDate: string // Năm hoàn thành đưa vào sử dụng
  renovationYear: string // Năm sửa chữa
  correctionFactor: string // Hệ số điều chỉnh (cho tài sản gắn liền với đất)
  pricePerSquareMeter: string // Giá (Đồng/mét vuông)
  description: string // Cơ sở hạ tầng, đặc điểm khu vực
  existingRoad: string // Đường hiện trạng
  propertyDescription: string
  propertyLocation: string
}

const InfoAssetAttachedSection = ({
  dataRecord,
  dataActual,
}: {
  dataRecord: AssetAttached
  dataActual: AssetAttached
}) => {
  const {THEME} = useAppStyles()
  const styles = InfoAssetAttachedSectionStyles(THEME)
  const [tabInfo, setTabInfo] = useState<'ONRECORD' | 'ACTUAL'>('ONRECORD')
  const data = tabInfo === 'ONRECORD' ? dataRecord : dataActual
  return (
    <GroupContent
      showGroup={false}
      title="Thông tin tài sản gắn liền với đất"
      onPressGroup={utils.onChangeLayoutAnimation}
      style={styles.container_group}>
      <View style={styles.content_group}>
        <View style={styles.row_tab}>
          <AppButton
            title="Trên sổ"
            styleButton={[
              styles.tab,
              tabInfo === 'ONRECORD' && styles.tab_active,
            ]}
            styleTitle={[
              styles.titletab,
              tabInfo === 'ONRECORD' && styles.title_active,
            ]}
            onPress={() => setTabInfo('ONRECORD')}
          />
          <AppButton
            title="Thực tế"
            styleButton={[
              styles.tab,
              tabInfo === 'ACTUAL' && styles.tab_active,
            ]}
            styleTitle={[
              styles.titletab,
              tabInfo === 'ACTUAL' && styles.title_active,
            ]}
            onPress={() => setTabInfo('ACTUAL')}
          />
        </View>
        <RowContent label="Loại tài sản" value={data?.assetType} />
        <RowContent label="Loại nhà/CTSX" value={data?.houseType} />
        <RowContent
          styleLabel={styles.half_view_label}
          label="Diện tích xây dựng"
          value={data?.constructionArea + ' m\u00b2'}
        />
        <RowContent
          styleLabel={styles.half_view_label}
          label="Diện tích sử dụng"
          value={data?.usageArea + ' m\u00b2'}
        />
        <RowContent
          styleLabel={styles.half_view_label}
          label="Kết cấu nhà/CTXD"
          value={data?.structure}
        />
        {/* <RowContent
          styleLabel={styles.long_label}
          label="Diện tích xây dựng thực tế (nếu có)"
          value={data?.actualConstructionArea}
        /> */}
        <RowContent
          styleLabel={styles.long_label}
          label="Năm hoàn thành đưa vào sử dụng"
          value={data?.completedDate}
        />
        <RowContent
          styleLabel={styles.long_label}
          label="Năm sửa chữa"
          value={data?.renovationYear}
        />
        <RowContent
          styleLabel={styles.long_label}
          label="Hệ số điều chỉnh (cho tài sản gắn liền với đất)"
          value={data?.correctionFactor}
        />
        {/* <RowContent
          styleLabel={styles.long_label}
          label="Giá (Đồng/mét vuông)"
          value={data?.pricePerSquareMeter}
        /> */}
        <RowContent
          styleLabel={styles.long_label}
          label="Tài sản định giá"
          value={data?.propertyDescription}
        />
        <RowContent
          styleLabel={styles.long_label}
          label="Khu vực định giá"
          value={data?.propertyLocation}
        />
        {/* <RowContent
          styleLabel={styles.quarter_label}
          label="Cơ sở hạ tầng, đặc điểm khu vực"
          value={data?.description}
        /> */}
        {/* <RowContent
          styleLabel={styles.half_view_label}
          label="Đường hiện trạng"
          value={data?.existingRoad}
        /> */}
      </View>
    </GroupContent>
  )
}

export default InfoAssetAttachedSection

const InfoAssetAttachedSectionStyles = (theme: AppTheme) => {
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
      flex: 0.7,
    },
    long_label: {
      flex: 1.4,
    },
    long_long_label: {
      flex: 1.8,
    },
    container_group: {
      marginVertical: scale(4),
    },
    row_tab: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(10),
    },
    tab: {
      backgroundColor: colors.white,
      borderRadius: 0,
      paddingVertical: scale(5),
    },
    tab_active: {
      backgroundColor: colors.white,
      borderBottomWidth: scale(2),
      borderBottomColor: colors.primary,
    },
    titletab: {
      fontSize: sizes.h5,
    },
    title_active: {
      color: colors.primary,
    },
  })
}
