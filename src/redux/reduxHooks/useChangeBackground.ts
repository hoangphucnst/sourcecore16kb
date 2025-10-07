import {useDispatch, useSelector} from 'react-redux';
import {changeBackgroundHome} from '../slices/ThemeSlice';
import {RootState} from '../store';

const useChangeBackground = () => {
  const {backgoundHome} = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  const setBackground = (data: {id: string; image: string}) => {
    dispatch(changeBackgroundHome(data));
  };
  return {
    backgoundHome,
    setBackground,
  };
};

export default useChangeBackground;
