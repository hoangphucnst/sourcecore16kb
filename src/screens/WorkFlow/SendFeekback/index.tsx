import {Keyboard, StyleSheet, TextInput, View} from 'react-native'
import React, {useRef, useState} from 'react'
import HeaderWithBack from '~/screens/components/HeaderWithBack'
import {useAppStyles} from '~/hooks'
import ReplyBlock, {
  ReplyBlockRef,
} from '~/screens/Credit/DetailCredit/ProcessFeedbackTab/components/ReplyBlock'
import MessageThread from '~/screens/Credit/DetailCredit/ProcessFeedbackTab/components/MessageThread'
import DashLine from '~/screens/components/DashLine'
import AppScrollViewBody from '~/components/AppScrollViewBody'
import utils from '~/utils'
import {scale} from '~/utils/scaleScreen'
import useFeedbackTask from '../hooks/useFeedbackTask'
import AppText from '~/components/AppText'

const SendFeedbackScreen = props => {
  const taskEncodeId: string = utils.ngetParam(props, 'taskEncodeId', null)
  const styles = Styles()
  const [text, setText] = useState('')
  const replyBlockRef = useRef<ReplyBlockRef>(null)
  const inputRef = useRef<TextInput>(null)

  const {feedbackTask, sendFeedbackTask, refreshFeedbackTask} = useFeedbackTask(
    {
      objectId: taskEncodeId,
    },
  )

  const handleSendProcess = () => {
    const replyTarget = replyBlockRef.current?.getReplyTo()
    Keyboard.dismiss()
    // return
    sendFeedbackTask({
      taskEncodeId: taskEncodeId,
      comment: text,
      parentId: replyTarget?.id,
    }).then((isSuccess: boolean) => {
      if (isSuccess) {
        replyBlockRef.current?.clearMessage()
        refreshFeedbackTask()
      }
    })
  }

  const isEmptyMessages = feedbackTask.length === 0
  return (
    <View style={styles.container}>
      <HeaderWithBack title="Ý kiến xử lý" />
      <AppScrollViewBody
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.container_scroll}>
          <View
            style={
              isEmptyMessages
                ? styles.empty_container_messages
                : styles.container_messages
            }>
            {isEmptyMessages ? (
              <View style={styles.emptyMessages}>
                <AppText style={styles.emptyText}>
                  Chưa có ý kiến nào được đưa ra
                </AppText>
              </View>
            ) : (
              <>
                {feedbackTask.map((msg, index) => (
                  <View key={msg.id}>
                    <MessageThread
                      message={msg}
                      onReply={message => {
                        replyBlockRef.current?.setReplyTo(message)
                        setTimeout(() => {
                          inputRef.current?.focus()
                        }, 100)
                      }}
                    />
                    {index !== feedbackTask.length - 1 && <DashLine />}
                  </View>
                ))}
              </>
            )}
          </View>
        </View>
      </AppScrollViewBody>
      <ReplyBlock
        ref={replyBlockRef}
        inputRef={inputRef}
        value={text}
        onChangeText={setText}
        onSend={() => {
          handleSendProcess()
        }}
      />
    </View>
  )
}

export default SendFeedbackScreen

const Styles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container_scroll: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container_messages: {
      flex: 1,
      padding: scale(10),
      gap: scale(8),
      backgroundColor: colors.white,
    },
    empty_container_messages: {
      flex: 1,
      padding: scale(10),
      gap: scale(8),
    },
    emptyMessages: {
      paddingVertical: scale(30),
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyText: {
      color: colors.text.secondary,
    },
  })
}
