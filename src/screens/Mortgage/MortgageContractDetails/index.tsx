import {StyleSheet, View} from 'react-native'
import React, {useEffect, useRef} from 'react'
import {AppTheme} from '~/styles/Theme'
import {scale} from '~/utils/scaleScreen'
import {useAppStyles, useDownloadFile} from '~/hooks'
import AppScrollViewBody from '~/components/AppScrollViewBody'
import {Fontsfamily} from '~/styles/FontsFamily'
import InfoSection, {InfoSectionHandle} from '../components/InfoSection'
import utils from '~/utils'
import CardFile from '~/screens/components/CardFile'
import useMortgageContractDetail from '../hooks/useMortgageContractDetail'
import InfoPropertiesOwnerSection, {
  InfoPropertiesOwnerSectionHandle,
} from '../components/InfoPropertiesOwnerSection'
import InfoPropertiesSection, {
  InfoPropertiesSectionHandle,
} from '../components/InfoPropertiesSection'
import HeaderWithBack from '~/screens/components/HeaderWithBack'
import {
  CustomDashedLine,
  SectionWrapper,
  StyledTitleOfSection,
  StyledWarperSection,
} from '~/screens/components'
import AppGroupFiles from '~/components/AppGroupFiles'
import {TYPE_ATTACH_FILE, TYPE_SIGN} from '~/constants'
import {AttachmentDetail} from '~/services/apis/fileService'
import {Screens} from '~/screens/Screens'
import EmptyFileView from '~/screens/components/EmptyFileView'
import {useAuth} from '~/redux/reduxHooks'
import signFileHandlerMortgage from '~/utils/signFileHandlerMortgage'
import BorrowerInfoSection, {
  BorrowerInfoSectionHandle,
} from '../components/BorrowerInfoSection'
// import FAB from '~/components/FAB'
// import {Icons} from '~/assets'

const FILE_GROUPS = [
  {
    type: TYPE_ATTACH_FILE.SIGNATURE_DIGITAL,
    title: 'Ký số',
  },
  {
    type: TYPE_ATTACH_FILE.SIGNATURE_LIVE,
    title: 'Ký sống',
  },
  {
    type: TYPE_ATTACH_FILE.OTHER,
    title: 'Các tài liệu liên quan',
  },
]

