import {StyleSheet, View} from 'react-native'
import React, {Fragment, useCallback, useEffect, useRef} from 'react'
import {AppTheme} from '~/styles/Theme'
import {useAppStyles} from '~/hooks'
import AppHeader from '~/components/AppHeader'
import {Icons} from '~/assets'
import {scale} from '~/utils/scaleScreen'
import utils from '~/utils'
import RowContent from '~/screens/components/RowContent'
import CardRelative from '~/screens/components/CardRelative'
import CardFile from '~/screens/components/CardFile'
import LoadingSpinner, {TypeRefLoading} from '~/components/LoadingSpinner'
import {Attachment, Customer} from '~/services/apis/customerService'
import {TYPE_ATTACH_FILE} from '~/constants'
import {Fontsfamily} from '~/styles/FontsFamily'
import {useDownloadFile} from '~/hooks'
import {Screens} from '~/screens/Screens'
import BoxView from '~/hoc/BoxView'
import AppGroupFiles from '~/components/AppGroupFiles'
import CustomDashedLine from '~/screens/components/CustomDashedLine'
import {
  EmptyFileView,
  SectionWrapper,
  StyledTitleOfSection,
} from '~/screens/components'
import useCustomerDetail from '../hooks/useCustomerDetail'
import AppScrollViewBody from '~/components/AppScrollViewBody'
import AppText from '~/components/AppText'
import AppImage from '~/components/AppImage'

