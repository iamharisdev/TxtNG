import {StyleSheet, Text, View, Platform} from 'react-native';
import React from 'react';
import {Neomorph} from 'react-native-neomorph-shadows';
import {scrWidth, WP} from '../../shared/exporter';
import {useTheme} from 'react-native-paper';

export const NeumorphBox = ({
  children,
  darkShadowColor,
  lightShadowColor,
  bgColor,
  height,
  width,
  shadowColor,
  borderRadius,
  shadowRadius,
  alignItems,
  justifyContent,
  onLayout,
  key,
  borderStyle,
  borderWidth,
  borderColor,
  inner,
  elevation,
  shadowOffset,
  marginVertical,
  marginTop,
}) => {
  const {colors} = useTheme();
  return (
    <Neomorph
      key={key}
      onLayout={onLayout}
      darkShadowColor={darkShadowColor || colors.input_dark_shadow} // <- set this
      lightShadowColor={lightShadowColor || colors.input_light_shadow} // <- this
      swapShadows={true}
      useArt={true}
      inner={inner || true}
      style={styles.neumorphStyle(
        bgColor || colors.inputColor,
        height || 50,
        width || scrWidth / 1.15,
        shadowColor || 'rgba(55, 84, 170, 0.2)',
        borderRadius || 12,
        shadowRadius || 6,
        alignItems || 'flex-start',
        justifyContent || 'flex-start',
        borderStyle || 'solid',
        borderWidth || 0,
        borderColor,
        elevation || 0,
        shadowOffset,
        marginVertical || 10,
        marginTop || 0,
      )}>
      {children}
    </Neomorph>
  );
};

const styles = StyleSheet.create({
  neumorphStyle: (
    bgColor,
    height,
    width,
    shadowColor,
    borderRadius,
    shadowRadius,
    alignItems,
    justifyContent,
    borderStyle,
    borderWidth,
    borderColor,
    elevation,
    shadowOffset,
    marginVertical,
    marginTop,
  ) => {
    return {
      shadowRadius: shadowRadius,
      borderRadius: borderRadius,
      backgroundColor: bgColor,
      width: width,
      height: height,
      shadowColor: shadowColor,
      marginVertical: marginVertical,
      alignItems: alignItems,
      justifyContent: justifyContent,
      borderStyle: borderStyle,
      borderWidth: borderWidth,
      borderColor: borderColor,
      shadowOffset: shadowOffset,
      elevation: elevation,
      marginTop: marginTop,
    };
  },
});
