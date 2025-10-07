import {StyleSheet, View} from 'react-native'
import React from 'react'
import AppText from '~/components/AppText'
import {useAppStyles} from '~/hooks'
import {Fontsfamily} from '~/styles/FontsFamily'
import {scale} from '~/utils/scaleScreen'
import {STATUS_TASK_COLORS} from '~/constants'
import utils from '~/utils'

const TaskStatus = ({text = ''}: {text: string}) => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  const bgColor = STATUS_TASK_COLORS[text] || colors.primary
  const lightBgColor = utils.createLightColor(bgColor)
  const styles = TaskStatusStyles(lightBgColor)
  return (
    <View style={[{backgroundColor: bgColor}, styles.container]}>
      {/* <View style={styles.symbol} /> */}
      <AppText style={styles.text}>{text}</AppText>
    </View>
  )
}

export default TaskStatus

const TaskStatusStyles = (lightBgColor: string) => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    container: {
      width: scale(120),
      height: scale(26),
      borderRadius: 9999,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      // gap: scale(8),
      // paddingLeft: scale(6),
    },
    text: {
      color: colors.white,
      fontFamily: Fontsfamily.Nunito.Medium,
      fontSize: scale(14),
    },
    symbol: {
      width: scale(14),
      height: scale(14),
      borderWidth: scale(3),
      borderRadius: 9999,
      borderColor: lightBgColor,
    },
  })
}
