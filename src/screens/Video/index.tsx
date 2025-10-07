import {FlatList, StyleSheet, Text, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {VideoProps} from '../AppRoot'
import {useAppStyles} from '~/hooks'
import {TouchableOpacity} from 'react-native'
import utils from '~/utils'

const FILE_NAME = 'VideoScreen'
const VideoScreen = (props: VideoProps) => {
  const {userId, hostId, totalPage} = utils.ngetParams(
    props,
    ['userId', 'hostId', 'totalPage'],
    {
      userId: '',
      hostId: '',
      totalPage: 0,
    },
  )
  const {THEME} = useAppStyles()
  // const [tarotCards, setTarotCards] = useState<Card[]>([])

  const gettingData = async () => {}

  useEffect(() => {
    gettingData()
  }, [])

  return (
    <View style={{flex: 1, backgroundColor: THEME.colors.white}}>
      <View style={{paddingVertical: 5}}>
        <TouchableOpacity
          onPress={() => {
            gettingData()
          }}>
          <View style={{padding: 20, backgroundColor: THEME.colors.primary}}>
            <Text>Call API</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={[]}
          keyExtractor={(item, index) => `Tarot${index}`}
          numColumns={2}
          renderItem={({item, index}) => (
            <View
              style={{
                borderWidth: 1,
                borderRadius: THEME.radius.xl,
                borderColor: THEME.colors.border,
                margin: 5,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}>
              <Text style={{color: THEME.colors.primary}}>{item?.name}</Text>
            </View>
          )}
        />
      </View>
    </View>
  )
}

export default VideoScreen

const styles = StyleSheet.create({})
