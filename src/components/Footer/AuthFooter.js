import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {family, size, spacing, WP} from '../../shared/exporter';
import {useTheme} from 'react-native-paper';

export const AuthFooter = ({title, subtitle, onPress}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity style={spacing.pb3} onPress={onPress} activeOpacity={0.7}>
      <Text style={[styles.txtStyle, {color: colors.b1}]}>
        {title}{' '}
        <Text style={[styles.subTxtStyle, {color: colors.pur2}]}>
          {subtitle}
        </Text>
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  txtStyle: {
    alignSelf: 'center',
    paddingVertical: WP('4'),
    fontSize: size.normal,
    fontFamily: family.Gilroy_Regular,
  },
  subTxtStyle: {
    fontSize: size.normal,
    fontFamily: family.Gilroy_Bold,
    textDecorationLine: 'underline',
  },
});
