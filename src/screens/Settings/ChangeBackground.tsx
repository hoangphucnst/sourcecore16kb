import {StyleSheet, TouchableOpacity, View} from 'react-native'
import React, {useCallback, useState} from 'react'
import {AppTheme} from '~/styles/Theme'
import {useAppStyles} from '~/hooks'
import AppImage from '~/components/AppImage'
import LinearGradient from 'react-native-linear-gradient'
import AppHeader from '~/components/AppHeader'
import AppText from '~/components/AppText'
import InfoUserAndNotificationCard from '../components/InfoUserAndNotificationCard'
import {Icons} from '~/assets'
import {FONTSFAMILY} from '~/styles/FontsFamily'
import {scale, scaleFont} from '~/utils/scaleScreen'
import useAuth from '~/redux/reduxHooks/useAuth'
import utils from '~/utils'
import AppButton from '~/components/AppButton'
import AppScrollViewBody from '~/components/AppScrollViewBody'
import {LIST_IMAGE_HEADER_HOME} from '~/constants'
import useChangeBackground from '~/redux/reduxHooks/useChangeBackground'

const ChangeBackground = () => {
  const {THEME} = useAppStyles()
  const styles = useCallback(styleWithTheme, [THEME])(THEME)
  const {dataLogin} = useAuth()
  const {backgoundHome, setBackground} = useChangeBackground()
  const [changeIdBkg, setChangeIdBkg] = useState(backgoundHome)

  const back = () => utils.goBackNavigation()

  const onChangeBackground = (item: {id: string; image: string}) => () => {
    setChangeIdBkg(item)
  }

  const onSaveBackground = () => {
    setBackground(changeIdBkg)
    back()
  }

  const renderImage = (item: {id: string; image: string}, index: number) => {
    const isSelected = changeIdBkg.id === item.id
    return (
      <TouchableOpacity
        onPress={onChangeBackground(item)}
        activeOpacity={0.8}
        key={index}
        style={{marginLeft: index > 0 ? scale(10) : 0}}>
        <AppImage source={item.image} style={styles.item_image} />
        {isSelected && (
          <View style={styles.contaienr_check}>
            <View style={styles.frame_check}>
              <AppImage source={Icons.icCheck} style={styles.icon_check} />
            </View>
          </View>
        )}
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <View>
        <AppImage
          source={changeIdBkg.image}
          style={styles.img_header}
          resizeMode="cover"
        />
        <LinearGradient
          start={{
            x: 0,
            y: 1,
          }}
          end={{
            x: 0,
            y: 0,
          }}
          locations={[0, 0.2]}
          colors={[THEME.colors.background, 'rgba(242,242,247,0.01)']}
          style={{
            ...StyleSheet.absoluteFill,
          }}
        />
        <LinearGradient
          start={{
            x: 0,
            y: 0,
          }}
          end={{
            x: 0,
            y: 1,
          }}
          locations={[0, 0.2]}
          colors={['rgba(0,0,0,0.5)', 'rgba(242,242,247,0.01)']}
          style={{
            ...StyleSheet.absoluteFill,
          }}
        />
        <View
          style={{
            ...StyleSheet.absoluteFill,
          }}>
          <AppHeader
            title=""
            styleHeader={styles.header}
            styleTitle={styles.title_header}
            componentLeft={
              <AppText
                style={{
                  color: THEME.colors.white,
                  fontFamily: FONTSFAMILY.NunitoBold,
                  fontSize: scaleFont(16),
                }}>
                {`Xin chào, ${dataLogin?.fullName}`}
              </AppText>
            }
            componentRight={<InfoUserAndNotificationCard />}
          />
        </View>
      </View>
      <View style={styles.skeleton_contract} />
      <View style={styles.bottom_body}>
        <View style={styles.bottom_container}>
          <View style={styles.row_bottom}>
            <View style={styles.row_bottom_left_right} />
            <AppText>Đổi giao diện trang chủ</AppText>
            <TouchableOpacity onPress={back}>
              <AppImage
                source={Icons.icClose}
                style={{
                  width: scale(24),
                  height: scale(24),
                  tintColor: THEME.colors.black,
                }}
              />
            </TouchableOpacity>
          </View>
          <AppText
            style={{
              fontSize: THEME.sizes.h5,
              fontFamily: FONTSFAMILY.NunitoSemiBold,
              marginTop: THEME.sizes.mg10,
            }}>
            Cài đặt hình nền
          </AppText>
          <AppScrollViewBody
            contentContainerStyle={{paddingBottom: scale(8)}}
            horizontal
            style={{marginVertical: THEME.sizes.mg10}}>
            {LIST_IMAGE_HEADER_HOME.map(renderImage)}
          </AppScrollViewBody>
          <AppButton
            title="Xác nhận"
            styleTitle={{color: THEME.colors.white}}
            onPress={onSaveBackground}
          />
        </View>
      </View>
    </View>
  )
}

export default ChangeBackground

const styleWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: THEME.colors.background,
    },
    header: {
      backgroundColor: 'transparent',
      borderBottomWidth: 0,
    },
    img_header: {
      height: scale(250),
      width: '100%',
    },
    title_header: {
      color: THEME.colors.white,
      marginLeft: THEME.sizes.mg25,
      width: 0,
    },
    skeleton_contract: {
      padding: 10,
      backgroundColor: THEME.colors.white,
      borderWidth: 0.5,
      borderRadius: 8,
      marginTop: 10,
      borderColor: '#d1d1d1',
      marginTop: -scale(80),
      height: scale(180),
      margin: scale(13),
    },
    bottom_body: {
      ...StyleSheet.absoluteFill,
      justifyContent: 'flex-end',
    },
    bottom_container: {
      backgroundColor: THEME.colors.white,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: scale(15),
      paddingBottom: scale(30),
    },
    row_bottom_left_right: {
      flex: 0.2,
    },
    row_bottom: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderBottomColor: THEME.colors.border,
      paddingBottom: scale(10),
    },
    item_image: {
      width: scale(100),
      height: scale(100),
      borderRadius: scale(10),
    },
    icon_check: {
      width: scale(20),
      height: scale(20),
    },
    contaienr_check: {
      alignItems: 'center',
      justifyContent: 'center',
      ...StyleSheet.absoluteFill,
    },
    frame_check: {
      borderRadius: scale(20),
      backgroundColor: THEME.colors.white,
      padding: scale(10),
    },
  })
