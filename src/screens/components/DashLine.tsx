import {StyleSheet, View} from 'react-native'
import React from 'react'
import CustomDashedLine from '~/screens/components/CustomDashedLine'
import {scale} from '~/utils/scaleScreen'

const DashLine = ({unit = 10}: {unit: number}) => {
  const styles = useLocalStyles(unit)
  return (
    <View style={styles.container}>
      <CustomDashedLine />
    </View>
  )
}

export default DashLine

const useLocalStyles = (unit: string = 10) => {
  return StyleSheet.create({
    container: {
      marginVertical: scale(unit),
    },
  })
}
