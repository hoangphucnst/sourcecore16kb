import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  TextInput,
  View,
} from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import AppScrollViewBody from '~/components/AppScrollViewBody'
import MessageThread from './components/MessageThread'
import {scale} from '~/utils/scaleScreen'
import {useAppStyles, useDownloadFile} from '~/hooks'
import Svg, {Line} from 'react-native-svg'
import ReplyBlock, {ReplyBlockRef} from './components/ReplyBlock'
import AppText from '~/components/AppText'
import useActionOnCreditContract from '../../hooks/useActionOnCreditContract'
import utils from '~/utils'

const ProcessFeedback = ({
  tabInfo,
  creditIdEncode,
  detailCreditContractHook,
}: {
  tabInfo: {key: string; title: string; heightHeader: number}
  creditIdEncode: string
  detailCreditContractHook: {
    isLoading: boolean
    detailCreditContract: DisplayDetailContract
    refreshDetail: () => void
    refreshFeedback: () => void
  }
}) => {
  const styles = useProcessFeedbackStyles()
  const [text, setText] = useState('')
  const replyBlockRef = useRef<ReplyBlockRef>(null)
  const inputRef = useRef<TextInput>(null)
  const {sendFeedback} = useActionOnCreditContract()
  const {detailCreditContract, refreshFeedback, isLoading} =
    detailCreditContractHook
  const [loading, setLoading] = useState(isLoading.processFeedback)
  useEffect(() => {
    setLoading(isLoading.processFeedback)
  }, [isLoading.processFeedback])
  const {getUrlImageAvatarMsg} = useDownloadFile()
  const {THEME} = useAppStyles()
  const {colors} = THEME

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  const handleSendProcess = async () => {
    const replyTarget = replyBlockRef.current?.getReplyTo()
    await sendFeedback({
      objectIdEncode: creditIdEncode,
      commentContent: text,
      parentId: replyTarget?.id,
    })
    await refreshFeedback()
    setText('')
  }
  const data = detailCreditContract?.processFeedback || []

  const isEmptyMessages = data.length === 0

  return (
    <View style={styles.container}>
      <AppScrollViewBody
        keyboardShouldPersistTaps="handled"
        // onScrollBeginDrag={Keyboard.dismiss}
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
                {data.map((msg, index) => {
                  const source = {
                    uri: getUrlImageAvatarMsg({
                      userId: msg?.userId,
                    }),
                  }
                  return (
                    <View key={msg.id}>
                      <MessageThread
                        message={msg}
                        avatar={utils.isDefined(msg?.userId) ? source : null}
                        onReply={message => {
                          replyBlockRef.current?.setReplyTo(message)
                          setTimeout(() => inputRef.current?.focus(), 100)
                        }}
                      />
                      {index !== data.length - 1 && <CustomDashedLine />}
                    </View>
                  )
                })}
              </>
            )}
          </View>
        </View>
      </AppScrollViewBody>
      <ReplyBlock
        heightHeader={tabInfo.heightHeader}
        tab
        ref={replyBlockRef}
        inputRef={inputRef}
        value={text}
        onChangeText={setText}
        onSend={() => {
          Keyboard.dismiss()

          if (text?.length > 0) {
            handleSendProcess()
            replyBlockRef.current?.clearMessage()
          }
        }}
      />
      {/* </View> */}
    </View>
  )
}

export default ProcessFeedback

const useProcessFeedbackStyles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    container_scroll: {
      flex: 1,
      // paddingVertical: scale(10),
      // paddingBottom: scale(75),
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
    blockReply: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
    },
    emptyMessages: {
      paddingVertical: scale(30),
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyText: {
      color: colors.text.secondary,
    },
    loading: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: scale(30),
    },
  })
}

const CustomDashedLine = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return (
    <Svg height="1" width="100%">
      <Line
        x1="0"
        y1="0"
        x2="100%"
        y2="0"
        stroke={colors.border}
        strokeWidth={1.5}
        strokeDasharray="6, 2" // {dash length, gap}
      />
    </Svg>
  )
}
