import {StyleSheet, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {useAppStyles} from '~/hooks'
import {scale} from '~/utils/scaleScreen'
import AppText from '~/components/AppText'
import {Fontsfamily} from '~/styles/FontsFamily'
import utils from '~/utils'

interface TrackingTask {
  name: string
  position: string
  department: string
  createdDate: string
  nextTask: string
}

interface InfoTaskCardProps {
  data: TrackingTask | null
  onPress: (item: TrackingTask) => void
}

const InfoTaskCard: React.FC<InfoTaskCardProps> = ({
  data = null,
  onPress = () => {},
}) => {
  const styles = Styles()
  return (
    <View style={styles.base}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <AppText
            style={
              styles.title
            }>{`${utils.safeValue(data?.userName)} - ${utils.safeValue(data?.roleName)} - ${utils.safeValue(data?.department)}`}</AppText>
          <View>
            <AppText style={styles.text_button}>
              {utils.safeValue(data?.logInfo)}
            </AppText>
          </View>
          <AppText style={styles.text_date}>
            {utils.safeValue(data?.createTime)}
          </AppText>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default InfoTaskCard

const Styles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    base: {
      backgroundColor: colors.white,
      borderLeftWidth: scale(1.5),
      borderColor: colors.primary,
      borderTopRightRadius: scale(12),
      borderBottomRightRadius: scale(5),
    },
    container: {
      padding: scale(10),
      gap: scale(5),
    },
    title: {
      fontFamily: Fontsfamily.Nunito.Bold,
      color: colors.text.primary,
    },
    text_button: {
      color: colors.primary,
      fontSize: scale(12),
    },
    text_date: {
      color: colors.text.secondary,
      fontSize: scale(12),
    },
  })
}
