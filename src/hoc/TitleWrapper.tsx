// ProcessorWrapper.tsx
import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {scale} from '~/utils/scaleScreen';

interface TitleWrapperProps {
  children: React.ReactNode;
  style: StyleProp<ViewStyle>;
  styleMasked: StyleProp<ViewStyle>;
}

const TitleWrapper = ({children, style, styleMasked}: TitleWrapperProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.column, styleMasked]} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  column: {
    height: scale(20),
    width: scale(3),
    backgroundColor: '#F55456',
  },
});

export default TitleWrapper;
