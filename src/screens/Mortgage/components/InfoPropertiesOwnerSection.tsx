import React, {forwardRef, useImperativeHandle} from 'react'
import {ActivityIndicator, StyleSheet} from 'react-native'
import CardCollateralOwner from './CardCollateralOwner'
import {Borrower} from '~/services/apis/mortgageService'
import {scale} from '~/utils/scaleScreen'
import {useAppStyles} from '~/hooks'
import EmptyListView from '~/screens/components/EmptyListView'
import {AppTheme} from '~/styles/Theme'
import {
  SectionWrapper,
  StyledTitleOfSection,
  StyledWarperSection,
} from '~/screens/components'
import utils from '~/utils'

export interface InfoPropertiesOwnerSectionHandle {
  show: () => void
  hide: () => void
}

const InfoPropertiesOwnerSection = forwardRef<
  InfoPropertiesOwnerSectionHandle,
  {
    data?: Borrower[]
  }
>(({data = []}, ref) => {
  const {THEME} = useAppStyles()
  const styles = OwnerSectionStyles(THEME)

  const [loading, setLoading] = React.useState(true)

  useImperativeHandle(ref, () => ({
    show: () => setLoading(true),
    hide: () => setLoading(false),
  }))

  if (loading) {
    return (
      <SectionWrapper>
        <StyledTitleOfSection title="Chủ tài sản thế chấp" />
        <StyledWarperSection style={styles.container_loading}>
          <ActivityIndicator size="small" color={THEME.colors.primary} />
        </StyledWarperSection>
      </SectionWrapper>
    )
  }

  if (data.length === 0) {
    return (
      <SectionWrapper>
        <StyledTitleOfSection title="Chủ tài sản thế chấp" />
        <StyledWarperSection>
          <EmptyListView
            textEmpty={'Không có dữ liệu'}
            enableMargin={false}
            iconSize={60}
          />
        </StyledWarperSection>
      </SectionWrapper>
    )
  }

  return (
    <SectionWrapper>
      <StyledTitleOfSection title="Chủ tài sản thế chấp" />
      <StyledWarperSection>
        {data.map((item, index) => (
          <CardCollateralOwner
            key={`ChuTaiSan_${index}`}
            fullname={item.fullName || ''}
            code={item.customerCode || ''}
            id={`CCCD: ${utils.safeValue(item?.cccd)}`}
            address={`Địa chỉ: ${utils.safeValue(item?.address)}`}
            styleContainer={{marginBottom: scale(8)}}
          />
        ))}
      </StyledWarperSection>
    </SectionWrapper>
  )
})

InfoPropertiesOwnerSection.displayName = 'InfoPropertiesOwnerSection'

export default InfoPropertiesOwnerSection

const OwnerSectionStyles = (theme: AppTheme) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {colors, sizes, fonts} = theme
  return StyleSheet.create({
    container_loading: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: scale(10),
    },
    content_group: {
      gap: scale(8),
    },
  })
}
