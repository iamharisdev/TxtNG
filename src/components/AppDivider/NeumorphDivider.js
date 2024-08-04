import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NeumorphBox} from '..';
import {scrWidth} from '../../shared/exporter';
import {useTheme} from 'react-native-paper';

export const NeumorphDivider = ({width, height, bgColor}) => {
  const {colors} = useTheme();

  return (
    <NeumorphBox
      width={width || scrWidth / 1.15}
      height={height || 2.5}
      inner={false}
      shadowRadius={12}
      alignItems={'center'}
      justifyContent={'center'}
      elevation={10}
      bgColor={bgColor}
      lightShadowColor={colors.app_color}
      darkShadowColor={colors.input_dark_shadow}
      shadowOffset={{height: -20, width: 0}}
      borderRadius={18}
    />
  );
};
