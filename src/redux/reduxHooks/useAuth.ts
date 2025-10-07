import {useDispatch, useSelector} from 'react-redux';
import {
  AuthenLogin,
  AuthenLogin2FA,
  AuthenLogout,
  resetLogoutFlag,
  setDataLogin,
  setErrorLogin,
  setImageUser,
  setRoleInfo as setRoleInfoSlide,
} from '../slices/AuthSlice';
import {RootState, store} from '../store';
import utils from '~/utils';
import {APIs} from '~/services/apis';

const useAuth = () => {
  const {isLogin, status, errorLogin, roleInfo, dataLogin, imageUser} =
    useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const login = async (value: object, callback = () => {}) => {
    new Promise(resolve => {
      resolve(dispatch(AuthenLogin(value)));
    }).then(resPromise => {
      callback(resPromise.payload); // Login với cokie mới thành công
    });
  };

  const login2FA = async (
    value: {
      username: string;
      otp: string;
      isRemember: boolean;
      password: string;
    },
    callback = () => {},
  ) => {
    new Promise(resolve => {
      resolve(dispatch(AuthenLogin2FA(value)));
    }).then(resPromise => {
      callback(resPromise.payload); // Login với cokie mới thành công
    });
  };

  const logout = (callbackSuccess = () => {}) => {
    new Promise(resolve => {
      resolve(dispatch(AuthenLogout()));
    }).then(resPromise => {
      callbackSuccess(resPromise.payload); // Login với cokie mới thành công
    });
  };

  const setRoleInfo = ({role}: {role: Role}) => {
    dispatch(setRoleInfoSlide(role));
  };

  const setDataImageUser = (data: object) => {
    dispatch(setImageUser(data));
  };

  const resetMessageError = () => {
    dispatch(setErrorLogin());
  };

  const chooseRole = async (
    data: {roleUserDeptId: string; userId: string},
    callbackSuccess = () => {},
  ) => {
    const {dataLogin: dataLoginOld} = store.getState().auth;
    utils.showLoadingFullApp({show: true});
    const res = await APIs.selectRole(data);
    utils.showLoadingFullApp({show: false});
    if (res?.status === 200 && res?.object?.length > 0) {
      new Promise(resolve => {
        resolve(dispatch(setDataLogin({...dataLoginOld, token: res?.object})));
      }).then(resPromise => {
        callbackSuccess(resPromise.payload); // Login với cokie mới thành công
      });
    } else {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: 'Xảy ra lỗi trong quá trình chọn vai trò',
        icon: 'danger',
        type: 'danger',
      });
    }
  };

  const resetLogoutTokenFlag = () => {
    dispatch(resetLogoutFlag());
  };

  return {
    // value
    isLogin,
    status,
    errorLogin,
    roleInfo,
    dataLogin,
    imageUser,

    // function
    login,
    login2FA,
    logout,
    setRoleInfo,
    setDataImageUser,
    resetMessageError,
    chooseRole,
    resetLogoutTokenFlag,
  };
};

export default useAuth;
