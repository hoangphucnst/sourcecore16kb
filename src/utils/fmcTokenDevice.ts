import {KEY_STORAGE} from '~/constants';
import utils from '.';
import {APIs} from '~/services/apis';

async function registerDevice() {
  try {
    const fcmToken = await utils.getStorage(KEY_STORAGE.fcmToken, '');
    const res = await APIs.registerDeviceToekn({
      fcmToken: fcmToken,
    });
    utils.log('REGISTER DEVICE FCM TOKEN', res);
  } catch (error) {}
}

async function unSubcribeDevice() {
  try {
    const fcmToken = await utils.getStorage(KEY_STORAGE.fcmToken, '');
    const res = await APIs.registerDeviceToekn({
      fcmToken: fcmToken,
      isDelete: true,
    });
    utils.log('UNSUBRIBLE DEVICE FCM TOKEN', res);
  } catch (error) {}
}

export default {
  registerDevice,
  unSubcribeDevice,
};
