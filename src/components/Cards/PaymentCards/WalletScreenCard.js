import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {family, size, WP} from '../../../shared/exporter';

export const WalletScreenCard = ({icon, title, onPress, selectedItem}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          borderColor: selectedItem == title ? colors?.pur2 : colors.g30,
        },
      ]}>
      <Image
        source={icon}
        style={[
          styles.iconStyle,
          {tintColor: selectedItem == title ? colors?.pur2 : colors.g31},
        ]}
      />
      <Text
        style={[
          styles.titleStyle,
          {color: selectedItem == title ? colors?.pur2 : colors.g31},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: WP('25'),
    height: 72,
    marginHorizontal: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  titleStyle: {
    fontFamily: family.Gilroy_SemiBold,
    fontSize: size.xsmall,
  },
});
