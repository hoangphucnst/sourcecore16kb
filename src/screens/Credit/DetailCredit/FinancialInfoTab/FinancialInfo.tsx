import {ActivityIndicator, StyleSheet, View} from 'react-native'
import React from 'react'
import AppScrollViewBody from '~/components/AppScrollViewBody'
import {useAppStyles} from '~/hooks'
import AppText from '~/components/AppText'
import {scale} from '~/utils/scaleScreen'
import {Fontsfamily} from '~/styles/FontsFamily'
import {
  DashLine,
  EmptyFileView,
  SectionWrapper,
  StyledTabWarper,
  StyledTitleOfSection,
  StyledWarperSection,
} from '~/screens/components'
import {
  BusinessRiskSection,
  CICCreditSection,
  EnvironmentalImpactSection,
  FinancingPlanSection,
  InfoBlockList,
  InternalLoanSection,
  ListWithTitleSection,
  LoanCapitalSection,
  ProjectCostSection,
  ProjectRevenueSection,
  RelatedLoanSection,
} from './components'
import utils from '~/utils'

const FinancialInfo = ({
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
  const styles = useScreenStyles()

  const {detailCreditContract, isLoading} = detailCreditContractHook
  const data = detailCreditContract?.finacialInfo || null

  if (isLoading.finacialInfo) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  return (
    <AppScrollViewBody showsVerticalScrollIndicator={false}>
      <StyledTabWarper>
        {/* 1. Các yếu tố liên quan đến khoản vay */}
        <SectionWrapper>
          <StyledTitleOfSection title="Các yếu tố liên quan đến khoản vay" />
          <InfoBlockList data={data?.financialFactors || []} />
        </SectionWrapper>

        {/* 2. Thông tin tín dụng khách hàng */}
        <SectionWrapper>
          <StyledTitleOfSection title="Thông tin tín dụng khách hàng" />
          <StyledWarperSection>
            <CICCreditSection data={data?.creditInfos || []} />
            <InternalLoanSection data={data?.relatedDebtInfos || []} />
            <RelatedLoanSection data={data?.relatedGroupDebtInfos || []} />
          </StyledWarperSection>
        </SectionWrapper>

        {/* 3. Tài sản tích lũy - Khoản vay hiện tại */}
        <SectionWrapper>
          <StyledTitleOfSection title="Tài sản tích lũy - Khoản vay hiện tại" />
          <StyledWarperSection>
            <ListWithTitleSection
              title="Thông tin CIC tài sản tích lũy"
              data={data?.assetAndLoanInfo?.assets}
            />
            <DashLine />
            <ListWithTitleSection
              title="Khoản vay hiện tại"
              data={data?.assetAndLoanInfo?.loans}
            />
            <DashLine />
            <ListWithTitleSection
              title="Nguồn thu nhập"
              data={data?.assetAndLoanInfo?.incomes}
            />
            <DashLine />
            <ListWithTitleSection
              title="Các khoản chi phí"
              data={data?.assetAndLoanInfo?.expenses}
            />
          </StyledWarperSection>
        </SectionWrapper>

        {/* 4. Nhận xét tài chính khách hàng */}
        <SectionWrapper>
          <StyledTitleOfSection title="Nhận xét tình hình tài chính khách hàng" />
          <StyledWarperSection>
            <View style={styles.itemWrapper}>
              {data?.financialAssessment ? (
                <AppText
                  style={[styles.commentText, {color: colors.text.primary}]}>
                  {`${utils.safeValue(data?.financialAssessment)}`}
                </AppText>
              ) : (
                <EmptyFileView />
              )}
            </View>
          </StyledWarperSection>
        </SectionWrapper>

        {/* 5. Phương án vay vốn */}
        <SectionWrapper>
          <StyledTitleOfSection title="Phương án vay vốn kinh doanh của khách hàng" />
          <StyledWarperSection>
            <FinancingPlanSection data={data?.loanPlan} />
          </StyledWarperSection>
        </SectionWrapper>

        {/* 6. Chi phí gián tiếp */}
        <SectionWrapper>
          <StyledTitleOfSection title="Chi phí trực tiếp của mục đích vay vốn" />
          <StyledWarperSection>
            <LoanCapitalSection data={data?.indirectCosts || []} />
          </StyledWarperSection>
        </SectionWrapper>

        <SectionWrapper>
          <StyledTitleOfSection title="Chi phí trực tiếp của dự án" />
          <StyledWarperSection>
            <ProjectCostSection data={data?.directCosts || []} />
          </StyledWarperSection>
        </SectionWrapper>

        {/* 7. Doanh thu dự án */}
        <SectionWrapper>
          <StyledTitleOfSection title="Doanh thu trong 1 chu kỳ dự án" />
          <ProjectRevenueSection data={data?.projectRevenues || []} />
        </SectionWrapper>

        {/* 8. Rủi ro & Phòng ngừa */}
        <SectionWrapper>
          {/* <StyledTitleOfSection title="Rủi ro hoạt động kinh doanh và phương án phòng ngừa" /> */}
          <StyledTitleOfSection title="Rủi ro hoạt động kinh doanh và phương án phòng ngừa rủi ro" />
          <BusinessRiskSection data={data?.businessRisks || []} />
        </SectionWrapper>

        {/* 9. Tác động môi trường */}
        <SectionWrapper>
          <StyledTitleOfSection title="Tác động đến môi trường và phương án xử lý" />
          <EnvironmentalImpactSection data={data?.environmentalImpacts} />
        </SectionWrapper>

        {/* 10. Nhận xét SXKD */}
        {/* <SectionWrapper>
          <StyledTitleOfSection title="Nhận xét phương án sản xuất kinh doanh khách hàng" />
          <StyledWarperSection>
            {data?.businessComment ? (
              <AppText
                style={[styles.commentText, {color: colors.text.primary}]}>
                {utils.safeValue(data?.businessComment)}
              </AppText>
            ) : (
              <EmptyFileView />
            )}
          </StyledWarperSection>
        </SectionWrapper> */}
      </StyledTabWarper>
    </AppScrollViewBody>
  )
}

export default FinancialInfo

const useScreenStyles = () => {
  return StyleSheet.create({
    loading: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: scale(30),
    },
    container: {
      paddingBottom: scale(150),
    },
    label: {
      fontSize: scale(14),
    },
    commentText: {
      fontSize: scale(14),
      fontFamily: Fontsfamily.OpenSans.MediumItalic,
    },
  })
}
