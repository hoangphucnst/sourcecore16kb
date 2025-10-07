import React, {forwardRef, useImperativeHandle, useState} from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'
import {Property} from '~/services/apis/mortgageService'
import CardCollateral from './CardCollateral'
import EmptyListView from '~/screens/components/EmptyListView'
import {Fontsfamily} from '~/styles/FontsFamily'
import {AppTheme} from '~/styles/Theme'
import {useAppStyles} from '~/hooks'
import utils from '~/utils'
import {Screens} from '~/screens/Screens'
import {scale} from '~/utils/scaleScreen'
import {
  DashLine,
  SectionWrapper,
  StyledTitleOfSection,
  StyledWarperSection,
} from '~/screens/components'

export interface InfoPropertiesSectionHandle {
  show: () => void
  hide: () => void
}

const InfoPropertiesSection = forwardRef<
  InfoPropertiesSectionHandle,
  {data?: Property[]}
>(({data = []}, ref) => {
  const {THEME} = useAppStyles()
  const styles = PropertiesSectionStyles(THEME)

  const [loading, setLoading] = useState(true)

  useImperativeHandle(ref, () => ({
    show: () => setLoading(true),
    hide: () => setLoading(false),
  }))

  if (loading) {
    return (
      <SectionWrapper>
        <StyledTitleOfSection title="Danh sách tài sản" />
        <StyledWarperSection style={styles.container_loading}>
          <ActivityIndicator size="small" color={THEME.colors.primary} />
        </StyledWarperSection>
      </SectionWrapper>
    )
  }

  if (data.length === 0) {
    return (
      <SectionWrapper>
        <StyledTitleOfSection title="Danh sách tài sản" />
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
      <StyledTitleOfSection title="Danh sách tài sản" />
      <StyledWarperSection>
        {data.map((item, index) => {
          const isLast = index === data.length - 1
          return (
            <View key={`TS_${index}`}>
              <CardCollateral
                data={item}
                onPress={() => {
                  utils.navigate(Screens.name.Modal_CollateralAssetDetails, {
                    statusbar_bg: THEME.colors.primary,
                    statusbar_content: 'light-content',
                    propertyInfo: item,
                  })
                }}
              />
              {!isLast && <DashLine />}
            </View>
          )
        })}
      </StyledWarperSection>
    </SectionWrapper>
  )
})

InfoPropertiesSection.displayName = 'InfoPropertiesSection'

export default InfoPropertiesSection

const PropertiesSectionStyles = (theme: AppTheme) => {
  const {colors, sizes} = theme
  return StyleSheet.create({
    title_group: {
      fontSize: sizes.h4,
      fontFamily: Fontsfamily.OpenSans.SemiBold,
      color: colors.text.primary,
    },
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
