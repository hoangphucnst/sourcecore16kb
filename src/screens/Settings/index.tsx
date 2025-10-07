import React, {useEffect} from 'react'
import {
  Platform,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
// import utils from '~/utils'
import {Icons} from '~/assets'
import AppHeader from '~/components/AppHeader'
import AppImage from '~/components/AppImage'
import AppScrollViewBody from '~/components/AppScrollViewBody'
import AppText from '~/components/AppText'
import AppVersion from '~/components/AppVersion'
import AppViewBody from '~/components/AppViewBody'
import {useAppStyles} from '~/hooks'
import useAuth from '~/redux/reduxHooks/useAuth'
import {AppTheme} from '~/styles/Theme'
import utils from '~/utils'
import {scale, scaleFont} from '~/utils/scaleScreen'
import {SettingsProps} from '../AppRoot'
import {Screens} from '../Screens'
import useUserInfo from './hooks/useUserInfo'
import AppFastImage from '~/components/AppFastImage'
import ImagePicker from 'react-native-image-crop-picker'
import {APIs} from '~/services/apis'
import {cloneDeep} from 'lodash'
import fmcTokenDevice from '~/utils/fmcTokenDevice'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SettingsScreen = (props: SettingsProps) => {
  const {THEME} = useAppStyles()
  const styles = AppStyles(THEME)

  useEffect(() => {
    setTimeout(() => {
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('transparent')
        StatusBar.setTranslucent(true)
      }
      StatusBar.setBarStyle('dark-content')
    }, 300)
    return () => {
      StatusBar.setBarStyle('light-content')
    }
  }, [])

  const {
    logout: logout_redux,
    dataLogin,
    roleInfo,
    setDataImageUser,
    // imageUser: imageUserInfo,
  } = useAuth()

  const imageUserInfo = useUserInfo()

  const {imgAvatar, imgSignature, dataUser} = imageUserInfo || {
    imgAvatar: undefined,
    imgSignature: undefined,
  }

  const onLogout = () => {
    utils.messageBox({
      title: 'Đăng xuất',
      message: 'Bạn có chắc muốn đăng xuất?',
      labelCancel: 'Huỷ',
      labelConfirm: 'Đăng xuất',
      onConfirm: () => {
        //Xoá thiết bị FCM Token
        fmcTokenDevice.unSubcribeDevice()

        logout_redux(() => {
          utils.resetToScreen(Screens.name.Login)
        })
      },
    })
  }

  const onChangeImageUser = (type: 'profile' | 'signature') => async () => {
    try {
      let fileImage
      fileImage = await ImagePicker.openPicker({
        freeStyleCropEnabled: true,
        forceJpg: true,
        cropping: true,
        cropperCancelText: 'Huỷ',
        cropperChooseText: 'Xong',
        cropperTintColor: 'rgba(0,0,0,0.5)',
        cropperToolbarTitle: 'Chỉnh sửa',
        useFrontCamera: true,
        cropperCircleOverlay: true,
      })

      fileImage = {
        ...fileImage,
        sourceURL:
          Platform.OS === 'android'
            ? fileImage?.path
            : 'file://' + fileImage?.path,
      }
      const formData = new FormData()

      formData.append('type', type)
      formData.append('image', {
        uri: fileImage.path,
        name: fileImage.filename,
        type: fileImage.mime,
      })
      utils.showLoadingFullApp({show: true})
      const res = await APIs.changeImageProfile(formData)
      utils.showLoadingFullApp({show: false})
      if (res?.status === 200) {
        utils.showMessageFlash({
          message: 'Thông báo',
          description:
            res?.message ||
            `Đổi ${type === 'profile' ? 'ảnh đại diện' : 'ảnh ký'} thành công`,
          type: 'success',
          icon: 'success',
          duration: 3000,
        })
        setDataImageUser(
          type === 'profile'
            ? cloneDeep({
                imgAvatar: {
                  ...imgAvatar,
                  uri: fileImage.sourceURL,
                },
                imgSignature: {
                  ...imgSignature,
                },
              })
            : cloneDeep({
                imgAvatar: {
                  ...imgAvatar,
                },
                imgSignature: {
                  ...imgSignature,
                  uri: fileImage.sourceURL,
                },
              }),
        )
      } else {
        utils.showMessageFlash({
          message: 'Thông báo',
          description:
            res?.message ||
            `Đổi ${type === 'profile' ? 'ảnh đại diện' : 'ảnh ký'} thất bại`,
          type: 'danger',
          icon: 'danger',
          duration: 3000,
        })
      }
    } catch (error) {
      utils.log('ImagePicker.openPicker', `${error?.message}`)
    }
  }

  return (
    <View style={styles.container}>
      <AppHeader
        title="Thiết lập"
        styleHeader={styles.header}
        styleTitle={styles.title_header}
        iconLeft={Icons.icBack_shadow}
        styleIconLeft={{
          width: scale(24),
          height: scale(24),
        }}
        onPressLeft={() => {
          utils.goBackNavigation()
        }}
      />
      <AppScrollViewBody contentContainerStyle={{gap: scale(16)}}>
        <UserInfoSection
          theme={THEME}
          userInfo={{...dataLogin, roleInfo: roleInfo, dataUser}}
          image={{
            signature: imgSignature,
            user: imgAvatar,
          }}
          onTouchAvatar={onChangeImageUser('profile')}
          onTouchSignature={onChangeImageUser('signature')}
        />
        <SettingSection theme={THEME} />
        <LogoutSection theme={THEME} onLogout={onLogout} />
      </AppScrollViewBody>
      <AppVersion styleText={{color: THEME.colors.black}} />
    </View>
  )
}

