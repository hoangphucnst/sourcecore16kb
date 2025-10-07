import {useState, useEffect} from 'react'
import useAuth from '~/redux/reduxHooks/useAuth'
import utils from '~/utils'
import {Screens} from '~/screens/Screens'
import fmcTokenDevice from '~/utils/fmcTokenDevice'
import AppConfig from '~/app/AppConfig'

const mergeRoles = (data: any[]) => {
  return data.reduce((acc, item) => {
    for (const key in item) {
      acc[key] = acc[key] ? `${acc[key]},${item[key]}` : item[key]
    }
    return acc
  }, {})
}

const useLogin = () => {
  const {
    login,
    dataLogin,
    errorLogin,
    status,
    setRoleInfo,
    resetLogoutTokenFlag,
    // chooseRole,
    resetMessageError,
  } = useAuth()

  const [userName, setUserName] = useState<string>(dataLogin?.username || '')
  const [password, setPassword] = useState<string>(
    dataLogin?.isRemember ? dataLogin?.password : '',
  )
  const [isRemember, setIsRemember] = useState(dataLogin?.isRemember || false)
  const [host, setHost] = useState<string>(AppConfig.hostLive)

  const handleSuccess = resLogin => {
    if (resLogin?.token && resLogin?.refreshToken) {
      if (resLogin?.roles?.length > 0) {
        let mergedRole = mergeRoles(resLogin.roles)
        mergedRole = {
          ...mergedRole,
          roles: resLogin.roles,
        }

        fmcTokenDevice.registerDevice()
        resetLogoutTokenFlag()
        setRoleInfo({role: mergedRole})
        utils.resetToScreen(Screens.name.Tabs)
      } else {
        utils.showMessageFlash({
          message: 'Thông báo',
          description: 'Tài khoản chưa cấu hình vị trí công tác',
          icon: 'warning',
          type: 'warning',
        })
      }
    }
  }

  const onLogin = () => {
    if (!userName.trim()) {
      return utils.showMessageFlash({
        message: 'Thông báo',
        icon: 'warning',
        type: 'warning',
        description: 'Tên đăng nhập không được để trống!',
      })
    }
    if (!password.trim()) {
      return utils.showMessageFlash({
        message: 'Thông báo',
        icon: 'warning',
        type: 'warning',
        description: 'Mật khẩu không được để trống!',
      })
    }

    login(
      {
        username: userName,
        password,
        isRemember,
      },
      resLogin => {
        if (resLogin?.validate2FAResult) {
          utils.navigate(Screens.name.Modal_AuthOTP, {
            username: userName,
            callbackSuccess: handleSuccess,
            isRemember,
            password,
          })
        } else {
          handleSuccess(resLogin)

          // if (resLogin?.roles?.length > 1) {
          //   utils.navigate(Screens.name.Modal_ChooseRole, {
          //     callbackSelectRole: role => {
          //       if (role?.permissions?.trim()?.length > 0) {
          //         chooseRole(
          //           {
          //             roleUserDeptId: role?.role_user_dept_id,
          //             userId: resLogin?.user_id,
          //           },
          //           dataSelectRole => {
          //             //Đăng ký thiết bị FCM Token
          //             fmcTokenDevice.registerDevice()

          //             //Reset cờ nhận biết token hết hạn
          //             resetLogoutTokenFlag()

          //             //Lưu vai trò đang lựa chọn
          //             setRoleInfo({role: role})

          //             utils.replace(Screens.name.Tabs)
          //           },
          //         )
          //       } else {
          //         alertAccountNotPermission()
          //       }
          //     },
          //   })
          // } else if (resLogin?.roles?.length === 1) {
          //   if (resLogin?.roles?.[0]?.permissions?.trim()?.length > 0) {
          //     //Đăng ký thiết bị FCM Token
          //     fmcTokenDevice.registerDevice()

          //     //Reset cờ nhận biết token hết hạn
          //     resetLogoutTokenFlag()

          //     //Lưu vai trò đang lựa chọn
          //     setRoleInfo({role: resLogin?.roles[0]})

          //     utils.replace(Screens.name.Tabs)
          //   } else {
          //     alertAccountNotPermission()
          //   }
          // } else {
          //   utils.showMessageFlash({
          //     message: 'Thông báo',
          //     description: 'Tài khoản chưa cấu hình vai trò',
          //     icon: 'warning',
          //     type: 'warning',
          //   })
          // }
        }
      },
    )
  }

  useEffect(() => {
    if (errorLogin?.length > 0 && status === 'rejected') {
      utils.showMessageFlash({
        message: 'Thông báo',
        icon: 'danger',
        type: 'danger',
        description: errorLogin,
      })
      resetMessageError()
    }
  }, [errorLogin, status])

  return {
    userName,
    setUserName,
    password,
    setPassword,
    isRemember,
    setIsRemember,
    onLogin,
    host,
    setHost,
  }
}

export default useLogin
