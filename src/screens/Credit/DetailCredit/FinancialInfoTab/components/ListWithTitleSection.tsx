import {StyleSheet, View} from 'react-native'
import React from 'react'
import AppText from '~/components/AppText'
import StyledContainer from '~/screens/Credit/components/StyledContainer'
import {useAppStyles} from '~/hooks'
import {scale} from '~/utils/scaleScreen'
import {Fontsfamily} from '~/styles/FontsFamily'
import KeyValueRow from './KeyValueRow'
import {Icons} from '~/assets'
import {EmptyFileView} from '~/screens/components'
import utils from '~/utils'

interface Item {
  id: string
  name: string
  value: string
}

interface ListWithTitleSectionProps {
  title: string
  data: Item[]
}

const ListWithTitleSection: React.FC<ListWithTitleSectionProps> = ({
  title,
  data,
}) => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  const styles = useListWithTitleSectionStyles(colors)

  let finalData: Item[] = []

  try {
    if (Array.isArray(data)) {
      finalData = data
    } else if (typeof data === 'string') {
      finalData = JSON.parse(data)
    } else {
      finalData = []
    }
  } catch (error) {
    utils.log('ListWithTitleSection -> Lỗi parse JSON:', error)
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
      <AppText style={styles.subTitle}>{title}</AppText>
      <View style={styles.listWrapper}>
        {finalData.length === 0 ? (
          <View>
            <EmptyFileView />
          </View>
        ) : (
          <>
            {finalData.map(item => (
              <StyledContainer
                key={item.id}
                showLine={false}
                icon={{
                  source: Icons.icLand,
                }}
                container={{
                  style: {backgroundColor: colors.icon.background_dark},
                }}>
                <View style={styles.infoBlock}>
                  <AppText style={styles.label}>
                    {utils.safeValue(item?.name)}
                  </AppText>
                  <KeyValueRow
                    title="Giá trị"
                    value={
                      utils.isDefined(item?.value)
                        ? `${utils.formatMoney(item?.value)}`
                        : '---'
                    }
                  />
                </View>
              </StyledContainer>
            ))}
          </>
        )}
      </View>
    </View>
  )
}

export default ListWithTitleSection

const useListWithTitleSectionStyles = (colors: any) => {
  return StyleSheet.create({
    wrapper: {
      gap: scale(12),
    },
    subTitle: {
      fontFamily: Fontsfamily.Nunito.Bold,
      fontSize: scale(16),
      color: colors.primary,
    },
    listWrapper: {
      gap: scale(12),
      paddingLeft: scale(8),
    },
    label: {
      color: colors.text.primary,
      fontFamily: Fontsfamily.Nunito.Bold,
    },
    infoBlock: {
      gap: scale(4),
    },
  })
}
