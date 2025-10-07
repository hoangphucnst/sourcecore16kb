import React from 'react'
import {scale} from '~/utils/scaleScreen'
import {
  EmptyFileView,
  SectionWrapper,
  StyledTitleOfSection,
  StyledWarperSection,
} from '~/screens/components'
import BeneficiaryItem from './BeneficiaryItem'
import {BeneficiaryInfo} from '~/screens/Credit/hooks/useDetailCreditContract'

interface BeneficiaryInfoSectionProps {
  data: BeneficiaryInfo[]
}

const BeneficiaryInfoSection = ({data = []}: BeneficiaryInfoSectionProps) => {
  return (
    <SectionWrapper>
      <StyledTitleOfSection title="Thông tin giải ngân" />
      <StyledWarperSection style={{gap: scale(10)}}>
        {data?.length === 0 ? (
          <EmptyFileView />
        ) : (
          <>
            {data?.map((item, index) => (
              <BeneficiaryItem
                key={`${item?.beneficiaryNumber}_${index}`}
                data={item}
              />
            ))}
          </>
        )}
      </StyledWarperSection>
    </SectionWrapper>
  )
}

export default BeneficiaryInfoSection
