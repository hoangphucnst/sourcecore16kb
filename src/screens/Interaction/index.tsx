import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {InteractionProps} from '../AppRoot'
import AppHeader from '~/components/AppHeader'
import {useAppStyles} from '~/hooks'

const InteractionScreen = (props: InteractionProps) => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return (
    <View style={{flex: 1, backgroundColor: colors.primary}}>
      {/* <AppHeader /> */}
      <Text>InteractionScreen</Text>
    </View>
  )
}

export default InteractionScreen

const styles = StyleSheet.create({})
