import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';
import {AppTheme} from '~/styles/Theme';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';
import AppText from './AppText';
import {scale} from '~/utils/scaleScreen';
import {useAppStyles} from '~/hooks';

type TypeAppButton = TouchableOpacityProps & {
  title: string;
  onPress?: () => void;
  styleButton?: ViewStyle | ViewStyle[];
  styleTitle?: TextStyle | ViewStyle[];
  colorsLinear?: (string | number)[];
  propsLiner?: LinearGradientProps;
};

const AppButton = (props: TypeAppButton) => {
  const {THEME} = useAppStyles();
  const styles = stylesWithTheme(THEME);

  const onPressButton = () => {
    if (typeof props.onPress === 'function') {
      props.onPress();
    }
  };

  if (props?.colorsLinear) {
    return (
      <TouchableOpacity onPress={onPressButton} {...props}>
        <LinearGradient
          colors={props?.colorsLinear}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0.5}}
          style={[styles.container, props.styleButton]}
          {...props?.propsLiner}>
          <AppText style={[styles.title, props.styleTitle]}>
            {props.title}
          </AppText>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPressButton}
      {...props}
      style={[styles.container, props.styleButton]}>
      <AppText style={[styles.title, props.styleTitle]}>{props.title}</AppText>
    </TouchableOpacity>
  );
};

export default AppButton;

const stylesWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: THEME.sizes.horizontal_10,
      paddingVertical: THEME.sizes.vertical_10,
      backgroundColor: THEME.colors.primary,
      borderRadius: scale(10),
      alignItems: 'center',
      borderCurve: 'continuous',
    },
    title: {
      color: THEME.colors.text.primary_button,
      fontSize: THEME.sizes.h4,
    },
  });
