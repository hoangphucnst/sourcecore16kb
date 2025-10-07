import React, {forwardRef, useImperativeHandle, useState} from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'
import {scale} from '~/utils/scaleScreen'
import {useAppStyles} from '~/hooks'
import {Fontsfamily} from '~/styles/FontsFamily'
import {AppTheme} from '~/styles/Theme'
import {MortgageContract} from '~/services/apis/mortgageService'
import {
  RowContent,
  SectionWrapper,
  StyledTitleOfSection,
  StyledWarperSection,
} from '~/screens/components'
import utils from '~/utils'

export interface InfoSectionHandle {
  show: () => void
  hide: () => void
}

const InfoSection = forwardRef<
  InfoSectionHandle,
  {
    data: MortgageContract
    emptyText?: string
  }
>(({data, emptyText = '---'}, ref) => {
  const {THEME} = useAppStyles()
  const styles = InfoSectionStyles(THEME)

  const [loading, setLoading] = useState(true)

  useImperativeHandle(ref, () => ({
    show: () => setLoading(true),
    hide: () => setLoading(false),
  }))

  if (loading) {
    return (
      <SectionWrapper>
        <StyledTitleOfSection title="Tổng quan" />
        <View>
          <ActivityIndicator size="small" color={THEME.colors.primary} />
        </View>
      </SectionWrapper>
    )
  }

  return (
    <SectionWrapper>
      <StyledTitleOfSection title="Tổng quan" />
      <StyledWarperSection style={styles.baseBlock}>
        {/* <RowContent
          label="Mã hồ sơ"
          value={utils.safeValue(data?.mortgageContractCode)}
        /> */}
        <RowContent
          label="Số HĐTD"
          value={utils.safeValue(data?.creditContractNumber)}
        />
        <RowContent
          label="Số HĐTC"
          value={utils.safeValue(data?.mortgageContractNumber)}
        />
        <RowContent
          label="Ngày tạo"
          value={utils.safeValue(data?.createTime)}
        />
        <RowContent
          label="Số tiền cho vay tối đa trên giá trị tài sản"
          value={
            utils.isDefined(data?.amount)
              ? `${utils.formatMoney(data?.amount)}`
              : emptyText
          }
          styleLabel={styles.label_long}
        />
        <RowContent
          label="Số tiền đề nghị vay"
          value={
            utils.isDefined(data?.loanAmount)
              ? `${utils.formatMoney(data?.loanAmount)}`
              : emptyText
          }
          styleLabel={styles.label_long}
        />
        <RowContent
          label="Loại thế chấp"
          value={utils.safeValue(data?.mortgageType)}
        />
        <RowContent
          label="Người nhận TSTC (Thủ quỹ)"
          value={utils.safeValue(data?.mortgagePropertyReceiverString)}
          styleLabel={styles.label_long}
        />
      </StyledWarperSection>
    </SectionWrapper>
  )
})

InfoSection.displayName = 'InfoSection'

export default InfoSection

const InfoSectionStyles = (theme: AppTheme) => {
  const {colors, sizes} = theme
  return StyleSheet.create({
    container: {
      gap: scale(8),
    },
    baseBlock: {
      backgroundColor: colors.white,
      gap: scale(8),
    },
    label_long: {
      flex: 0.8,
    },
    title_group: {
      fontSize: sizes.h4,
      fontFamily: Fontsfamily.OpenSans.SemiBold,
      color: colors.text.primary,
    },
  })
}
