import React from 'react'
import {scale} from '~/utils/scaleScreen'
import ProcessorCard from './ProcessorCard'
import {
  EmptyFileView,
  SectionWrapper,
  StyledTitleOfSection,
  StyledWarperSection,
} from '~/screens/components'
import {HandlerInfo} from '~/screens/Credit/hooks/useDetailCreditContract'

const ProcessorSection = ({data}: {data: HandlerInfo[]}) => {
  return (
    <SectionWrapper>
      <StyledTitleOfSection title="Người xử lý" />
      <StyledWarperSection style={{gap: scale(10)}}>
        {data?.length === 0 ? (
          <EmptyFileView />
        ) : (
          <>
            {data?.map((item, index) => (
              <ProcessorCard key={index} data={item} />
            ))}
          </>
        )}
      </StyledWarperSection>
    </SectionWrapper>
  )
}

export default ProcessorSection
