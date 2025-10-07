import {APIs, TypeRespondSuccess} from '~/services/apis';
import utils from '.';
import {RespondSignFile} from '~/services/apis/signFileService';

export type TypePayLoadSignFile = {
  attachId: string;
  objectType: string;
  agree: string;
};

const timeout = 3000;

const signFileHandlerCredit = () => {
  const signNormalFile = async ({
    data,
    callbackSuccess,
  }: {
    data: TypePayLoadSignFile;
    callbackSuccess: (
      callbackData: TypeRespondSuccess<RespondSignFile>,
    ) => void;
  }) => {
    utils.showLoadingFullApp({show: true});
    const res = await APIs.signNormal_Credit({
      attachId: data.attachId,
      objectType: data.objectType,
      isApply: data.agree,
    });
    utils.showLoadingFullApp({show: false});
    if (res.status === 200) {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: 'Ký thành công',
        icon: 'success',
        type: 'success',
        duration: timeout,
      });
      callbackSuccess(res);
    } else {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: `Ký thất bại. Mã lỗi ${res.status}`,
        icon: 'danger',
        type: 'danger',
        duration: timeout,
      });
      utils.log('signSimCaFile -> Error', res?.message);
    }
  };

  const signCaCloudFile = async (
    data: TypePayLoadSignFile,
    callbackSuccess: (
      callbackData: TypeRespondSuccess<RespondSignFile>,
    ) => void,
  ) => {
    utils.showLoadingFullApp({show: true});
    const res = await APIs.signCaCloud_Credit({
      attachId: data.attachId,
      objectType: data.objectType,
      isApply: data.agree,
    });
    utils.showLoadingFullApp({show: false});
    if (res.status === 200) {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: 'Ký thành công',
        icon: 'success',
        type: 'success',
        duration: timeout,
      });
      callbackSuccess(res);
    } else {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: `Ký thất bại. Mã lỗi ${res.status}`,
        icon: 'danger',
        type: 'danger',
        duration: timeout,
      });
      utils.log('signSimCaFile -> Error', res?.message);
    }
  };

  const signSimCaFile = async (
    data: TypePayLoadSignFile,
    callbackSuccess: (
      callbackData: TypeRespondSuccess<RespondSignFile>,
    ) => void,
  ) => {
    utils.showLoadingFullApp({show: true});
    const res = await APIs.signSimCa_Credit({
      attachId: data.attachId,
      objectType: data.objectType,
      isApply: data.agree,
    });
    utils.showLoadingFullApp({show: false});
    if (res.status === 200) {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: 'Ký thành công',
        icon: 'success',
        type: 'success',
        duration: timeout,
      });
      callbackSuccess(res);
    } else {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: `Ký thất bại. Mã lỗi ${res.status}`,
        icon: 'danger',
        type: 'danger',
        duration: timeout,
      });
      utils.log('signSimCaFile -> Error', res?.message);
    }
  };
  return {
    signNormalFile,
    signCaCloudFile,
    signSimCaFile,
  };
};

export default signFileHandlerCredit;
