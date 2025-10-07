import {StyleSheet, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {scale, scaleFont} from '~/utils/scaleScreen'
import {useAppStyles} from '~/hooks'
import AppImage from '~/components/AppImage'
import AppText from '~/components/AppText'
import {Icons} from '~/assets'
import {AppTheme} from '~/styles/Theme'
import {Property} from '~/services/apis/mortgageService'
import utils from '~/utils'

interface CardCollateralProps {
  styleContainer?: StyleSheet
  styleText?: StyleSheet
  data: Property
  onPress: () => void
}

const CardCollateral: React.FC<CardCollateralProps> = ({
  styleContainer,
  styleText,
  data,
  onPress = () => {},
}) => {
  const {THEME} = useAppStyles()
  const styles = CardCollateralStyles(THEME)
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, styleContainer]}>
        <View style={styles.row}>
          <View style={styles.container_icon}>
            <AppImage source={Icons.icMortgage1} style={styles.icon} />
          </View>
          <View style={styles.content}>
            <AppText style={[styles.primaryText, styleText]}>
              {utils.safeValue(data?.propertyName)}
            </AppText>
            <AppText style={[styles.secondaryText, styleText]}>
              {`Tờ bản đồ số: ${utils.safeValue(data?.mapSheetNumber)}`}
            </AppText>
            <AppText style={[styles.secondaryText, styleText]}>
              {`Địa chỉ: ${utils.safeValue(data?.landUsePurpose)}`}
            </AppText>
            <AppText style={[styles.secondaryText, styleText]}>
              {`Diện tích: ${utils.safeValue(data?.area)}`}
            </AppText>
            <AppText style={[styles.secondaryText, styleText]}>
              {`Giá trị: ${utils.isDefined(data?.mortgagedAssetValue) ? `${utils.formatMoney(data?.mortgagedAssetValue)}` : '---'}`}
            </AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default CardCollateral

const CardCollateralStyles = (THEME: AppTheme) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {colors, fonts, sizes} = THEME

  return StyleSheet.create({
    container: {},
    row: {
      flexDirection: 'row',
    },
    icon: {
      width: scale(22),
      height: scale(22),
      tintColor: colors.primary,
    },
    content: {
      flex: 1,
      marginLeft: scale(8),
      gap: scale(8),
    },
    container_icon: {
      padding: scale(9),
      borderRadius: scale(20),
      backgroundColor: colors.button.background,
      width: scale(40),
      height: scale(40),
    },
    primaryText: {
      color: colors.text.primary,
      fontSize: scaleFont(14),
    },
    secondaryText: {
      color: colors.text.secondary,
      fontSize: scaleFont(14),
    },
  })
}