const DetailsCutomer = props => {
  const {THEME} = useAppStyles()
  const styles = useCallback(styleWithTheme, [THEME])(THEME)
  const refLoading = useRef<TypeRefLoading>(null)
  const customer: Customer = utils.ngetParam(props, 'customer', null)
  const {detailsCustomer, detailsCustomerFiles} = useCustomerDetail({
    customerId: customer.customerId,
    refLoading: refLoading,
  })
  const {
    isDownloading,
    downloadProgress,
    error,
    downloadedFileName,
    filePath,
    downloadFile,
    getUrlCustomerSignImage,
  } = useDownloadFile()

  const getAttachmentsByType = (type: number) =>
    detailsCustomerFiles?.filter(item => item.attachType === type) || []

  const showAttachFile = detailsCustomerFiles?.length > 0

  const onBack = () => utils.goBackNavigation()

  const onPressFile = (item: Attachment) => {
    downloadFile({
      attachIdEncode: item?.attachIdEncode,
      fileName: item?.attachName,
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
        filePath,
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
    <View style={styles.container}>
      <AppHeader
        title="Chi tiết khách hàng"
        styleTitle={{
          color: THEME.colors.white,
        }}
        styleHeader={{
          backgroundColor: THEME.colors.primary,
        }}
        iconLeft={Icons.icBack}
        styleIconLeft={{
          width: scale(24),
          height: scale(24),
          tintColor: THEME.colors.white,
        }}
        onPressLeft={onBack}
      />
      <AppScrollViewBody
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <SectionWrapper>
          <StyledTitleOfSection title="Thông tin khách hàng" />
          <BoxView>
            <RowContent
              label="Mã khách hàng"
              value={utils.safeValue(
                detailsCustomer?.customerMain?.customerCode,
              )}
            />
            <RowContent
              label="Họ và tên"
              value={utils.safeValue(detailsCustomer?.customerMain?.fullName)}
            />
            <RowContent
              label="Ngày sinh"
              value={utils.safeValue(
                detailsCustomer?.customerMain?.dateOfBirth,
              )}
            />
            <RowContent
              label="Giới tính"
              value={utils.safeValue(
                detailsCustomer?.customerMain?.gender === 1
                  ? 'Nam'
                  : detailsCustomer?.customerMain?.gender === 0
                    ? 'Nữ'
                    : null,
              )}
            />
            <RowContent
              label="Địa chỉ"
              value={utils.safeValue(detailsCustomer?.customerMain?.address)}
            />
            <RowContent
              label="CMND"
              value={utils.safeValue(detailsCustomer?.customerMain?.idNumber)}
            />
            <RowContent
              label="Nơi cấp"
              value={utils.safeValue(
                detailsCustomer?.customerMain?.placeofissuecmnd,
              )}
            />
            <RowContent
              label="CCCD"
              value={utils.safeValue(detailsCustomer?.customerMain?.cccd)}
            />
            <RowContent
              label="Ngày cấp"
              value={utils.safeValue(
                detailsCustomer?.customerMain?.idIssueDate,
              )}
            />
            <RowContent
              label="Ngày hết hạn"
              value={utils.safeValue(
                detailsCustomer?.customerMain?.idExpiryDate,
              )}
            />
            <RowContent
              label="Nơi cấp"
              value={utils.safeValue(
                detailsCustomer?.customerMain?.placeofissuecccd,
              )}
            />
            <RowContent
              label="Email"
              value={utils.safeValue(detailsCustomer?.customerMain?.email)}
            />
            <RowContent
              label="Số điện thoại"
              value={utils.safeValue(
                detailsCustomer?.customerMain?.phoneNumber,
              )}
            />
            <RowContent
              label="Tình trạng hôn nhân"
              styleLabel={styles.label_long}
              value={utils.safeValue(
                detailsCustomer?.customerMain?.maritalStatus,
              )}
            />
            <RowContent
              label="Số sổ góp vốn"
              styleLabel={styles.label_long}
              value={utils.safeValue(
                detailsCustomer?.customerMain?.membershipNumber,
              )}
            />
            <RowContent
              label="Thuộc nhóm đối tượng hạn chế"
              styleLabel={styles.label_long}
              value={
                detailsCustomer?.customerMain?.limited === 1 ? 'Có' : 'Không'
              }
            />
            <RowContent
              label="Học vấn"
              value={utils.safeValue(detailsCustomer?.customerMain?.education)}
            />
            <RowContent
              label="Nghề nghiệp"
              value={utils.safeValue(detailsCustomer?.customerMain?.job)}
            />
            <RowContent
              label="Người phụ thuộc"
              value={utils.safeValue(detailsCustomer?.customerMain?.dependents)}
            />
            <RowContent
              label="Học vấn"
              value={utils.safeValue(detailsCustomer?.customerMain?.education)}
            />
            <RowContent
              label="Số thẻ thành viên"
              value={utils.safeValue(
                detailsCustomer?.customerMain?.membershipNumber,
              )}
            />
            <RowContent
              label="Năng lực pháp luật dân sự"
              value={utils.safeValue(
                detailsCustomer?.customerMain?.civilLegalCapacity,
              )}
            />
            <RowContent
              label="Năng lực hành vi dân sự"
              value={utils.safeValue(
                detailsCustomer?.customerMain?.civilCapacity,
              )}
            />
            <RowContent
              label="Ghi chú"
              value={utils.safeValue(detailsCustomer?.customerMain?.note)}
            />

            <View style={styles.row}>
              <AppText style={styles.label}>Ảnh ký</AppText>
              <View style={styles.circleSignImage}>
                <AppImage
                  source={{
                    uri: getUrlCustomerSignImage({
                      id: detailsCustomer?.customerMain?.customerId,
                    }),
                  }}
                  style={styles.signImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          </BoxView>
        </SectionWrapper>

        <SectionWrapper>
          <StyledTitleOfSection title="Thông tin thân nhân" />
          <BoxView>
            {detailsCustomer?.relatedCustomers?.length > 0 ? (
              detailsCustomer?.relatedCustomers?.map((item, index) => (
                <CardRelative
                  key={index}
                  fullname={utils.safeValue(item?.fullName)}
                  code={utils.safeValue(item?.customerCode)}
                  relationship={utils.safeValue(item?.relation)}
                  birthday={`Ngày sinh: ${utils.safeValue(item?.dateOfBirth)}`}
                  id={`CCCD: ${utils.safeValue(item?.cccd)}`}
                  address={utils.safeValue(item.address)}
                  styleContainer={{marginBottom: scale(8)}}
                />
              ))
            ) : (
              <EmptyFileView />
            )}
          </BoxView>
        </SectionWrapper>

        <SectionWrapper>
          <StyledTitleOfSection title="Tệp liên quan" />
          <BoxView style={{gap: scale(10)}}>
            <AppGroupFiles
              title={'Căn cước công dân'}
              onPressGroup={utils.onChangeLayoutAnimation}>
              <View style={styles.content_group}>
                {showAttachFile ? (
                  <>
                    {getAttachmentsByType(TYPE_ATTACH_FILE.CCCD).map(
                      (item, index) => (
                        <Fragment key={`CCCD_file_${index}`}>
                          <CardFile
                            nameFile={item.attachName}
                            showStatusSign={false}
                            onPress={() => {
                              onPressFile(item)
                            }}
                            onSignFile={() => {}}
                          />
                          {getAttachmentsByType(TYPE_ATTACH_FILE.CCCD).length -
                            1 !==
                            index && <CustomDashedLine />}
                        </Fragment>
                      ),
                    )}
                    {getAttachmentsByType(TYPE_ATTACH_FILE.CCCD).length ===
                      0 && <EmptyFileView />}
                  </>
                ) : (
                  <EmptyFileView />
                )}
              </View>
            </AppGroupFiles>

            <AppGroupFiles
              title={'Khác'}
              onPressGroup={utils.onChangeLayoutAnimation}>
              {showAttachFile ? (
                <>
                  {getAttachmentsByType(TYPE_ATTACH_FILE.OTHER).map(
                    (item, index) => (
                      <Fragment key={`Other_file_${index}`}>
                        <CardFile
                          nameFile={item.attachName}
                          showStatusSign={false}
                          onPress={() => {
                            onPressFile(item)
                          }}
                          onSignFile={() => {}}
                        />
                        {getAttachmentsByType(TYPE_ATTACH_FILE.OTHER).length -
                          1 !==
                          index && <CustomDashedLine />}
                      </Fragment>
                    ),
                  )}
                  {getAttachmentsByType(TYPE_ATTACH_FILE.OTHER).length ===
                    0 && <EmptyFileView />}
                </>
              ) : (
                <EmptyFileView />
              )}
            </AppGroupFiles>
          </BoxView>
        </SectionWrapper>

        <SectionWrapper>
          <StyledTitleOfSection title="Tệp đính kèm" />
          <BoxView style={{gap: scale(10)}}>
            <AppGroupFiles
              title={'Ký số'}
              onPressGroup={utils.onChangeLayoutAnimation}>
              {showAttachFile ? (
                <>
                  {getAttachmentsByType(TYPE_ATTACH_FILE.SIGNATURE_DIGITAL).map(
                    (item, index) => (
                      <Fragment key={`SIGNATURE_DIGITAL_${index}`}>
                        <CardFile
                          nameFile={item.attachName}
                          showStatusSign={false}
                          isSigned={item.isAutoGen === 1}
                          onPress={() => {
                            onPressFile(item)
                          }}
                          onSignFile={() => {}}
                        />
                        {getAttachmentsByType(
                          TYPE_ATTACH_FILE.SIGNATURE_DIGITAL,
                        ).length -
                          1 !==
                          index && <CustomDashedLine />}
                      </Fragment>
                    ),
                  )}
                  {getAttachmentsByType(TYPE_ATTACH_FILE.SIGNATURE_DIGITAL)
                    .length === 0 && <EmptyFileView />}
                </>
              ) : (
                <EmptyFileView />
              )}
            </AppGroupFiles>

            <AppGroupFiles
              title={'Ký sống'}
              onPressGroup={utils.onChangeLayoutAnimation}>
              {showAttachFile ? (
                <>
                  {getAttachmentsByType(TYPE_ATTACH_FILE.SIGNATURE_LIVE).map(
                    (item, index) => (
                      <Fragment key={`SIGNATURE_LIVE_${index}`}>
                        <CardFile
                          nameFile={item.attachName}
                          showStatusSign={false}
                          isSigned={item.isAutoGen === 1}
                          onPress={() => {
                            onPressFile(item)
                          }}
                          onSignFile={() => {}}
                        />
                        {getAttachmentsByType(TYPE_ATTACH_FILE.SIGNATURE_LIVE)
                          .length -
                          1 !==
                          index && <CustomDashedLine />}
                      </Fragment>
                    ),
                  )}
                  {getAttachmentsByType(TYPE_ATTACH_FILE.SIGNATURE_LIVE)
                    .length === 0 && <EmptyFileView />}
                </>
              ) : (
                <EmptyFileView />
              )}
            </AppGroupFiles>
          </BoxView>
        </SectionWrapper>
      </AppScrollViewBody>
      <LoadingSpinner ref={refLoading} />
    </View>
  )
}

export default DetailsCutomer

const styleWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: THEME.colors.background,
    },
    content: {
      paddingTop: scale(10),
      paddingBottom: scale(150),
    },
    label_long: {
      flex: 0.5,
    },
    title_group: {
      fontSize: THEME.sizes.h4,
      // fontWeight: THEME.fonts.semibold,
      fontFamily: Fontsfamily.OpenSans.SemiBold,
      color: THEME.colors.primary,
      marginVertical: scale(10),
    },
    content_group: {
      gap: scale(8),
      marginTop: scale(8),
      // paddingBottom: scale(10),
    },
    label: {
      flex: 0.5,
      color: THEME.colors.text.secondary,
    },
    signImage: {
      width: scale(43),
      height: scale(43),
      borderRadius: scale(43),
    },
    circleSignImage: {
      width: scale(45),
      height: scale(45),
      borderRadius: scale(45),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: scale(2),
      alignSelf: 'flex-end',
      borderColor: THEME.colors.primary,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: scale(10),
    },
  })
