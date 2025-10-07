import React = require('react')
import {View} from 'react-native'
import AppText from '~/components/AppText'
import {useAppStyles} from '~/hooks'
import {StyleSheet} from 'react-native'
import {scale} from '~/utils/scaleScreen'
import {Fontsfamily} from '~/styles/FontsFamily'
import {EmptyFileView} from '~/screens/components'
import utils from '~/utils'

interface GenericListSectionProps<T> {
  title: string
  data: T[]
  showTitle?: boolean
  renderItem: (item: T, index: number) => React.ReactNode
}
const GenericListSection = <T,>({
  title,
  data,
  showTitle = true,
  renderItem,
}: GenericListSectionProps<T>) => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  const styles = useGenericListSectionStyles(colors)

  let finalData: any[] = []

  try {
    if (Array.isArray(data)) {
      finalData = data
    } else if (typeof data === 'string') {
      finalData = JSON.parse(data)
    } else {
      finalData = []
    }
  } catch (error) {
    utils.log('GenericListSection -> Lỗi parse JSON:', error)
    finalData = []
  }

  if (!Array.isArray(finalData)) {
    return (
      <View style={styles.wrapper}>
        <AppText style={styles.subTitle}>{title}</AppText>
        <View style={styles.listWrapper}>
          <AppText>Lỗi định dạng thuộc tính</AppText>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.wrapper}>
      {showTitle && <AppText style={styles.subTitle}>{title}</AppText>}
      <View style={styles.listWrapper}>
        {finalData?.length === 0 ? (
          <EmptyFileView />
        ) : (
          <>{finalData?.map((item, index) => renderItem(item, index))}</>
        )}
      </View>
    </View>
  )
}

export default GenericListSection

const useGenericListSectionStyles = (colors: any) => {
  return StyleSheet.create({
    wrapper: {
      gap: scale(12),
      marginTop: scale(8),
    },
    subTitle: {
      fontFamily: Fontsfamily.OpenSans.Bold,
      fontSize: scale(14),
      color: colors.primary,
    },
    listWrapper: {
      gap: scale(12),
      paddingLeft: scale(8),
    },
  })
}
