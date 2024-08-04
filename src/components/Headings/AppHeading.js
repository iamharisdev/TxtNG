import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {family, size} from '../../shared/exporter';

export const AppHeading = ({title}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.h1, {color: colors.b1}]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  h1: {
    fontSize: size.large,
    fontFamily: family.Poppins_SemiBold,
  },
});
