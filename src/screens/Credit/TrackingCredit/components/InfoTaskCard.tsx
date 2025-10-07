import {StyleSheet, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {useAppStyles} from '~/hooks'
import {scale} from '~/utils/scaleScreen'
import AppText from '~/components/AppText'
import {Fontsfamily} from '~/styles/FontsFamily'
import utils from '~/utils'
import {CreditLogUser} from '~/services/apis/creditService'

interface InfoTaskCardProps {
  data: CreditLogUser | null
  onPress: (item: CreditLogUser) => void
  mode: 'credit' | 'task'
}

const InfoTaskCard: React.FC<InfoTaskCardProps> = ({
  data = null,
  onPress = () => {},
  mode = 'task',
}) => {
  const styles = Styles()
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>
        {mode === 'task'
          ? `${utils.safeValue(data?.userName)} - ${utils.safeValue(data?.roleName)} - ${utils.safeValue(data?.departmentName)}`
          : `${utils.safeValue(data?.fullName)}`}
      </AppText>
      <TouchableOpacity
        onPress={() => {
          onPress(data)
        }}>
        <AppText style={styles.text_button}>
          {utils.safeValue(data?.logFunction)}
        </AppText>
      </TouchableOpacity>
      <AppText style={styles.text_date}>
        {utils.safeValue(data?.createTime)}
      </AppText>
    </View>
  )
}

export default InfoTaskCard

const Styles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      padding: scale(10),
      gap: scale(5),
      borderLeftWidth: scale(1.5),
      borderColor: colors.primary,
      borderTopRightRadius: scale(12),
      borderBottomRightRadius: scale(5),
      marginTop: scale(8),
      marginHorizontal: scale(8),
    },
    title: {
      fontFamily: Fontsfamily.Nunito.Bold,
      color: colors.text.primary,
    },
    text_button: {
      fontFamily: Fontsfamily.Nunito.Medium,
      color: colors.primary,
      fontSize: scale(12),
    },
    text_date: {
      color: colors.text.secondary,
      fontSize: scale(12),
    },
  })
}
