import {StyleSheet, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import AppText from '~/components/AppText'
import {useAppStyles} from '~/hooks'
import {scale} from '~/utils/scaleScreen'
import {Fontsfamily} from '~/styles/FontsFamily'
import AppScrollViewBody from '~/components/AppScrollViewBody'

const HorizontalTabMenu = ({
  onChangeTab = () => {},
}: {
  onChangeTab: (index) => void
}) => {
  const data = ['Thông tin chung', 'Thông tin tài chính', 'Ý kiến xử lý']
  const styles = useHorizontalTabMenuStyles()
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <View style={styles.container}>
      <AppScrollViewBody horizontal showsHorizontalScrollIndicator={false}>
        {data.map((text, index) => {
          const isFocus = selectedIndex === index
          return (
            <TouchableOpacity
              key={`HorizontalTabMenu_${index}`}
              onPress={() => {
                setSelectedIndex(index)
                onChangeTab(index)
              }}>
              <View style={isFocus ? styles.tab_focus : styles.tab}>
                <AppText style={isFocus ? styles.text_focus : styles.text}>
                  {text}
                </AppText>
              </View>
            </TouchableOpacity>
          )
        })}
      </AppScrollViewBody>
    </View>
  )
}

export default HorizontalTabMenu

const useHorizontalTabMenuStyles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      paddingHorizontal: scale(10),
      borderBottomWidth: scale(2),
      borderColor: colors.background,
    },
    tab: {
      paddingVertical: scale(14),
      paddingHorizontal: scale(12),
    },
    tab_focus: {
      paddingVertical: scale(14),
      paddingHorizontal: scale(12),
      borderBottomWidth: scale(2),
      borderColor: colors.primary,
    },
    text: {
      fontFamily: Fontsfamily.OpenSans.Regular,
      color: colors.text.secondary,
    },
    text_focus: {
      fontFamily: Fontsfamily.OpenSans.SemiBold,
      color: colors.primary,
    },
  })
}
