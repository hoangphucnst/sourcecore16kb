import React, {useImperativeHandle, useState, forwardRef} from 'react'
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import {scale} from '~/utils/scaleScreen'
import {useAppStyles} from '~/hooks'
import AppImage from '~/components/AppImage'
import {Icons} from '~/assets'
import AppText from '~/components/AppText'
import {Fontsfamily} from '~/styles/FontsFamily'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import {CommentReply, CommentThread} from '~/services/apis/creditService'
import AppInput from '~/components/AppInput'

interface ReplyBlockProps {
  tab: boolean
  value: string
  onChangeText: (text: string) => void
  onSend: () => void
  inputRef?: React.RefObject<TextInput>
  heightHeader: number
}

export interface ReplyBlockRef {
  setReplyTo: (message: CommentThread | CommentReply | null) => void
  getReplyTo: () => CommentThread | CommentReply | null
  clearMessage: () => void
}

const ReplyBlock = forwardRef<ReplyBlockRef, ReplyBlockProps>(
  (
    {value, tab = false, onChangeText, onSend, inputRef, heightHeader = 0},
    ref,
  ) => {
    const {bottom} = useSafeAreaInsets()
    const BOTTOM_PADDING = scale(10) + bottom
    const {THEME} = useAppStyles()
    const {colors} = THEME
    const styles = Styles()

    const [replyTo, setReplyTo] = useState<CommentThread | CommentReply | null>(
      null,
    )
    const valueBottom = useSharedValue(BOTTOM_PADDING)

    useImperativeHandle(ref, () => ({
      setReplyTo: (message: CommentThread | CommentReply | null) => {
        setReplyTo(message)
      },
      getReplyTo: () => replyTo,
      clearMessage: () => {
        setReplyTo(null)
        inputRef?.current?.clear()
      },
    }))

    const rotateDrop = useAnimatedStyle(() => ({
      paddingBottom: valueBottom.value,
    }))

    const onChangeAnimation = (type: 'FOCUS' | 'BLUR') => () => {
      valueBottom.value = withTiming(
        type === 'FOCUS' ? scale(10) : BOTTOM_PADDING,
        {
          duration: 150,
          easing: Easing.linear,
        },
      )
    }

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'height'}
        keyboardVerticalOffset={tab ? heightHeader + scale(10) : 0}>
        <View>
          {replyTo && (
            <View style={styles.blockReply}>
              <View style={styles.row}>
                <AppText style={styles.smolText}>{`Đang trả lời `}</AppText>
                <AppText style={styles.replyNameText}>
                  {replyTo?.userName || 'Người dùng không tồn tại'}
                </AppText>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setReplyTo(null)
                }}>
                <View style={styles.deleteBlock}>
                  <AppImage source={Icons.icClose} style={styles.deleteIcon} />
                </View>
              </TouchableOpacity>
            </View>
          )}
          <Animated.View
            style={[
              styles.wrapper,
              tab
                ? {
                    paddingBottom: scale(10) + bottom,
                  }
                : rotateDrop,
            ]}>
            <AppInput
              ref={inputRef}
              placeholder="Nhập ý kiến xử lý"
              value={value}
              onChangeText={onChangeText}
              placeholderTextColor={colors.text.secondary}
              style={[styles.input, styles.top]}
              onFocus={onChangeAnimation('FOCUS')}
              onBlur={onChangeAnimation('BLUR')}
              multiline
            />
            <TouchableOpacity onPress={onSend} style={styles.sendButton}>
              <AppImage source={Icons.icSendSolid} style={styles.sendIcon} />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    )
  },
)

ReplyBlock.displayName = 'ReplyBlock'

export default ReplyBlock

const Styles = () => {
  const {THEME} = useAppStyles()
  const {colors} = THEME
  return StyleSheet.create({
    wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: colors.border,
      backgroundColor: colors.white,
      paddingHorizontal: scale(10),
      paddingVertical: scale(8),
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: scale(12),
      paddingBottom: Platform.OS === 'ios' ? scale(10) : 0, // mặc định có paddingBottom > 0
      paddingHorizontal: scale(12),
      fontSize: scale(14),
      color: colors.text.primary,
      backgroundColor: colors.input.background,
      paddingTop: scale(10),
      maxHeight: scale(80),
    },
    sendButton: {
      padding: scale(4),
      marginLeft: scale(6),
    },
    sendIcon: {
      width: scale(24),
      height: scale(24),
      tintColor: colors.primary,
    },
    deleteBlock: {
      width: scale(20),
      height: scale(20),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: scale(1),
      borderColor: colors.fab.coralRed,
      borderRadius: scale(24),
    },
    deleteIcon: {
      width: scale(18),
      height: scale(18),
      tintColor: colors.fab.coralRed,
    },
    blockReply: {
      backgroundColor: colors.background,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: scale(10),
      paddingVertical: scale(5),
      borderWidth: 0.5,
      borderColor: colors.border,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    smolText: {
      fontFamily: Fontsfamily.Nunito.Regular,
      fontSize: scale(12),
    },
    replyNameText: {
      fontFamily: Fontsfamily.Nunito.Bold,
      color: colors.primary,
    },
    top: {
      textAlignVertical: 'top',
    },
    center: {
      textAlignVertical: 'center',
    },
  })
}