const UserInfoSection = ({
  theme,
  userInfo,
  image,
  onTouchAvatar = () => {},
  onTouchSignature = () => {},
}: {
  theme: AppTheme
  userInfo: object
  image: {
    user: object
    signature: object
  }
  onTouchAvatar?: () => void
  onTouchSignature?: () => void
}) => {
  const styles = UserInfoSectionStyles(theme)
  return (
    <View style={styles.container}>
      {/* Left Section */}
      <View style={styles.section}>
        <TouchableOpacity
          onPress={onTouchAvatar}
          style={styles.avatarImageCircle}>
          <AppFastImage
            key={
              image.user
                ? Math.random()?.toString()
                : JSON.stringify(image.user)
            }
            source={
              image.user ? {...image.user, cache: 'web'} : Icons.icNoImage
            }
            style={styles.avatarImage}
            showReloadButton={false}
          />
        </TouchableOpacity>
        <AppText style={styles.text_userInfo_fullName}>
          {userInfo.fullName}
        </AppText>
        <AppText style={styles.text_userInfo_userName}>
          {userInfo.username}
        </AppText>
        <AppText style={styles.text_userInfo_position}>
          {/* {userInfo.roleInfo?.role_name?.split(',').join('\n')} */}
          {userInfo?.dataUser?.role || ''}
          {'\n'}
          {userInfo?.dataUser?.department || ''}
        </AppText>
      </View>
      {/* Right Section */}
      <View style={styles.section}>
        <TouchableOpacity
          onPress={onTouchSignature}
          style={styles.avatarImageCircle}>
          <AppFastImage
            key={
              image.signature
                ? Math.random()?.toString()
                : JSON.stringify(image.signature)
            }
            source={
              image.signature
                ? {...image.signature, cache: 'web'}
                : Icons.icNoImage
            }
            style={styles.avatarImage}
            showReloadButton={false}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <AppText style={styles.text_userInfo_fullName}>Ảnh ký</AppText>
      </View>
    </View>
  )
}

