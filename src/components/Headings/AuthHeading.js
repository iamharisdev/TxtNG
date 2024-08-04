import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, family, size, WP} from '../../shared/exporter';

export const AuthHeading = ({title, width}) => {
  return (
    <View style={[styles.container, {width: width}]}>
      <Text style={styles.textStyle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: WP('2'),
  },
  textStyle: {
    color: colors.b2,
    fontSize: size.h1,
    fontFamily: family.Gilroy_Bold,
  },
});
