/* eslint-disable @typescript-eslint/no-unused-vars */
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';

// This is example hook, you can copy for fast config
const useExample = () => {
  const {} = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  return {
    // declare value below
    // declare function below
  };
};

export default useExample;