const MortgageContractDetails = props => {
  const {mortgageContractId} = utils.ngetParams(props, ['mortgageContractId'], {
    mortgageContractId: '',
  })
  const {signCaCloudFile, signNormalFile, signSimCaFile} =
    signFileHandlerMortgage()
  const {THEME} = useAppStyles()
  const styles = MortgageContractDetailsStyles(THEME)
  const refOwner = useRef<InfoPropertiesOwnerSectionHandle>(null)
  const refBorrower = useRef<BorrowerInfoSectionHandle>(null)
  const refProperty = useRef<InfoPropertiesSectionHandle>(null)
  const refInfo = useRef<InfoSectionHandle>(null)
  const {dataLogin} = useAuth()

  const refLoading = useRef<{show: () => void; hide: () => void}>({
    show: () => {
      refOwner.current?.show()
      refProperty.current?.show()
      refInfo.current?.show()
      refBorrower.current?.show()
    },
    hide: () => {
      refOwner.current?.hide()
      refProperty.current?.hide()
      refInfo.current?.hide()
      refBorrower.current?.hide()
    },
  })

  const {mortgageContract, mortgageContractFiles, reLoadData} =
    useMortgageContractDetail({
      mortgageContractId: mortgageContractId,
      refLoading: refLoading,
    })

  const {
    isDownloading,
    downloadProgress,
    error,
    downloadedFileName,
    filePath,
    downloadFile,
  } = useDownloadFile()

  const onPressFile = (item: AttachmentDetail) => {
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

  const onShowOptionSign = (file: AttachmentDetail) => async () => {
    utils.navigate(Screens.name.Modal_OptionSign, {
      onSignCallback: (typeSign: string) => {
        switch (typeSign) {
          case TYPE_SIGN.NORMAL:
            signNormalFile(
              {
                attachId: file.attachId,
                objectType: file.objectType,
              },
              () => {
                reLoadData()
              },
            )
            break

          case TYPE_SIGN.CA_CLOUD:
            signCaCloudFile(
              {
                attachId: file.attachId,
                objectType: file.objectType,
              },
              () => {
                reLoadData()
              },
            )
            break

          case TYPE_SIGN.SIM_CA:
            signSimCaFile(
              {
                attachId: file.attachId,
                objectType: file.objectType,
              },
              () => {
                reLoadData()
              },
            )
            break
          default:
            break
        }
      },
    })
  }

  const isSigned = (listSinger: string) => {
    if (listSinger?.length > 0)
      return listSinger?.split(';').includes(dataLogin?.user_id?.toString())
    return false
  }

  return (
    <View style={styles.container}>
      <HeaderWithBack title="Thông tin hợp đồng thế chấp" />
      <AppScrollViewBody
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <InfoSection data={mortgageContract?.mortgageContract} ref={refInfo} />

        <InfoPropertiesOwnerSection
          data={mortgageContract?.customers}
          ref={refOwner}
        />

        <BorrowerInfoSection
          data={mortgageContract?.borrowers}
          ref={refBorrower}
        />

        <InfoPropertiesSection
          data={mortgageContract?.properties}
          ref={refProperty}
        />

        <SectionWrapper>
          <StyledTitleOfSection title="Tệp liên quan" />
          <StyledWarperSection style={{gap: scale(10)}}>
            {FILE_GROUPS.map(group => {
              const files = mortgageContractFiles?.filter(
                file => file.attachType === group.type,
              )

              if (!files || files.length === 0)
                return (
                  <AppGroupFiles
                    key={group.type}
                    title={group.title}
                    onPressGroup={utils.onChangeLayoutAnimation}>
                    <EmptyFileView />
                  </AppGroupFiles>
                )

              const liveSign = group.type === TYPE_ATTACH_FILE.SIGNATURE_LIVE

              return (
                <AppGroupFiles
                  key={group.type}
                  title={group.title}
                  onPressGroup={utils.onChangeLayoutAnimation}>
                  {files.map((file, index) => (
                    <React.Fragment key={file.attachId || index}>
                      <CardFile
                        nameFile={file?.attachName || '---'}
                        onPress={() => {
                          onPressFile(file)
                        }}
                        onSignFile={onShowOptionSign(file)}
                        isSigned={isSigned(file?.signers)}
                        showSign={liveSign ? false : !isSigned(file?.signers)}
                        showStatusSign={!liveSign}
                      />
                      {index < files.length - 1 && <CustomDashedLine />}
                    </React.Fragment>
                  ))}
                </AppGroupFiles>
              )
            })}
          </StyledWarperSection>
        </SectionWrapper>
      </AppScrollViewBody>
      {/* <FAB
        staticMenu={[
          {
            idItem: 1,
            icon: Icons.icActionConfirm,
            backgroundColor: THEME.colors.fab.brown,
          },
          {
            idItem: 2,
            icon: Icons.icActionConfirm,
            backgroundColor: THEME.colors.fab.darkGray,
          },
          {
            idItem: 3,
            icon: Icons.icActionConfirm,
            backgroundColor: THEME.colors.fab.oliveGreen,
          },
        ]}
        hiddenMenu={{
          list: [
            {
              idItem: 1,
              icon: Icons.icActionConfirm,
              backgroundColor: THEME.colors.fab.brown,
            },
            {
              idItem: 2,
              icon: Icons.icActionConfirm,
              backgroundColor: THEME.colors.fab.darkGray,
            },
            {
              idItem: 3,
              icon: Icons.icActionConfirm,
              backgroundColor: THEME.colors.fab.oliveGreen,
            },
          ],
          showText: true,
        }}
      /> */}
    </View>
  )
}

export default MortgageContractDetails

const MortgageContractDetailsStyles = (theme: AppTheme) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {colors, sizes, fonts} = theme
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      paddingBottom: scale(150),
    },
    label_long: {
      flex: 0.8,
    },
    title_group: {
      fontSize: sizes.h4,
      fontFamily: Fontsfamily.OpenSans.SemiBold,
      color: colors.text.primary,
    },
    content_group: {
      gap: scale(10),
    },
    container_empty_text: {
      alignItems: 'center',
    },
  })
}
