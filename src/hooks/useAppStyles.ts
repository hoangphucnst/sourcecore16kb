import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Appearance, ColorSchemeName} from 'react-native';
import {RootState} from '~/redux/store';
import {MODE_THEME} from '~/constants';
import {ThemeApp} from '~/styles/Theme';

const useAppStyles = () => {
  const {mode: userMode = MODE_THEME.LIGHT} = useSelector(
    (state: RootState) => state.theme,
  );
  const [currentMode, setCurrentMode] = useState<string>(userMode);
  const [styles, setStyles] = useState(ThemeApp[MODE_THEME.LIGHT]);

  // Helper to get the mode considering user preference and system preference
  const getThemeMode = (): string => {
    const systemColorScheme: ColorSchemeName = Appearance.getColorScheme();
    return systemColorScheme === 'dark' ? MODE_THEME.DARK : MODE_THEME.LIGHT;
  };

  useEffect(() => {
    // Update theme when user preference or system theme changes
    const updateTheme = () => {
      const themeMode = getThemeMode();
      setCurrentMode(themeMode);
      setStyles(ThemeApp[themeMode]);
    };

    // Initial update
    updateTheme();

    // Listener for system theme changes
    const subscription = Appearance.addChangeListener(updateTheme);

    return () => {
      subscription.remove();
    };
  }, [userMode]);

  return {
    dark: currentMode === MODE_THEME.DARK,
    THEME: styles,
  };
};

export default useAppStyles;
