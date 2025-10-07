import React from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {Icons} from '~/assets'
import AppFastImage from '~/components/AppFastImage'
import AppText from '~/components/AppText'
import {useAppStyles} from '~/hooks'
import {CommentReply, CommentThread} from '~/services/apis/creditService'
import {Fontsfamily} from '~/styles/FontsFamily'
import utils from '~/utils'
import {scale} from '~/utils/scaleScreen'

interface MessageThreadProps {
  message: CommentThread
  avatar: string
  onReply: (message: CommentThread) => void
}

const MessageThread: React.FC<MessageThreadProps> = ({
  message,
  avatar = null,
  onReply = () => {},
}) => {
  const styles = useMessageThreadStyles()
  const renderMessage = (
    msg: CommentThread | CommentReply,
    isChild = false,
  ) => {
    return (
      <View
        style={[styles.messageWrapper, isChild && styles.childMessage]}
        key={`message_${msg.id}`}>
        <View style={styles.row}>
          <View style={styles.borderAvatar}>
            <AppFastImage
              source={utils.isDefined(avatar) ? avatar : Icons.icAvatar}
              style={styles.avatar}
            />
          </View>
          <View style={styles.blockMessage}>
            <View style={styles.blockSender}>
              <AppText style={styles.sender}>
                {msg?.userName || 'Người dùng không tồn tại'}
              </AppText>
              <AppText style={styles.timestamp}>
                {msg?.time || 'Thời gian không rõ'}
              </AppText>
            </View>
            <View style={styles.bubble}>
              <AppText style={styles.content}>{msg.content}</AppText>
            </View>
            {!isChild && (
              <TouchableOpacity onPress={() => onReply(msg)}>
                <AppText style={styles.reply}>Trả lời</AppText>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    )
  }

  return (
    <View>
      {renderMessage(message)}
      {message?.replies?.length > 0 &&
        message.replies.map(reply => renderMessage(reply, true))}
    </View>
  )
}

export default MessageThread

const useMessageThreadStyles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    messageWrapper: {
      marginBottom: scale(12),
    },
    childMessage: {
      marginLeft: scale(40),
    },
    row: {
      flexDirection: 'row',
      gap: scale(8),
    },
    blockSender: {
      height: scale(35),
    },
    borderAvatar: {
      width: scale(35),
      height: scale(35),
      borderWidth: scale(1),
      borderRadius: 9999,
      borderColor: colors.primary,
    },
    avatar: {
      width: scale(34),
      height: scale(34),
      borderRadius: 9999,
    },
    sender: {
      fontFamily: Fontsfamily.Nunito.Bold,
      color: colors.text.secondary,
      fontSize: scale(15),
    },
    timestamp: {
      fontSize: scale(12),
      color: colors.text.secondary,
      marginBottom: scale(4),
    },
    blockMessage: {
      flex: 1,
      gap: scale(8),
    },
    bubble: {
      backgroundColor: colors.message.background,
      borderRadius: scale(16),
      paddingVertical: scale(8),
      paddingHorizontal: scale(12),
      marginBottom: scale(4),
    },
    content: {
      color: colors.text.primary,
      fontSize: scale(14),
    },
    reply: {
      color: colors.text.secondary,
      fontSize: scale(14),
    },
  })
}
