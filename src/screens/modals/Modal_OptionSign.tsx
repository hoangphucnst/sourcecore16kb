import {StyleSheet, View} from 'react-native'
import React, {useCallback} from 'react'
import {AppTheme} from '~/styles/Theme'
import useAppStyles from '~/hooks/useAppStyles'
import {StyledFilterContainer} from '../components'
import utils from '~/utils'
import AppButton from '~/components/AppButton'
import {scale} from '~/utils/scaleScreen'
import {TYPE_SIGN} from '~/constants'
import {StyledFilterContainerRef} from '../components/StyledFilterContainer'

const Modal_OptionSign = props => {
  const {THEME} = useAppStyles()
  const styles = useCallback(styleWithTheme, [THEME])(THEME)
  const callBackPickSign = utils.ngetParam(props, 'onSignCallback', () => {})
  const refModal = React.useRef<StyledFilterContainerRef>(null)

  const onSign = (type: string) => () => {
    refModal.current?.triggerClose()
    callBackPickSign(type)
  }

  return (
    <StyledFilterContainer
      ref={refModal}
      title={'Chọn phương thức ký'}
      onApply={() => {
        utils.goBackNavigation()
      }}
      showBottom={false}>
      <View style={styles.container}>
        <AppButton
          title="Ký thường"
          onPress={onSign(TYPE_SIGN.NORMAL)}
          styleTitle={styles.textbutton}
        />
        <AppButton
          title="Ký Sim CA"
          styleTitle={styles.textbutton}
          onPress={onSign(TYPE_SIGN.SIM_CA)}
        />
        <AppButton
          title="Ký Ca Cloud"
          onPress={onSign(TYPE_SIGN.CA_CLOUD)}
          styleTitle={styles.textbutton}
        />
      </View>
    </StyledFilterContainer>
  )
}

export default Modal_OptionSign

const styleWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    container: {
      gap: scale(10),
    },
    textbutton: {
      color: THEME.colors.white,
    },
    disable: {
      backgroundColor: THEME.colors.border,
    },
  })
