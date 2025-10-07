import {
  Platform,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import React, {useEffect} from 'react'
import {AppTheme} from '~/styles/Theme'
import {useAppStyles} from '~/hooks'
import Animated from 'react-native-reanimated'
import {p_verticalScale, scale} from '~/utils/scaleScreen'
import PopupHeader from '~/screens/components/PopupHeader'
import utils from '~/utils'
import {Fontsfamily} from '~/styles/FontsFamily'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import AppText from '~/components/AppText'
import GroupContent from '~/components/GroupContent'
import CardFile from '~/screens/components/CardFile'
import RowContent from '~/screens/components/RowContent'
import AppScrollViewBody from '~/components/AppScrollViewBody'
import InfoInUseAreaSection from '../components/InfoInUseAreaSection'
import InfoAssetAttachedSection from '../components/InfoAssetAttachedSection'
import InfoAssetDescriptionSection from '../components/InfoAssetDescriptionSection'
import InfoLandPricingSection from '../components/InfoLandPricingSection'
import {Property} from '~/services/apis/mortgageService'
import {Screens} from '~/screens/Screens'
import {useDownloadFile, useFadeBackgroundAnimation} from '~/hooks'
import InfoLocation from '../components/InfoLocation'

const defaultProperty = {
  propertyId: 0,
  morgageId: 0,
  propertyName: '',
  landParcel: '',
  mapSheetNumber: '',
  landAddress: '',
  usageDuration: '',
  area: 0,
  areaInWords: '',
  privateLandArea: 0,
  sharedLandArea: 0,
  landUseOrigin: '',
  collateralAssetAddress: '',
  landUsePurpose: '',
  assetType: '',
  houseOrBuildingType: '',
  constructionArea: 0,
  usableArea: 0,
  buildingStructure: '',
  actualConstructionArea: 0,
  yearOfCompletion: '',
  yearOfRenovation: '',
  otherUtilityInfo: '',
  infrastructureAndLocation: '',
  profitabilityIndex: 0,
  mortgagedAssetValue: 0,
  valuationDate: '',
  startingSalePrice: 0,
  assetLocationDescription: '',
  mortgagedAssetDescription: '',
  attachedLandAssetDescription: '',
  assetValuation: '',
  calculationMethod: '',
  marketValueCalculationRule: '',
  selectedArea: '',
  residentialLandArea: 0,
  agriculturalLandArea: 0,
  forestryLandArea: 0,
  alleyWidth: 0,
  alleyLengthToPlot: 0,
  alleyType: '',
  terrain: 0,
  profitabilityIndexLandValue: 0,
  marketPriceCalculationRule: '',
  depth: 0,
  selectedLocation: 0,
  partnerId: 0,
  isActive: 1,
  createTime: '',
  updateTime: '',
  createBy: '',
  updateBy: '',
  status: 1,
  akeepLender: '',
  bkeepBorrower: '',
  landAndAssetProof: '',
}

export const formatePropertyInfo = (property: Property) => {
  const emptyText = '---'

  const safe = (value: any): string => {
    if (value === null || value === undefined || value === '') return emptyText
    return String(value)
  }

  return {
    assetName: safe(property.propertyName),

    assetInfo: {
      landLot: safe(property.landParcel),
      mapSheet: safe(property.mapSheetNumber),
      address: safe(property.landAddress),
      landUseExpiry: safe(property.usageDuration),
      landArea: safe(property.area),
      landAreaWords: safe(property.areaInWords),
      privateArea: safe(property.privateLandArea),
      commonArea: safe(property.sharedLandArea),
      origin: safe(property.landUseOrigin),
      assetSpecificAddress: safe(property.collateralAssetAddress),
      landUsePurpose: safe(property.landUsePurpose),
      aKeepLender: safe(property.akeepLender),
      bKeepBorrower: safe(property.bkeepBorrower),
      landUseRestriction: safe(property.restrictionOfUse),
      dateOfRelease: safe(property.dateOfRelease),
      placeOfRelease: safe(property.placeOfRelease),
      bookNumber: safe(property.bookNumber),
      gcnNumber: safe(property.gcnNumber),
    },

    locationInfo: {
      locationCharacteristics: safe(property?.infrastructureAndLocation),
      profitabilityRatio: safe(property?.profitabilityIndex),
    },

    assetAttached: {
      assetType: safe(property.assetType),
      houseType: safe(property.houseOrBuildingType),
      constructionArea: safe(property.constructionArea),
      usageArea: safe(property.usableArea),
      structure: safe(property.buildingStructure),
      actualConstructionArea: safe(property.actualConstructionArea),
      completedDate: safe(property.yearOfCompletion),
      renovationYear: safe(property.yearOfRenovation),
      correctionFactor: safe(property.correctionFactor),
      pricePerSquareMeter: safe(property.surveyPrice),
      description: safe(property.infrastructureAndLocation),
      existingRoad: safe(property.alleyWidth),
      propertyDescription: safe(property.propertyDescription),
      propertyLocation: safe(property.propertyLocation),
    },

    propertyOnRecord: {
      assetType: safe(property.propertyOnRecord?.[0]?.assetType),
      houseType: safe(property.propertyOnRecord?.[0]?.houseOrBuildingType),
      constructionArea: safe(property.propertyOnRecord?.[0]?.constructionArea),
      usageArea: safe(property.propertyOnRecord?.[0]?.usableArea),
      structure: safe(property.propertyOnRecord?.[0]?.buildingStructure),
      actualConstructionArea: safe(
        property.propertyOnRecord?.[0]?.actualConstructionArea,
      ),
      completedDate: safe(property.propertyOnRecord?.[0]?.yearOfCompletion),
      renovationYear: safe(property.propertyOnRecord?.[0]?.yearOfRenovation),
      correctionFactor: safe(property.propertyOnRecord?.[0]?.correctionFactor),
      pricePerSquareMeter: safe(property.propertyOnRecord?.[0]?.surveyPrice),
      description: safe(
        property.propertyOnRecord?.[0]?.infrastructureAndLocation,
      ),
      existingRoad: safe(property.propertyOnRecord?.[0]?.alleyWidth),
      propertyDescription: safe(
        property.propertyOnRecord?.[0]?.propertyDescription,
      ),
      propertyLocation: safe(property.propertyOnRecord?.[0]?.propertyLocation),
    },

    propertyOnActual: {
      assetType: safe(property.propertyActual?.[0]?.assetType),
      houseType: safe(property.propertyActual?.[0]?.houseOrBuildingType),
      constructionArea: safe(property.propertyActual?.[0]?.constructionArea),
      usageArea: safe(property.propertyActual?.[0]?.usableArea),
      structure: safe(property.propertyActual?.[0]?.buildingStructure),
      actualConstructionArea: safe(
        property.propertyActual?.[0]?.actualConstructionArea,
      ),
      completedDate: safe(property.propertyActual?.[0]?.yearOfCompletion),
      renovationYear: safe(property.propertyActual?.[0]?.yearOfRenovation),
      correctionFactor: safe(property.propertyActual?.[0]?.correctionFactor),
      pricePerSquareMeter: safe(property.propertyActual?.[0]?.surveyPrice),
      description: safe(
        property.propertyActual?.[0]?.infrastructureAndLocation,
      ),
      existingRoad: safe(property.propertyActual?.[0]?.alleyWidth),
      propertyDescription: safe(
        property.propertyActual?.[0]?.propertyDescription,
      ),
      propertyLocation: safe(property.propertyActual?.[0]?.propertyLocation),
    },

    valuation: {
      assetValue:
        property.mortgagedAssetValue != null
          ? property.mortgagedAssetValue
          : emptyText,
      valuationDate: safe(property.valuationDate),
      startingPrice:
        property.startingSalePrice != null
          ? property.startingSalePrice
          : emptyText,
      assetLocationDescription: safe(property.assetLocationDescription),
      collateralDescription: safe(property.mortgagedAssetDescription),
      landAttachedAssetDescription: safe(property.attachedLandAssetDescription),
      valuationDocument: safe(property.assetValuation),
      landAndAssetProof: safe(property?.landUseRightsAndPropertyDocuments),
    },

    landPricing: {
      pricingMethod: safe(property.calculationMethod), // Cách tính
      landType: safe(property.landType), // Loại đất
      urbanOrRural: safe(property.ruralUrbanType), // Nông thôn/Đô thị
      alleyType: safe(property.alleyType), // Loại hẻm
      alleyWidth: safe(property.alleyWidth), // Chiều rộng hẻm
      alleyLengthToLand: safe(property.alleyDepth), // Chiều dài hẻm
      terrain: safe(property.terrain), // Địa hình (mét)
      square: safe(property.squareName), // Vuông vức
      agriculturalLandPosition: safe(property.nonAgriculturalLocation), // Vị trí đất nông nghiệp

      areaSelection: safe(property.areaLocation), // Chọn khu vực
      marketPricingMethod: safe(property.priceCalculationMethod), // Phương pháp tính
      frontageWidth: safe(property.frontageWidth), // Chiều rộng mặt tiền
      agriculturalAreaZone: safe(property.nonAgriculturalLandAreaMarket), // Khu vực (Đất nông nghiệp)

      residentialAreaZone: safe(property.areaHousingLand), // Khu vực (Đất ở)
      stateAgriculturalAreaZone: safe(property.nonAgriculturalLandAreaState), // Khu vực (Đất nông nghiệp - giá Nhà nước)
      agriculturalLandIncreaseRate: safe(property.agriculturalLandIncreaseRate), // Tỷ lệ tăng đất nông nghiệp
      favorableCoefficient: safe(property.convenienceFactor), // Hệ số thuận lợi
      adjacentCoefficient: safe(property.adjacentFactor), // Hệ số giáp ranh
      nonAgriculturalLandRatio: safe(property.nonAgriculturalLandRatio), // Tỷ lệ đất phi nông nghiệp

      areaList: Array.isArray(property.areaByParts?.parts)
        ? property.areaByParts.parts.map((part: any) => ({
            calculationMethod: safe(part.calculationMethod),
            landType: safe(part.landType),
            dept: safe(part.dept),
            square: safe(part.square),
          }))
        : [],
    },

    attachments: {
      asset: property?.fileMetadata,
      other: property?.fileDifferentMetadata,
    },
  }
}

const Modal_CollateralAssetDetails = props => {
  const key_params = ['statusbar_bg', 'statusbar_content']
  const defaul_params = {
    statusbar_bg: 'white',
    statusbar_content: 'dark-content',
  }
  const {statusbar_bg, statusbar_content} = utils.ngetParams(
    props,
    key_params,
    defaul_params,
  )
  const {propertyInfo} = utils.ngetParams(props, ['propertyInfo'], {
    propertyInfo: defaultProperty,
  }) as {propertyInfo: Property}

  const formatedPropertyInfo = formatePropertyInfo(propertyInfo)

  const {THEME} = useAppStyles()
  const styles = CollateralAssetDetailsStyles(THEME)
  const timeStartAnimation = 150 * 5
  const timeEndAnimation = timeStartAnimation / 5

  const {
    isDownloading,
    downloadProgress,
    error,
    downloadedFileName,
    filePath,
    downloadFile,
  } = useDownloadFile()

  const {animatedStyle, startAnimation, endAnimation} =
    useFadeBackgroundAnimation({
      from: 0,
      to: 0.3,
      durationIn: timeStartAnimation,
      durationOut: timeEndAnimation,
    })

  useEffect(() => {
    setTimeout(() => {
      startAnimation()
    }, timeEndAnimation)

    Platform.OS === 'android' &&
      StatusBar.setBackgroundColor(THEME.colors.transparent.black_40)
    StatusBar.setBarStyle('light-content')
    return () => {
      Platform.OS === 'android' && StatusBar.setBackgroundColor(statusbar_bg)
      StatusBar.setBarStyle(statusbar_content)
    }
  }, [])

  const onPressFile = (attachIdEncode, attachName) => {
    downloadFile({
      attachIdEncode: attachIdEncode,
      fileName: attachName,
      fileType: 'pdf',
    })
  }

  useEffect(() => {
    if (isDownloading) {
      utils.showLoadingFullApp({
        show: true,
        text: `${downloadProgress}%`,
      })
    } else if (filePath && downloadedFileName) {
      utils.showLoadingFullApp({show: false})
      utils.navigate(Screens.name.FileViewerScreen, {
        filePath: filePath,
        fileName: downloadedFileName,
      })
    } else if (error) {
      utils.showLoadingFullApp({show: false})
      utils.showMessageFlash({
        description: error,
        type: 'warning',
      })
    } else {
      utils.showLoadingFullApp({show: false})
    }
  }, [isDownloading, downloadProgress, filePath, downloadedFileName])

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableWithoutFeedback
        onPress={() => {
          const handleClose = () => {
            utils.goBackNavigation()
          }
          endAnimation({
            callback: handleClose,
          })
        }}>
        <View style={styles.container_press_out} />
      </TouchableWithoutFeedback>
      <View style={styles.container_modal}>
        <PopupHeader
          text={'Thông tin tài sản'}
          onClose={() => {
            const handleClose = () => {
              utils.goBackNavigation()
            }
            endAnimation({
              callback: handleClose,
            })
          }}
          styleText={styles.titleText}
        />
        <AppScrollViewBody showsVerticalScrollIndicator={false}>
          <RowContent
            styleLabel={styles.half_view_label}
            label="Tên tài sản thế chấp"
            value={formatedPropertyInfo?.assetName}
          />

          <InfoInUseAreaSection data={formatedPropertyInfo?.assetInfo} />

          <InfoLocation data={formatedPropertyInfo?.locationInfo} />

          <InfoAssetAttachedSection
            dataRecord={formatedPropertyInfo?.propertyOnRecord}
            dataActual={formatedPropertyInfo?.propertyOnActual}
          />

          <InfoLandPricingSection data={formatedPropertyInfo?.landPricing} />

          <InfoAssetDescriptionSection data={formatedPropertyInfo?.valuation} />

          <View style={{gap: scale(8), paddingVertical: scale(16)}}>
            <AppText style={styles.title_group}>Tệp liên quan</AppText>
            <View style={{gap: scale(8)}}>
              <GroupContent
                showGroup={false}
                title={'Tài sản'}
                onPressGroup={utils.onChangeLayoutAnimation}>
                <View style={styles.content_group}>
                  {formatedPropertyInfo?.attachments?.asset?.length > 0 ? (
                    <>
                      {formatedPropertyInfo?.attachments.asset.map(
                        (file, index) => (
                          <CardFile
                            key={`asset_${index}`}
                            nameFile={file.name}
                            showStatusSign={false}
                            onPress={() => {
                              onPressFile(file?.idEncode, file.name)
                            }}
                            onSignFile={() => {}}
                          />
                        ),
                      )}
                    </>
                  ) : (
                    <View style={styles.container_empty_text}>
                      <AppText>Không có dữ liệu</AppText>
                    </View>
                  )}
                </View>
              </GroupContent>
              <GroupContent
                showGroup={false}
                title={'Khác'}
                onPressGroup={utils.onChangeLayoutAnimation}>
                <View style={styles.content_group}>
                  {formatedPropertyInfo?.attachments?.other?.length > 0 ? (
                    <>
                      {formatedPropertyInfo?.attachments.other.map(
                        (file, index) => (
                          <CardFile
                            key={`other_${index}`}
                            nameFile={file.name}
                            showStatusSign={false}
                            onPress={() => {
                              onPressFile(file.idEncode, file.name)
                            }}
                            onSignFile={() => {}}
                          />
                        ),
                      )}
                    </>
                  ) : (
                    <View style={styles.container_empty_text}>
                      <AppText>Không có dữ liệu</AppText>
                    </View>
                  )}
                </View>
              </GroupContent>
            </View>
          </View>
        </AppScrollViewBody>
      </View>
    </Animated.View>
  )
}

export default Modal_CollateralAssetDetails

const CollateralAssetDetailsStyles = (theme: AppTheme) => {
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
      borderTopRightRadius: scale(16),
      borderTopLeftRadius: scale(16),
      gap: scale(8),
      paddingHorizontal: scale(10),
      paddingTop: scale(16),
      paddingBottom: scale(16) + bottom / 2,
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
      flex: 0.8,
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
    container_empty_text: {
      paddingVertical: scale(8),
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
}
