import React from 'react'
import {MortgageContract} from '~/services/apis/creditService'
import {
  EmptyFileView,
  SectionWrapper,
  StyledTitleOfSection,
  StyledWarperSection,
} from '~/screens/components'
import {scale} from '~/utils/scaleScreen'
import MortgageContractCard from './MortgageContractCard'

const MortgageContractSection = ({data}: {data: MortgageContract[]}) => {
  return (
    <SectionWrapper>
      <StyledTitleOfSection title="Danh sách HĐTC" />
      <StyledWarperSection style={{gap: scale(10)}}>
        {data?.length === 0 ? (
          <EmptyFileView />
        ) : (
          <>
            {data?.map((item, index) => (
              <MortgageContractCard key={index} data={item} />
            ))}
          </>
        )}
      </StyledWarperSection>
    </SectionWrapper>
  )
}

export default MortgageContractSection
