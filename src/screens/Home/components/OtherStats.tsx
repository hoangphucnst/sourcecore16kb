import React, {useCallback} from 'react'
import {View, StyleSheet} from 'react-native'
import AppIconVector from '~/components/AppIconVector'
import AppText from '~/components/AppText'
import {useAppStyles} from '~/hooks'
import {AppTheme} from '~/styles/Theme'
import {scale} from '~/utils/scaleScreen'
import {OtherTaskInfo} from '~/services/apis/dashboardService'
import utils from '~/utils'

// Card item definition
interface DashboardCardItem {
  icon: React.ReactNode
  count: number
  label: string
  bgColor: string
  textColor?: string
}

// Card component
const DashboardCard: React.FC<DashboardCardItem> = ({
  icon,
  count,
  label,
  bgColor,
  textColor = '#fff',
}) => {
  const {THEME} = useAppStyles()
  const styles = useCallback(styleWithTheme, [THEME])(THEME)

  return (
    <View style={[styles.card, {backgroundColor: bgColor}]}>
      <View style={styles.iconCircle}>{icon}</View>
      <AppText style={[styles.count, {color: textColor}]}>{count}</AppText>
      <AppText style={[styles.label, {color: textColor}]}>{label}</AppText>
    </View>
  )
}

// Main component
type Props = {
  data?: OtherTaskInfo | null
}

const OtherStats: React.FC<Props> = ({data}) => {
  const {THEME} = useAppStyles()
  const styles = useCallback(styleWithTheme, [THEME])(THEME)

  const fallback: OtherTaskInfo = {
    total: 0,
    list: [],
  }

  const safeData = data ?? fallback

  const iconSet = [
    {
      icon: (
        <AppIconVector.MaterialIcon name="bar-chart" size={24} color="#fff" />
      ),
      bgColor: '#265D80',
      textColor: '#fff',
    },
    {
      icon: (
        <AppIconVector.MaterialIcon
          name="insert-drive-file"
          size={24}
          color="#fff"
        />
      ),
      bgColor: '#D2EEFF',
      textColor: '#0F172A',
    },
    {
      icon: (
        <AppIconVector.MaterialIcon name="bar-chart" size={24} color="#fff" />
      ),
      bgColor: '#FFEDD5',
      textColor: '#D17312',
    },
    {
      icon: (
        <AppIconVector.MaterialIcon
          name="insert-drive-file"
          size={24}
          color="#fff"
        />
      ),
      bgColor: '#ECFDF5',
      textColor: '#047857',
    },
  ]

  const renderedCards = safeData.list.slice(0, 4).map((item, index) => ({
    icon: iconSet[index]?.icon ?? iconSet[0].icon,
    count: utils.safeValue(
      utils.isDefined(item?.description)
        ? utils.convertAmount(utils.parseNumber(item?.description))
        : null,
    ),
    label: item.name,
    bgColor: iconSet[index]?.bgColor ?? '#ccc',
    textColor: iconSet[index]?.textColor,
  }))

  const line1 = renderedCards.slice(0, 2)
  const line2 = renderedCards.slice(2, 4)

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Thông số về tài chính</AppText>
      <AppText style={styles.subtitle}>Tổng chỉ tiêu: {safeData.total}</AppText>
      <View style={styles.baseCard}>
        <View style={[styles.cardContainer]}>
          {line1.length > 0 &&
            [0, 1].map(index => {
              const item = line1[index]
              if (item) {
                return <DashboardCard key={index} {...item} />
              } else {
                return <View key={index} style={styles.card} />
              }
            })}
        </View>
        <View style={[styles.cardContainer]}>
          {line2.length > 0 &&
            [0, 1].map(index => {
              const item = line2[index]
              if (item) {
                return <DashboardCard key={index} {...item} />
              } else {
                return <View key={index} style={styles.card} />
              }
            })}
        </View>
      </View>
    </View>
  )
}

export default OtherStats

// Style
const styleWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: THEME.colors.white,
      borderWidth: 0.5,
      borderRadius: 8,
      marginTop: 10,
      borderColor: '#d1d1d1',
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
      color: '#0F172A',
    },
    subtitle: {
      fontSize: 14,
      color: '#64748B',
      marginTop: 4,
      marginBottom: 16,
    },
    cardContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 16,
    },
    card: {
      flex: 1,
      borderRadius: 16,
      padding: 16,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      borderWidth: 0.5,
      borderColor: '#E8E8E8',

      // iOS
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,

      // Android
      elevation: 3,
    },
    iconCircle: {
      backgroundColor: '#FA5A7D',
      borderRadius: 20,
      padding: 8,
      marginBottom: 12,
    },
    count: {
      fontSize: 20,
      fontWeight: '600',
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      marginTop: 4,
    },
    baseCard: {
      gap: scale(14),
    },
  })
