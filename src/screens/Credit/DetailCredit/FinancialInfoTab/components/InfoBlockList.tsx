import {StyleSheet, View} from 'react-native'
import React from 'react'
import AppText from '~/components/AppText'
import {scale} from '~/utils/scaleScreen'
import {useAppStyles} from '~/hooks'
import {Fontsfamily} from '~/styles/FontsFamily'
import {StyledWarperSection} from '~/screens/components'
import utils from '~/utils'
import {Field} from '~/services/apis/creditService'

const InfoBlockList = ({data = []}: {data: Field[]}) => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  const styles = useInfoBlockStyles()

  let finalList: Field[] = []

  try {
    if (Array.isArray(data)) {
      finalList = data
    } else if (typeof data === 'string') {
      finalList = JSON.parse(data)
    } else {
      finalList = []
    }
  } catch (error) {
    utils.log('InfoBlockList -> Lỗi parse JSON:', error)
    finalList = []
  }

  if (!Array.isArray(finalList)) {
    return (
      <StyledWarperSection style={styles.container}>
        <View>
          <AppText>Lỗi định dạng dữ liệu</AppText>
        </View>
      </StyledWarperSection>
    )
  }

  return (
    <StyledWarperSection style={styles.container}>
      {finalList.length === 0 ? (
        <View>
          <AppText>Chưa có điều khoản nào được thiết lập</AppText>
        </View>
      ) : (
        <>
          {finalList?.map((field, index) => (
            <View style={styles.itemWrapper} key={`Field_${index}`}>
              <AppText style={[styles.label, {color: colors.primary}]}>
                {`${index + 1}. ${utils.safeValue(field?.label)}`}
              </AppText>
              <AppText style={[styles.value, {color: colors.text.primary}]}>
                {utils.safeValue(field?.value)}
              </AppText>
            </View>
          ))}
        </>
      )}
    </StyledWarperSection>
  )
}

export default InfoBlockList

const useInfoBlockStyles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    container: {
      gap: scale(8),
      backgroundColor: colors.white,
      borderRadius: scale(8),
    },
    itemWrapper: {
      gap: scale(4),
    },
    label: {
      fontSize: scale(15),
      fontFamily: Fontsfamily.Nunito.Medium,
    },
    value: {
      fontSize: scale(14),
    },
  })
}
