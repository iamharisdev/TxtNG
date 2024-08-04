import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from 'react-native-paper';
import {family, size, WP} from '../../../shared/exporter';

export const WalletCard = ({item}) => {
  const {colors} = useTheme();
  return (
    <LinearGradient style={styles.container} colors={colors.blue_gradient}>
      <View>
        <Text style={[styles.h1, {color: colors?.white}]}>TextNG Wallet</Text>
        <Text style={[styles.h2, {color: colors?.white}]}>
          ${item?.balance}.00
        </Text>
        <Text style={[styles.h3, {color: colors?.white}]}>
          {item?.balance} {item?.curreny || 'USD'}T
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 215,
    borderRadius: 20,
    padding: WP('5'),
  },
  h1: {
    fontSize: size.xxlarge,
    fontFamily: family.Gilroy_SemiBold,
    marginVertical: 10,
  },
  h2: {
    fontSize: size.xxxtitle,
    fontFamily: family.Gilroy_Bold,
    marginVertical: 10,
  },
  h3: {
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
    marginVertical: 5,
  },
});
