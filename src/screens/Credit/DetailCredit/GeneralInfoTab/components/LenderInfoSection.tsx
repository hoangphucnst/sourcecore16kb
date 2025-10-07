import React, {memo} from 'react'
import {scale} from '~/utils/scaleScreen'
import LenderItem from './LenderItem'
import {
  EmptyFileView,
  SectionWrapper,
  StyledTitleOfSection,
  StyledWarperSection,
} from '~/screens/components'
import {BorrowerInfo} from '~/screens/Credit/hooks/useDetailCreditContract'

interface LenderInfoSectionProps {
  data: BorrowerInfo[]
}

const LenderInfoSection = ({data = []}: LenderInfoSectionProps) => {
  return (
    <SectionWrapper>
      <StyledTitleOfSection title="Người vay" />
      <StyledWarperSection style={{gap: scale(10)}}>
        {data?.length === 0 ? (
          <EmptyFileView />
        ) : (
          <>
            {data?.map((item, index) => (
              <LenderItem key={`${item?.fullName}_${index}`} data={item} />
            ))}
          </>
        )}
      </StyledWarperSection>
    </SectionWrapper>
  )
}

export default memo(LenderInfoSection)
