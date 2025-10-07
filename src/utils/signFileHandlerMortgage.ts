import {APIs, TypeRespondSuccess} from '~/services/apis';
import utils from '.';
import {RespondSignFile} from '~/services/apis/signFileService';

export type TypePayLoadSignFile = {
  attachId: string;
  objectType: string;
};

const signFileHandlerMortgage = () => {
  const signNormalFile = async (
    data: TypePayLoadSignFile,
    callbackSuccess: (
      callbackData: TypeRespondSuccess<RespondSignFile>,
    ) => void,
  ) => {
    utils.showLoadingFullApp({show: true});
    const res = await APIs.signNormal({
      attachId: data.attachId,
      objectType: data.objectType,
    });
    utils.showLoadingFullApp({show: false});
    if (res.status === 200) {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: 'Ký thành công',
        icon: 'success',
        type: 'success',
        duration: 3000,
      });
      callbackSuccess(res);
    } else {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: res?.message || 'Ký thất bại',
        icon: 'danger',
        type: 'danger',
        duration: 3000,
      });
    }
  };

  const signCaCloudFile = async (
    data: TypePayLoadSignFile,
    callbackSuccess: (
      callbackData: TypeRespondSuccess<RespondSignFile>,
    ) => void,
  ) => {
    utils.showLoadingFullApp({show: true});
    const res = await APIs.signCaCloud({
      attachId: data.attachId,
      objectType: data.objectType,
    });
    utils.showLoadingFullApp({show: false});
    if (res.status === 200) {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: 'Ký thành công',
        icon: 'success',
        type: 'success',
        duration: 3000,
      });
      callbackSuccess(res);
    } else {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: res?.message || 'Ký thất bại',
        icon: 'danger',
        type: 'danger',
        duration: 3000,
      });
    }
  };

  const signSimCaFile = async (
    data: TypePayLoadSignFile,
    callbackSuccess: (
      callbackData: TypeRespondSuccess<RespondSignFile>,
    ) => void,
  ) => {
    utils.showLoadingFullApp({show: true});
    const res = await APIs.signSimCa({
      attachId: data.attachId,
      objectType: data.objectType,
    });
    utils.showLoadingFullApp({show: false});
    if (res.status === 200) {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: 'Ký thành công',
        icon: 'success',
        type: 'success',
        duration: 3000,
      });
      callbackSuccess(res);
    } else {
      utils.showMessageFlash({
        message: 'Thông báo',
        description: res?.message || 'Ký thất bại',
        icon: 'danger',
        type: 'danger',
        duration: 3000,
      });
    }
  };

  return {
    signCaCloudFile,
    signSimCaFile,
    signNormalFile,
  };
};

export default signFileHandlerMortgage;
