import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {NeumorphBox} from '..';
import {family, size, WP} from '../../shared/exporter';
import {useTheme} from 'react-native-paper';

export const AuthButton = ({icon, style, title, onPress}) => {
  const {colors} = useTheme();
  return (
    <NeumorphBox
      height={50}
      lightShadowColor={colors.input_light_shadow}
      bgColor={colors.inputColor}>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Image source={icon} style={style} />
        <Text style={[styles.textStyle, {color: colors.g3}]}>{title}</Text>
      </TouchableOpacity>
    </NeumorphBox>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: WP('4'),
    width: '100%',
  },
  iconStyle: {
    height: 23,
    width: 23,
    resizeMode: 'contain',
  },
  fbIconStyle: {
    height: 28,
    width: 28,
    resizeMode: 'contain',
  },

  textStyle: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.normal,
    paddingLeft: 10,
  },
});
