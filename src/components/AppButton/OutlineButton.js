import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React from 'react';
import {family, size} from '../../shared/exporter';
import {useTheme} from 'react-native-paper';

export const OutlineButton = ({leftIcon, title, onPress}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {borderColor: colors.g23, backgroundColor: colors.inputColor},
      ]}>
      {leftIcon}
      <Text numberOfLines={1} style={[styles.titleStyle, {color: colors.b1}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    width: '100%',
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  titleStyle: {
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
});
