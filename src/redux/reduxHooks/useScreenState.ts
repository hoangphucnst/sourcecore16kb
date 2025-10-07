import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {setCountNoti as setCountNotiSlice} from '../slices/ScreensSlice';
import {APIs} from '~/services/apis';
import {useCallback} from 'react';
import utils from '~/utils';

const useScreenState = () => {
  const {countNoti} = useSelector((state: RootState) => state.screens);
  const dispatch = useDispatch();

  const setCountNoti = useCallback(
    ({newCountNoti}: {newCountNoti: number}) => {
      dispatch(setCountNotiSlice(newCountNoti));
    },
    [dispatch],
  );

  const refreshCountNoti = useCallback(async () => {
    try {
      const res = await APIs.getNotificationCount();

      if (res.status === 200) {
        dispatch(setCountNotiSlice(res.object));
        utils.log('✅ refreshCountNoti - Success', res.object);
      } else {
        utils.log('⚠️ refreshCountNoti - Status != 200', res.status);
      }
    } catch (error) {
      utils.log('❌ refreshCountNoti - Error', error);
    }
  }, [dispatch]);

  return {
    countNoti,
    setCountNoti,
    refreshCountNoti,
  };
};

export default useScreenState;
