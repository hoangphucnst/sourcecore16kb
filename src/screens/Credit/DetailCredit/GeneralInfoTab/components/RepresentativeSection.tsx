import React from 'react'
import {scale} from '~/utils/scaleScreen'
import RepresentativeCard from './RepresentativeCard'
import {
  EmptyFileView,
  SectionWrapper,
  StyledTitleOfSection,
  StyledWarperSection,
} from '~/screens/components'
import {HandlerInfo} from '~/screens/Credit/hooks/useDetailCreditContract'

interface RepresentativeSectionProps {
  data: HandlerInfo[]
}

const RepresentativeSection = ({data}: RepresentativeSectionProps) => {
  return (
    <SectionWrapper>
      <StyledTitleOfSection title="Người đại diện" />
      <StyledWarperSection style={{gap: scale(10)}}>
        {data?.length === 0 ? (
          <EmptyFileView />
        ) : (
          <>
            {data?.map((rep, index) => (
              <RepresentativeCard key={index} data={rep} />
            ))}
          </>
        )}
      </StyledWarperSection>
    </SectionWrapper>
  )
}

export default RepresentativeSection
