import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {family, size} from '../../shared/exporter';
import {useTheme} from 'react-native-paper';

export const CheckoutField = ({
  title,
  subtitle,
  colorH1,
  colorH2,
  fontFamilyH1,
  fontFamilyH2,
}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.h1,
          {
            color: colorH1 || colors.b1,
            fontFamily: fontFamilyH1 || family.Gilroy_Regular,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.h1,
          {
            color: colorH2 || colors.b1,
            fontFamily: fontFamilyH2 || family.Gilroy_Regular,
          },
        ]}>
        {subtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  h1: {
    fontFamily: family.Gilroy_Regular,
    fontSize: size.xxlarge,
  },
  h2: {},
});
