import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import React, {useCallback} from 'react';
import {AppTheme} from '~/styles/Theme';
import {useAppStyles} from '~/hooks';
import {scale} from '~/utils/scaleScreen';

interface BoxViewProps {
  children: React.ReactNode;
  style: StyleProp<ViewStyle>;
}

const BoxView = ({children, style}: BoxViewProps) => {
  const {THEME} = useAppStyles();
  const styles = useCallback(styleWithTheme, [THEME])(THEME);

  return <View style={[styles.container, style]}>{children}</View>;
};

export default BoxView;

const styleWithTheme = (THEME: AppTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: THEME.colors.white,
      borderRadius: scale(10),
      borderCurve: 'continuous',
      padding: THEME.sizes.pd10,
    },
  });
