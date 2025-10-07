import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {APIs} from '~/services/apis'
import AppServices from '~/services/AppServices'
import {Role} from '~/services/apis/userService'
import {APIAuthen, TypeRespondLogin} from '~/services/apis/authService'

export type TypeImageUser = {
  imgAvatar: {
    uri: string
    headers: {
      Authorization: string
    }
  }
  imgSignature: {
    uri: string
    headers: {
      Authorization: string
    }
  }
}

export interface LocalDataLogin extends TypeRespondLogin {
  // More
}

export type TypeLoginState = {
  isLogin?: boolean
  dataLogin?: TypeRespondLogin | null | undefined
  errorLogin?: any | undefined
  status?: 'idle' | 'pending' | 'fulfilled' | 'rejected'
  roleInfo?: Role | null
  imageUser: TypeImageUser
  loggedOutByTokenExpired: boolean
}

const initState: TypeLoginState = {
  isLogin: false,
  dataLogin: {},
  errorLogin: '',
  status: 'idle',
  roleInfo: null,
  imageUser: null,
  loggedOutByTokenExpired: false,
}

export const AuthenLogin = createAsyncThunk(
  'authen/login',
  async (value: object, {rejectWithValue}) => {
    const response = await APIs.login({
      username: value?.username,
      password: value?.password,
    })
    // Login normal
    if (response?.object?.token && response?.object?.refreshToken)
      return {...response?.object, ...value}

    // Login with 2FA
    if (response?.object?.validate2FAResult) {
      return {...response?.object, ...value}
    }
    const error = AppServices.handlerError(response)
    if (response?.status === 400) return rejectWithValue(error.message)

    if (error.error) {
      return rejectWithValue(error.error)
    }
    return rejectWithValue(error.message)
  },
)

export const AuthenLogin2FA = createAsyncThunk(
  'authen/login2FA',
  async (
    value: {
      username: string
      otp: string
      isRemember: boolean
      password: string
    },
    {rejectWithValue},
  ) => {
    console.log('AuthenLogin2FA', value)
    const response = await APIs.validateOtpAuthenticator({
      username: value?.username,
      otp: value?.otp,
    })
    // Login normal
    if (response?.object?.token && response?.object?.refreshToken)
      return {...response?.object, ...value}

    const error = AppServices.handlerError(response)
    if (response?.status === 400) return rejectWithValue(error.message)

    if (error.error) {
      return rejectWithValue(error.error)
    }
    return rejectWithValue(error.message)
  },
)

export const AuthenRefreshToken = createAsyncThunk(
  'authen/refreshToken',
  async (_, {rejectWithValue, getState}) => {
    const state = getState() as RootState
    const {dataLogin} = state.auth
    const refreshToken = dataLogin?.refreshToken || ''
    if (refreshToken) {
      const res = await APIs.refreshToken()
      if (res.object.accessToken && res.status === 200) {
        return res
      }
      const error = AppServices.handlerError(res)
      if (error.status === -1) {
        return rejectWithValue(error?.resOrginal?._message)
      }
      if (error.status === 400) {
        return rejectWithValue(error?.message)
      }
      return rejectWithValue('Phiên đăng nhập hết hiệu lực')
    }
  },
)

export const AuthenLogout = createAsyncThunk(
  'authen/logout',
  async (_, {rejectWithValue}) => {
    try {
      const response = await APIAuthen.logout()

      if (response.status === 200) {
        return 'Đăng xuất thành công'
      }

      const error = AppServices.handlerError(response)
      return rejectWithValue(error.message || 'Lỗi khi đăng xuất')
    } catch (err) {
      const error = AppServices.handlerError(err)
      return rejectWithValue(
        error.message || 'Lỗi không xác định khi đăng xuất',
      )
    }
  },
)

const AuthSlice = createSlice({
  initialState: initState,
  name: 'authen',
  reducers: {
    setRoleInfo: (state, action: PayloadAction<Role>) => {
      state.roleInfo = action.payload
    },
    setErrorLogin: (state, _) => {
      state.errorLogin = ''
      state.status = 'fulfilled'
    },
    logOutClearData: state => {
      state.dataLogin = {}
      state.isLogin = false
      state.errorLogin = ''
      state.status = 'idle'
    },
    setIsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload
      state.status = 'idle'
    },
    setImageUser: (state, action: PayloadAction<object>) => {
      state.imageUser = action.payload
    },
    setDataLogin: (state, action) => {
      state.dataLogin = action.payload
    },
    logoutByTokenExpired(state) {
      state.loggedOutByTokenExpired = true
    },
    resetLogoutFlag(state) {
      state.loggedOutByTokenExpired = false
    },
  },
  extraReducers: builder => {
    builder.addCase(AuthenLogin.pending, (state, _) => {
      state.status = 'pending'
    })
    builder.addCase(AuthenLogin.fulfilled, (state, action) => {
      state.status = 'fulfilled'
      state.isLogin = true
      state.dataLogin = action.payload
      state.errorLogin = ''
    })
    builder.addCase(AuthenLogin.rejected, (state, action) => {
      state.status = 'rejected'
      state.errorLogin = action?.payload || 'Đăng nhập thất bại'
    })
    builder.addCase(AuthenLogin2FA.pending, (state, _) => {
      state.status = 'pending'
    })
    builder.addCase(AuthenLogin2FA.fulfilled, (state, action) => {
      state.status = 'fulfilled'
      state.isLogin = true
      state.dataLogin = action.payload
      state.errorLogin = ''
    })
    builder.addCase(AuthenLogin2FA.rejected, (state, action) => {
      state.status = 'rejected'
      state.errorLogin = action?.payload || 'Đăng nhập thất bại'
    })
    builder.addCase(AuthenLogout.pending, (state, _) => {
      state.status = 'pending'
    })
    builder.addCase(AuthenLogout.fulfilled, (state, _) => {
      state.status = 'fulfilled'
      state.isLogin = false
      state.dataLogin = {username: state.dataLogin?.username}
      state.errorLogin = ''
      state.roleInfo = ''
    })
    builder.addCase(AuthenLogout.rejected, (state, action) => {
      state.status = 'rejected'
      state.errorLogin = action?.payload || 'Đăng xuất thất bại'
    })
    builder.addCase(AuthenRefreshToken.pending, (state, _) => {
      state.status = 'pending'
      state.loadingRefresh = true
    })
    builder.addCase(AuthenRefreshToken.fulfilled, (state, action) => {
      state.status = 'fulfilled'
      state.loadingRefresh = false
      state.dataLogin = action.payload
      state.isLogin = true
      state.errorLogin = ''
    })
    builder.addCase(AuthenRefreshToken.rejected, (state, action) => {
      state.status = 'rejected'
      state.loadingRefresh = false
      state.dataLogin = undefined
      state.isLogin = false
      state.errorLogin = action.payload || 'Phiên đăng nhập hết hạn'
    })
  },
})
export const {
  setRoleInfo,
  setErrorLogin,
  setIsLogin,
  logOutClearData,
  setImageUser,
  setDataLogin,
  logoutByTokenExpired,
  resetLogoutFlag,
} = AuthSlice.actions
const ReducerAuth = AuthSlice.reducer
export default ReducerAuth
