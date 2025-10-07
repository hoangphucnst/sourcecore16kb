import React from 'react'
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  Platform,
  StyleProp,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native'
import {TouchableOpacity as TouchGesture} from 'react-native-gesture-handler'
import Ripple from './Ripple'
import AppText from '../AppText'
import {scale} from '~/utils/scaleScreen'

const TouchText = Platform.select({
  ios: TouchableOpacity,
  android: TouchGesture,
}) as React.ComponentType<any>

export interface ActionItem {
  icon: React.ReactNode
  text?: string
  subTitle?: string
  color: string
  styleButton?: StyleProp<ViewStyle>
  styleText?: StyleProp<TextStyle>
  styleFrameText?: StyleProp<ViewStyle>
  styleSubtitle?: StyleProp<TextStyle>
}

interface FloatButtonProps {
  actions: ActionItem[]
  actionsCover?: ActionItem[]
  onPress?: (item: ActionItem) => void
  style?: StyleProp<ViewStyle>
  styleOption?: StyleProp<ViewStyle>
  rotation?: string
  colorOptionActive?: string
  stateModal?: (open: boolean) => void
  styleAction?: StyleProp<ViewStyle>
}

interface FloatButtonState {
  showModal: boolean
  type: any
}

class FloatButton extends React.PureComponent<
  FloatButtonProps,
  FloatButtonState
> {
  private animation = new Animated.Value(0)
  private opacity = new Animated.Value(0)
  private open = false

  constructor(props: FloatButtonProps) {
    super(props)
    this.state = {
      showModal: false,
      type: null,
    }
  }

  toggleMenu = () => {
    const toValue = this.open ? 0 : 1

    Animated.parallel([
      Animated.timing(this.opacity, {
        toValue,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(this.animation, {
        toValue,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start()

    this.open = !this.open
    this.props.stateModal?.(this.open)
    this.setState({showModal: !this.state.showModal})
  }

  handleOptions = (item: ActionItem) => {
    this.props.onPress?.(item)
    this.toggleMenu()
  }

  renderOptions() {
    if (this.props.actions.length > 1) {
      let output = 0
      return this.props.actions.map((item, index) => {
        if (index > 0) {
          output = output - scale(55)
          return (
            <Animated.View
              key={index}
              style={[
                styles.button,
                {backgroundColor: item.color, opacity: this.opacity},
                styles.small,
                {
                  transform: [
                    {
                      translateY: this.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, output],
                      }),
                    },
                  ],
                },
                this.props.styleAction,
                item.styleButton,
              ]}>
              <Ripple
                style={[styles.small, item?.styleButton]}
                rippleContainerBorderRadius={22}
                onPress={() => this.handleOptions(item)}>
                {item.icon}
              </Ripple>
              <Animated.View style={[this.props.style, styles.labelContainer]}>
                <TouchText onPress={() => this.handleOptions(item)}>
                  <View style={[styles.textFrame, item.styleFrameText]}>
                    <AppText style={[styles.textStyle, item.styleText]}>
                      {item.text}
                    </AppText>
                  </View>
                </TouchText>
              </Animated.View>
            </Animated.View>
          )
        }
      })
    }
  }

  renderActionCover = () => {
    const {actionsCover, styleOption} = this.props

    if (!actionsCover || actionsCover.length === 0) return null

    return actionsCover.map((button, index) => (
      <View key={index} style={styles.actionCoverItem}>
        <Ripple
          rippleColor="#FFF"
          style={[
            styles.button_2,
            {backgroundColor: button.color},
            styles.normal,
            styleOption,
            button.styleButton,
          ]}
          rippleContainerBorderRadius={30}
          onPress={() => {
            if (!this.state.showModal) {
              this.props.onPress?.(button)
            } else {
              this.toggleMenu()
              this.props.onPress?.(button)
            }
          }}>
          {button.icon}
        </Ripple>
        {button.subTitle && (
          <AppText style={[styles.subtitle, button.styleSubtitle]}>
            {button.subTitle}
          </AppText>
        )}
      </View>
    ))
  }

  render() {
    const {
      rotation = '45deg',
      actions,
      style,
      styleOption,
      colorOptionActive,
    } = this.props

    const animatedRotation = {
      transform: [
        {
          rotate: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', rotation],
          }),
        },
      ],
    }

    const dynamicActionCoverContainer = [
      styles.actionCoverContainer,
      {
        right: (styleOption as any)?.right ?? -scale(50 / 2),
      },
    ]

    return (
      <>
        {/* Overlay background */}
        <Animated.View
          pointerEvents={this.state.showModal ? 'box-only' : 'none'}
          style={[styles.overlayBackground, {opacity: this.opacity}]}
          onTouchEnd={(_: GestureResponderEvent) => this.toggleMenu()}
        />

        {/* Main floating button */}
        <View style={[styles.container, style]}>
          {this.renderOptions()}

          <View style={dynamicActionCoverContainer}>
            {this.renderActionCover()}

            <Ripple
              rippleColor="#FFF"
              style={[
                styles.button_2,
                {
                  backgroundColor: this.open
                    ? colorOptionActive || actions[0]?.color
                    : actions[0]?.color,
                },
                styles.normal,
                styleOption,
              ]}
              rippleContainerBorderRadius={30}
              onPress={this.toggleMenu}>
              <Animated.View style={animatedRotation}>
                {actions[0]?.icon}
              </Animated.View>
            </Ripple>
          </View>
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
  },
  overlayBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  button: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.35,
    shadowOffset: {width: 0, height: 5},
    shadowColor: '#000',
    shadowRadius: 3,
    elevation: 5,
  },
  normal: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
  },
  small: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_2: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 5},
    shadowColor: '#000',
    shadowRadius: 3,
    elevation: 5,
  },
  labelContainer: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: scale(55),
    justifyContent: 'center',
    width: scale(200),
    alignItems: 'flex-end',
  },
  textFrame: {
    borderRadius: 10,
    backgroundColor: 'white',
  },
  textStyle: {
    fontSize: scale(14),
    paddingVertical: scale(4),
    paddingHorizontal: scale(8),
    color: 'gray',
  },
  actionCoverContainer: {
    position: 'absolute',
    flexDirection: 'row',
  },
  actionCoverItem: {
    alignItems: 'center',
    marginRight: scale(6),
  },
  subtitle: {
    fontSize: scale(12),
  },
})

export default FloatButton
