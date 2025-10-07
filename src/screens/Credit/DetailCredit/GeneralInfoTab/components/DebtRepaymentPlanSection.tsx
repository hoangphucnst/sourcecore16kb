import {StyleSheet, View} from 'react-native'
import React from 'react'
import {
  DashLine,
  EmptyFileView,
  SectionWrapper,
  StyledTitleOfSection,
  StyledWarperSection,
} from '~/screens/components'
import {scale, scaleFont} from '~/utils/scaleScreen'
import utils from '~/utils'
import AppText from '~/components/AppText'
import {useAppStyles} from '~/hooks'
import {Fontsfamily} from '~/styles/FontsFamily'
import RepayPlanItem from './RepayPlanItem'
import AppImage from '~/components/AppImage'
import {Icons} from '~/assets'
import {RepayPlan} from '~/services/apis/creditService'

const DebtRepaymentPlanSection = ({data}: {data: RepayPlan}) => {
  const styles = Styles()

  if (!utils.isDefined(data)) {
    return (
      <SectionWrapper>
        <StyledTitleOfSection title="Phương án trả nợ" />
        <StyledWarperSection style={{gap: scale(10)}}>
          <EmptyFileView />
        </StyledWarperSection>
      </SectionWrapper>
    )
  }

  return (
    <SectionWrapper>
      <StyledTitleOfSection title="Phương án trả nợ" />
      <StyledWarperSection style={{gap: scale(10)}}>
        <RowContent
          key={'Phuong_an_tra_lai'}
          label="Phương án trả lãi"
          value={utils.safeValue(data?.interestPlan)}
        />
        <RowContent
          key={'tinh_tu_ngay'}
          label="Tính từ ngày"
          value={utils.safeValue(data?.interestDate)}
        />

        <DashLine unit={0} />

        <RowContent
          key={'phuong_an_tra_goc'}
          label="Phương án trả gốc"
          value={utils.safeValue(data?.principalPlan)}
        />
        <RowContent
          key={'tinh_tu_ngay_tra_no_goc'}
          label="Tính từ ngày"
          value={utils.safeValue(data?.principalDate)}
        />

        <DashLine unit={0} />

        <View style={styles.titleRow}>
          <AppImage style={styles.icon} source={Icons.icProjectPlan} />
          <AppText style={styles.smolTitleTxt}>Kế hoạch cụ thể</AppText>
        </View>
        {data?.listItem?.length === 0 || !utils.isDefined(data?.listItem) ? (
          <EmptyFileView />
        ) : (
          <>
            {data?.listItem?.map((item, index) => (
              <RepayPlanItem
                key={`RepayPlan_${index}`}
                data={item}
                index={index + 1}
              />
            ))}
          </>
        )}
      </StyledWarperSection>
    </SectionWrapper>
  )
}

export default DebtRepaymentPlanSection

const Styles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    titleRow: {
      backgroundColor: colors.primary,
      paddingVertical: scale(6),
      paddingHorizontal: scale(10),
      borderRadius: scale(99),
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(6),
      marginTop: scale(8),
    },
    smolTitleTxt: {
      color: colors.white,
      fontFamily: Fontsfamily.Nunito.Bold,
    },
    icon: {
      width: scale(24),
      height: scale(24),
      tintColor: colors.white,
    },
  })
}

const RowContent = ({label, value}: {label: string; value: string}) => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  const styles = useStyles(colors)

  return (
    <View style={styles.row}>
      <AppText style={styles.label}>{label}</AppText>
      <View style={styles.spaceText} />
      <AppText style={styles.value}>{value}</AppText>
    </View>
  )
}

const useStyles = (colors: any) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingVertical: scale(6),
    },
    label: {
      fontSize: scaleFont(14),
      fontFamily: Fontsfamily.Nunito.Medium,
      color: colors.text.secondary,
      flex: 0.45,
    },
    value: {
      fontSize: scaleFont(14),
      fontFamily: Fontsfamily.Nunito.SemiBold,
      color: colors.text.primary,
      flex: 0.45,
      textAlign: 'right',
    },
    spaceText: {
      flex: 0.2,
    },
  })