const SettingSection = ({theme}: {theme: AppTheme}) => {
  const styles = SettingSectionStyles(theme)
  const {setRoleInfo, chooseRole, dataLogin, roleInfo: currentRole} = useAuth()

  const MenuData: {
    icon: string
    title: string
    onPress: () => void
  }[] = [
    {
      icon: Icons.icCircleUser,
      title: 'Thông tin tài khoản',
      onPress() {
        utils.navigate(Screens.name.Modal_DetailUserInfo)
      },
    },
    // {
    //   icon: Icons.icRotateReverse,
    //   title: 'Đổi vai trò',
    //   onPress() {
    //     utils.navigate(Screens.name.Modal_ChooseRole, {
    //       callbackSelectRole: roleInfo => {
    //         if (roleInfo?.permissions?.trim()?.length > 0) {
    //           // chooseRole(
    //           //   {
    //           //     roleUserDeptId: roleInfo?.role_user_dept_id,
    //           //     userId: dataLogin?.user_id,
    //           //   },
    //           //   () => {
    //           //     setRoleInfo({role: roleInfo})
    //           //     utils.resetToScreen(Screens.name.Tabs)
    //           //   },
    //           // )

    //           setRoleInfo({role: roleInfo})
    //           utils.resetToScreen(Screens.name.Tabs)
    //         } else {
    //           utils.showMessageFlash({
    //             message: 'Thông báo',
    //             description: 'Tài khoản chưa cấp quyền truy cập vào hệ thống',
    //             icon: 'danger',
    //             type: 'danger',
    //           })
    //         }
    //       },
    //     })
    //   },
    // },
  ]

  return (
    <AppViewBody style={styles.container}>
      {MenuData.map((item, index) => (
        <TouchableOpacity key={`Setting_Item_${index}`} onPress={item.onPress}>
          <View style={styles.itemCard}>
            <View style={styles.leftItemCard}>
              <AppImage source={item.icon} style={styles.icon} />
              <AppText style={styles.textItemCard}>{item.title}</AppText>
            </View>
            <AppImage source={Icons.icArrowRight} style={styles.icon} />
          </View>
        </TouchableOpacity>
      ))}
    </AppViewBody>
  )
}

const LogoutSection = ({
  theme,
  onLogout = () => {},
}: {
  theme: AppTheme
  onLogout: () => void
}) => {
  const styles = LogoutSectionStyles(theme)
  return (
    <AppViewBody style={styles.container}>
      <TouchableOpacity onPress={onLogout}>
        <View style={styles.itemCard}>
          <View style={styles.leftItemCard}>
            <AppImage
              source={Icons.icExit}
              style={styles.icon}
              resizeMode="cover"
            />
            <AppText style={styles.textItemCard}>Đăng xuất</AppText>
          </View>
        </View>
      </TouchableOpacity>
    </AppViewBody>
  )
}

export default SettingsScreen

const AppStyles = (theme: AppTheme) => {
  const {colors} = theme
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.app.background,
    },
    header: {
      backgroundColor: colors.white,
    },
    title_header: {
      color: colors.text.primary,
      fontSize: scaleFont(18),
    },
    iconBack: {
      width: scale(24),
      height: scale(24),
    },
  })
}

const UserInfoSectionStyles = (theme: AppTheme) => {
  const {colors} = theme
  return StyleSheet.create({
    container: {
      width: '100%',
      // height: scale(190),
      backgroundColor: colors.white,
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: scale(16),
      paddingHorizontal: scale(24),
    },
    avatarImage: {
      width: scale(80),
      height: scale(80),
      borderRadius: scale(80) / 2,
    },
    avatarImageCircle: {
      borderWidth: scale(1),
      borderColor: colors.primary,
      borderRadius: 99999,
    },
    primaryText: {
      fontSize: scaleFont(16),
      color: colors.text.primary,
    },
    section: {
      alignItems: 'center',
      gap: scale(8),
      flex: 1,
    },
    userInfoSection: {
      alignItems: 'center',
    },
    text_userInfo_fullName: {
      color: colors.text.primary,
      fontSize: scaleFont(16),
    },
    text_userInfo_userName: {
      color: colors.text.primary,
      fontSize: scaleFont(14),
      fontStyle: 'italic',
    },
    text_userInfo_position: {
      color: colors.text.secondary,
      fontSize: scaleFont(14),
      textAlign: 'center',
    },
  })
}

const SettingSectionStyles = (theme: AppTheme) => {
  const {colors} = theme
  return StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: colors.white,
    },
    icon: {
      width: scale(20),
      height: scale(20),
    },
    itemCard: {
      flexDirection: 'row',
      paddingVertical: scale(16),
      paddingHorizontal: scale(12),
      justifyContent: 'space-between',
    },
    leftItemCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(8),
    },
    textItemCard: {
      fontSize: scaleFont(14),
      color: colors.text.primary,
    },
  })
}

const LogoutSectionStyles = (theme: AppTheme) => {
  const {colors} = theme
  return StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: colors.white,
    },
    icon: {
      width: scale(20),
      height: scale(20),
      tintColor: colors.primary,
    },
    itemCard: {
      flexDirection: 'row',
      paddingVertical: scale(16),
      paddingHorizontal: scale(12),
      justifyContent: 'space-between',
    },
    leftItemCard: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(8),
    },
    textItemCard: {
      fontSize: scaleFont(14),
      color: colors.primary,
    },
  })
}
