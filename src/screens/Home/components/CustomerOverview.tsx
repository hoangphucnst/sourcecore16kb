import React, {useCallback} from 'react'
import {View, StyleSheet} from 'react-native'
import AppIconVector from '~/components/AppIconVector'
import AppText from '~/components/AppText'
import {useAppStyles} from '~/hooks'
import {AppTheme} from '~/styles/Theme'

// Định nghĩa type cho từng item
interface ContractItem {
  icon: React.ReactNode
  count: number
  label: string
  bgColor: string
  textColor?: string
}

// Component thẻ
const DashboardCard: React.FC<ContractItem> = ({
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

interface ContractOverviewProps {
  totalCustomer: number
  bannedCustomer: number
}

// Component chính
const CustomerOverview: React.FC<ContractOverviewProps> = ({
  totalCustomer = 0,
  bannedCustomer = 0,
}) => {
  const {THEME} = useAppStyles()
  const styles = useCallback(styleWithTheme, [THEME])(THEME)

  const contractData: ContractItem[] = [
    {
      icon: (
        <AppIconVector.MaterialIcon name="bar-chart" size={24} color="#fff" />
      ),
      count: totalCustomer,
      label: 'Số lượng khách hàng',
      bgColor: '#265D80',
    },
    {
      icon: (
        <AppIconVector.MaterialIcon
          name="insert-drive-file"
          size={24}
          color="#fff"
        />
      ),
      count: bannedCustomer,
      label: 'Khách hàng bị hạn chế',
      bgColor: '#D2EEFF',
      textColor: '#0F172A',
    },
  ]

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Khách hàng</AppText>
      <AppText style={styles.subtitle}>
        Số lượng khách hàng - Khách hàng bị hạn chế
      </AppText>
      <View style={styles.cardContainer}>
        {contractData.map((item, index) => (
          <DashboardCard key={index} {...item} />
        ))}
      </View>
    </View>
  )
}

export default CustomerOverview

// StyleSheet
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
  })
