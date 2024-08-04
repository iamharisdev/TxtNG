import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {family, size} from '../../../shared/exporter';

export const PaymentRecord = ({h1, h2, h3, h4}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <View>
        <Text
          style={[
            styles.h1,
            {
              color: colors.b1,
            },
          ]}>
          {h1 || ''}
        </Text>
        <Text
          style={[
            styles.h2,
            {
              color: colors.g11,
            },
          ]}>
          {h2 || ''}
        </Text>
      </View>
      <View>
        <Text
          style={[
            styles.h1,
            {
              color: colors.gr1,
              fontSize: size.xsmall,
            },
          ]}>
          {h3 || ''}
        </Text>
        <Text
          style={[
            styles.h2,
            {
              color: colors.g11,
              textAlign: 'right',
            },
          ]}>
          {h4 || ''}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    height: 50,
    marginVertical: 5,
  },
  h1: {
    fontFamily: family.Gilroy_SemiBold,
    fontSize: size.normal,
    marginBottom: 5,
  },
  h2: {
    fontFamily: family.Gilroy_Regular,
    fontSize: size.tiny,
  },
});
