import {useSelector} from 'react-redux';
import {RootState} from '../store';

const useNetwork = () => {
  const {isConnected, actionQueue, isQueuePaused} = useSelector(
    (state: RootState) => state.network,
  );
  // const dispatch = useDispatch();

  return {
    // declare value below
    isConnected,
    actionQueue,
    isQueuePaused,
    // declare function below
  };
};

export default useNetwork;
