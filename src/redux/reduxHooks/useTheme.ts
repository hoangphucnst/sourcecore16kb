import {useDispatch, useSelector} from 'react-redux';
import {
  changeTheme,
  changeInfoScreen as changeInfoScreenSlice,
  InfoScreen,
} from '../slices/ThemeSlice';
import {MODE_THEME} from '~/constants';
import {RootState} from '../store';

const useTheme = () => {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const infoScreen = useSelector((state: RootState) => state.theme.infoScreen);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    const newMode =
      mode === MODE_THEME.DARK ? MODE_THEME.LIGHT : MODE_THEME.DARK;
    dispatch(changeTheme(newMode));
  };

  const changeInfoScreen = (info: InfoScreen) => {
    dispatch(changeInfoScreenSlice(info));
  };

  return {
    // ⚙️ Declare variable
    mode,
    infoScreen,

    // ⚙️ Declare function
    toggleTheme,
    changeInfoScreen,
  };
};

export default useTheme;
