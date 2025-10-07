import {METHOD_CALL_API, TypeRespondSuccess} from '.'
import AppServices from '../AppServices'
import {DOMAIN, END_POINT} from './endpoints'
import {store} from '~/redux/store'

export type TypeRespondLogin = {
  token: string
  refreshToken: string
  username: string
  roles: UserRole
  fullName: string
  email: string
  phone: string
  partner_id: stringuy
  user_id: number
  validate2FAResult: boolean
}

export type UserRole = {
  role_user_dept_id: string
  role_id: string
  role_name: string
  department_id: string
  department_name: string
  permissions: string // Dùng utils.formatPermission để thành mảng lại
}

export type TypeUserInfo = {
  userId: string
  fullName: string
  email: string
  username: string
  userCode: string
  birthDay: string
  phoneNumber: string
  certificateTypeName: string
  identifyCode: string
  issueDate: string
  issuePlace: string
  gender: string
  digitalCertificateName: string
  simCa: string
  profileImage: any
  signatureImage: any
}

export type TypeRespondUserInfo = {
  object: TypeUserInfo | null
  message: string
  status: number
}

export type TypeRespondRefreshToken = TypeRespondSuccess<{
  accessToken: string
}>

export type TypeRespondSelectRole = TypeRespondSuccess<string>

export const APIAuthen = {
  login: async ({
    username = '',
    password = '',
  }: {
    username: string
    password: string
  }) => {
    return AppServices.api<TypeRespondSuccess<TypeRespondLogin>>({
      url: END_POINT.AUTH.login,
      methodCall: METHOD_CALL_API.POST,
      domain: DOMAIN.MAIN,
      body: JSON.stringify({
        username,
        password,
      }),
      checktoken: false,
    })
  },
  getInfoUser: async (userId: string) => {
    return AppServices.api<TypeRespondUserInfo>({
      url: END_POINT.AUTH.InfoUser(userId),
      methodCall: METHOD_CALL_API.GET,
      domain: DOMAIN.MAIN,
    })
  },
  refreshToken: async () => {
    const {dataLogin} = store.getState().auth
    return AppServices.api<TypeRespondRefreshToken>({
      url: END_POINT.AUTH.RefreshToken,
      methodCall: METHOD_CALL_API.GET,
      domain: AppConfig.host,
      body: JSON.stringify({
        refreshToken: dataLogin?.refreshToken,
      }),
    })
  },
  logout: async () => {
    return AppServices.api<TypeRespondUserInfo>({
      url: END_POINT.AUTH.logout,
      methodCall: METHOD_CALL_API.POST,
      domain: DOMAIN.MAIN,
    })
  },
  selectRole: async (data: {roleUserDeptId: string; userId: string}) => {
    return AppServices.api<TypeRespondSelectRole>({
      url: END_POINT.AUTH.selectRole,
      methodCall: METHOD_CALL_API.POST,
      domain: DOMAIN.MAIN,
      body: JSON.stringify(data),
    })
  },
  changeImageProfile: async (formData: FormData) => {
    const dataLogin = store.getState()?.auth?.dataLogin
    return AppServices.api<TypeRespondSuccess<null>>({
      url: END_POINT.AUTH.changeImageProfile,
      methodCall: METHOD_CALL_API.POST,
      domain: DOMAIN.MAIN,
      body: formData,
      customReq: true,
      useHeaderPrivate: true,
      header: {
        Authorization: `Bearer ${dataLogin?.token}`,
        'Content-Type': ' multipart/form-data',
      },
    })
  },
  registerDeviceToekn: async (data: {fcmToken: string; isDelete?: boolean}) => {
    return AppServices.api<TypeRespondSuccess<Any>>({
      url: END_POINT.AUTH.registerDeviceToekn,
      methodCall: METHOD_CALL_API.POST,
      domain: DOMAIN.MAIN,
      body: JSON.stringify(data),
    })
  },
  validateOtpAuthenticator: async (data: {username: string; otp: string}) => {
    return AppServices.api<TypeRespondSuccess<TypeRespondLogin>>({
      url: END_POINT.AUTH.validateOtpAuthenticator,
      methodCall: METHOD_CALL_API.POST,
      domain: DOMAIN.MAIN,
      body: JSON.stringify({...data, secret: 'null'}),
      checktoken: false,
    })
  },
}
