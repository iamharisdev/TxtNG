import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Text,
} from 'react-native';
import {useTheme} from 'react-native-paper';

export const SmallLoader = ({loading, height, width = '80%', color, size}) => {
  const {colors} = useTheme();
  return (
    <ActivityIndicator
      size={size || 'large'}
      color={color || colors.pur2}
      animating
    />
  );
};
