import {ActivityIndicator, StyleSheet, View} from 'react-native'
import React, {Fragment, useEffect, useState} from 'react'
import AppScrollViewBody from '~/components/AppScrollViewBody'
import {scale} from '~/utils/scaleScreen'
import {Fontsfamily} from '~/styles/FontsFamily'
import CardFile from '~/screens/components/CardFile'
import utils from '~/utils'
import ProcessorSection from './components/ProcessorSection'
import LenderInfoSection from './components/LenderInfoSection'
import BeneficiaryInfoSection from './components/BeneficiaryInfoSection'
import {useAppStyles, useDownloadFile} from '~/hooks'
import GeneralInfoSection from './components/GeneralInfoSection'
import RepresentativeSection from './components/RepresentativeSection'
import AppGroupFiles from '~/components/AppGroupFiles'
import CustomDashedLine from '~/screens/components/CustomDashedLine'
import StyledTitleOfSection from '~/screens/components/StyledTitleOfSection'
import {
  EmptyFileView,
  SectionWrapper,
  StyledTabWarper,
  StyledWarperSection,
} from '~/screens/components'
import {DisplayDetailContract} from '../../hooks/useDetailCreditContract'
import {TYPE_ATTACH_FILE_CREDIT_CONTRACT, TYPE_SIGN} from '~/constants'
import {Screens} from '~/screens/Screens'
import {AttachmentFile} from '~/services/apis/creditService'
import {useAuth} from '~/redux/reduxHooks'
import signFileHandlerCredit from '~/utils/signFileHandlerCredit'
import MortgageContractSection from './components/MortgageContractSection'
import DebtRepaymentPlanSection from './components/DebtRepaymentPlanSection'

