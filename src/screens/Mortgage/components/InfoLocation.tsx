import {StyleSheet, View} from 'react-native'
import React from 'react'
import GroupContent from '~/components/GroupContent'
import {RowContent} from '~/screens/components'
import utils from '~/utils'
import {useAppStyles} from '~/hooks'
import {scale} from '~/utils/scaleScreen'

const InfoLocation = ({data}: {data: any}) => {
  const styles = Styles()
  return (
    <GroupContent
      showGroup={false}
      title="Thông tin khu vực"
      onPressGroup={utils.onChangeLayoutAnimation}>
      <View style={styles.content_group}>
        <RowContent
          label="Cơ sở hạ tầng, đặc điểm khu vực"
          value={data?.locationCharacteristics}
        />
        <RowContent label="Hệ số sinh lợi" value={data?.profitabilityRatio} />
      </View>
    </GroupContent>
  )
}

export default InfoLocation

const Styles = () => {
  const {THEME} = useAppStyles()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {colors, sizes} = THEME
  return StyleSheet.create({
    content_group: {
      gap: scale(8),
      marginTop: scale(8),
    },
  })
}
