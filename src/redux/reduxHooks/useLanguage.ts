import {useDispatch, useSelector} from 'react-redux';
import {setLanguage as setLanguageSlice} from '../slices/LanguageSlice';
import {RootState} from '../store';

const useLanguage = () => {
  const {selectedLanguage} = useSelector((state: RootState) => state.language);
  const dispatch = useDispatch();

  const setLanguage = ({language}: {language: 'vi' | 'en' | 'cn'}) => {
    dispatch(setLanguageSlice({language: language}));
  };

  return {
    // declare value below
    selectedLanguage,
    // declare function below
    setLanguage,
  };
};

export default useLanguage;