const GeneralInfo = ({
  detailCreditContractHook,
}: {
  detailCreditContractHook: {
    isLoading: boolean
    detailCreditContract: DisplayDetailContract
    refreshDetail: () => void
    refreshFeedback: () => void
  }
}) => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  const styles = Styles()

  const {
    isLoading: isLoadingDetailCredit,
    detailCreditContract,
    refreshDetail,
  } = detailCreditContractHook
  const data = detailCreditContract?.generalInfoScreen || null
  const {dataLogin} = useAuth()

  const [loading, setLoading] = useState(isLoadingDetailCredit.generalInfo)

  const {
    isDownloading,
    downloadProgress,
    error,
    downloadedFileName,
    filePath,
    downloadFile,
  } = useDownloadFile()

  const getAttachmentsByType = (type: number) =>
    data?.attachments?.filter(item => item.attachType === type) || []
  const {signNormalFile, signCaCloudFile, signSimCaFile} =
    signFileHandlerCredit()

  useEffect(() => {
    setLoading(isLoadingDetailCredit.generalInfo)
  }, [isLoadingDetailCredit.generalInfo])

  const onPressFile = (item: AttachmentFile) => {
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

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  const isSigned = (listSinger: string) => {
    if (listSinger?.length > 0)
      return listSinger?.split(';').includes(dataLogin?.user_id?.toString())
    return false
  }

  const onShowOptionSign = (file: AttachmentFile) => async () => {
    utils.navigate(Screens.name.Modal_Credit_OptionSign, {
      onSignCallback: (typeSign: string, agree: boolean) => {
        switch (typeSign) {
          case TYPE_SIGN.NORMAL:
            signNormalFile({
              data: {
                attachId: file.attachId,
                objectType: file.objectType,
                agree: agree,
              },
              callbackSuccess() {
                refreshDetail()
              },
            })
            break

          case TYPE_SIGN.CA_CLOUD:
            signCaCloudFile({
              data: {
                attachId: file.attachId,
                objectType: file.objectType,
                agree: agree,
              },
              callbackSuccess() {
                refreshDetail()
              },
            })
            break

          case TYPE_SIGN.SIM_CA:
            signSimCaFile({
              data: {
                attachId: file.attachId,
                objectType: file.objectType,
                agree: agree,
              },
              callbackSuccess() {
                refreshDetail()
              },
            })
            break
          default:
            break
        }
      },
    })
  }

  return (
    <AppScrollViewBody showsVerticalScrollIndicator={false}>
      <StyledTabWarper>
        <GeneralInfoSection data={data?.generalInfo || null} />

        <MortgageContractSection data={data?.mortgages || []} />

        <LenderInfoSection data={data?.borrowers || []} />

        <BeneficiaryInfoSection data={data?.beneficiaries || []} />

        <DebtRepaymentPlanSection data={data?.debtRepayPlan} />

        <ProcessorSection data={data?.handlers || []} />

        <RepresentativeSection data={data?.representatives || []} />

        {/* Section Tệp đính kèm */}
        <SectionWrapper>
          <StyledTitleOfSection title="Tệp đính kèm" />
          <StyledWarperSection>
            <View style={styles.groupList}>
              <AppGroupFiles
                title="Tài liệu ký số"
                onPressGroup={utils.onChangeLayoutAnimation}>
                <>
                  {getAttachmentsByType(
                    TYPE_ATTACH_FILE_CREDIT_CONTRACT.SIGNATURE_DIGITAL,
                  ).map((item, index) => (
                    <Fragment key={`TL_ky_so_${index}`}>
                      <CardFile
                        nameFile={item.attachName}
                        isSigned={isSigned(item?.signers)}
                        showSign={!isSigned(item?.signers)}
                        onPress={() => {
                          onPressFile(item)
                        }}
                        onSignFile={onShowOptionSign(item)}
                      />
                      {getAttachmentsByType(
                        TYPE_ATTACH_FILE_CREDIT_CONTRACT.SIGNATURE_DIGITAL,
                      ).length -
                        1 !==
                        index && <CustomDashedLine />}
                    </Fragment>
                  ))}
                  {getAttachmentsByType(
                    TYPE_ATTACH_FILE_CREDIT_CONTRACT.SIGNATURE_DIGITAL,
                  ).length === 0 && <EmptyFileView />}
                </>
              </AppGroupFiles>
              <AppGroupFiles
                title="Tài liệu ký sống"
                onPressGroup={utils.onChangeLayoutAnimation}>
                <>
                  {getAttachmentsByType(
                    TYPE_ATTACH_FILE_CREDIT_CONTRACT.SIGNATURE_LIVE,
                  ).map((item, index) => (
                    <Fragment key={`TL_ky_song_${index}`}>
                      <CardFile
                        nameFile={item.attachName}
                        // isSigned={isSigned(item?.signers)}
                        // showSign={!isSigned(item?.signers)}
                        showStatusSign={false}
                        onPress={() => {
                          onPressFile(item)
                        }}
                        // onSignFile={onShowOptionSign(item)}
                      />
                      {getAttachmentsByType(
                        TYPE_ATTACH_FILE_CREDIT_CONTRACT.SIGNATURE_LIVE,
                      ).length -
                        1 !==
                        index && <CustomDashedLine />}
                    </Fragment>
                  ))}
                  {getAttachmentsByType(
                    TYPE_ATTACH_FILE_CREDIT_CONTRACT.SIGNATURE_LIVE,
                  ).length === 0 && <EmptyFileView />}
                </>
              </AppGroupFiles>
              <AppGroupFiles
                title="Tài liệu khác"
                onPressGroup={utils.onChangeLayoutAnimation}>
                <>
                  {getAttachmentsByType(
                    TYPE_ATTACH_FILE_CREDIT_CONTRACT.CCCD,
                  ).map((item, index) => (
                    <Fragment key={`TL_ky_khac_${index}`}>
                      <CardFile
                        nameFile={item.attachName}
                        showStatusSign={false}
                        onPress={() => {
                          onPressFile(item)
                        }}
                        onSignFile={() => {}}
                      />
                      {getAttachmentsByType(
                        TYPE_ATTACH_FILE_CREDIT_CONTRACT.CCCD,
                      ).length -
                        1 !==
                        index && <CustomDashedLine />}
                    </Fragment>
                  ))}
                  {getAttachmentsByType(
                    TYPE_ATTACH_FILE_CREDIT_CONTRACT.OTHER,
                  ).map((item, index) => (
                    <Fragment key={`TL_ky_so_${index}`}>
                      <CardFile
                        nameFile={item.attachName}
                        showStatusSign={false}
                        onPress={() => {
                          onPressFile(item)
                        }}
                        onSignFile={() => {}}
                      />
                      {getAttachmentsByType(
                        TYPE_ATTACH_FILE_CREDIT_CONTRACT.OTHER,
                      ).length -
                        1 !==
                        index && <CustomDashedLine />}
                    </Fragment>
                  ))}
                  {getAttachmentsByType(TYPE_ATTACH_FILE_CREDIT_CONTRACT.OTHER)
                    .length === 0 && <EmptyFileView />}
                </>
              </AppGroupFiles>
            </View>
          </StyledWarperSection>
        </SectionWrapper>
      </StyledTabWarper>
    </AppScrollViewBody>
  )
}

export default React.memo(GeneralInfo)

// ------------------- Styles ------------------------

const Styles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    attachmentSection: {
      paddingVertical: scale(10),
      paddingHorizontal: scale(8),
      gap: scale(14),
      backgroundColor: colors.white,
      borderRadius: scale(10),
    },
    text_file_type: {
      fontFamily: Fontsfamily.Nunito.SemiBold,
      color: colors.text.primary,
    },
    groupList: {
      gap: scale(14),
    },
    fileList: {
      gap: scale(6),
    },
    bottomSpacer: {
      height: scale(40),
    },
    loading: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: scale(30),
    },
  })
}
