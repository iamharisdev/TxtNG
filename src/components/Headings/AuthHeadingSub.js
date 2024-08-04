import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, family, size, WP} from '../../shared/exporter';

export const AuthHeadingSub = ({title, subtitle}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{title}</Text>
      <Text style={styles.subTitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: WP('2'),
    width: '100%',
  },
  textStyle: {
    color: colors.b2,
    fontSize: size.normal,
    fontFamily: family.Gilroy_Regular,
    lineHeight: 21,
  },
  subTitle: {
    color: colors.b2,
    fontFamily: family.Gilroy_Bold,
    fontSize: size.normal,
    lineHeight: 21,
  },
});
