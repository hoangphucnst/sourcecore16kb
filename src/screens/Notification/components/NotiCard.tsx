import {StyleSheet, TouchableOpacity, View} from 'react-native'
import React from 'react'
import AppImage from '~/components/AppImage'
import AppText from '~/components/AppText'
import {useAppStyles} from '~/hooks'
import {scale, scaleFont} from '~/utils/scaleScreen'
import {Fontsfamily} from '~/styles/FontsFamily'
import {Icons} from '~/assets'
import {Notification} from '~/services/apis/notificationService'
import utils from '~/utils'
import {AppTheme} from '~/styles/Theme'

const NotiCard = ({
  notiItem,
  onPress,
}: {
  notiItem: Notification
  onPress: (item) => void
}) => {
  const {THEME} = useAppStyles()
  const styles = NotiCardStyles(THEME)
  const isRead = notiItem?.isRead === 1

  return (
    <View
      style={
        isRead ? styles.container_noti_item : styles.container_noti_item_unread
      }>
      <TouchableOpacity
        onPress={() => {
          onPress(notiItem)
        }}>
        <View style={styles.container_noti}>
          <View
            style={[
              styles.container_icon,
              isRead
                ? {
                    backgroundColor: THEME.colors.table.background,
                  }
                : {backgroundColor: THEME.colors.hashtag},
            ]}>
            <AppImage
              source={isRead ? Icons.icOpenedMail : Icons.icClosedMail}
              style={[styles.iconSize, {tintColor: THEME.colors.primary}]}
            />
          </View>
          <View style={styles.container_text}>
            <AppText
              numberOfLines={2}
              style={isRead ? styles.primary_text : styles.primary_text_unread}>
              {utils.safeValue(notiItem?.content)}
            </AppText>
            <AppText
              style={
                isRead ? styles.secondary_text : styles.secondary_text_unread
              }>
              {utils.safeValue(notiItem?.timeStamp)}
            </AppText>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default NotiCard

const NotiCardStyles = (theme: AppTheme) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {colors, fonts, sizes} = theme
  return StyleSheet.create({
    iconSize: {
      width: scale(24),
      height: scale(24),
    },
    container_noti_item: {
      backgroundColor: colors.white,
      paddingVertical: scale(16),
      paddingHorizontal: scale(10),
    },
    container_noti_item_unread: {
      backgroundColor: colors.table.background,
      paddingVertical: scale(16),
      paddingHorizontal: scale(10),
    },
    container_noti: {
      flexDirection: 'row',
      gap: scale(8),
      alignItems: 'center',
    },
    container_icon: {
      width: scale(46),
      height: scale(46),
      borderRadius: scale(60),
      alignItems: 'center',
      justifyContent: 'center',
    },
    container_text: {
      flex: 1,
      gap: scale(8),
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    primary_text: {
      fontSize: scaleFont(14),
      fontFamily: Fontsfamily.Nunito.SemiBold,
      color: colors.text.primary,
    },
    primary_text_unread: {
      fontSize: scaleFont(14),
      fontFamily: Fontsfamily.Nunito.Bold,
      color: colors.text.primary,
    },
    secondary_text: {
      fontSize: scaleFont(14),
      fontFamily: Fontsfamily.Nunito.Regular,
      color: colors.text.secondary,
      textAlign: 'right',
    },
    secondary_text_unread: {
      fontSize: scaleFont(14),
      fontFamily: Fontsfamily.Nunito.SemiBold,
      color: colors.text.secondary,
      textAlign: 'right',
    },
  })
}
