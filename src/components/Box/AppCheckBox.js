import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, family, size} from '../../shared/exporter';
import {Icon} from '@rneui/themed';
import {NeumorphBox} from '..';
import {useTheme} from 'react-native-paper';

export const AppCheckBox = ({h1, onPress, checked}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.checkBoxStyle}>
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <NeumorphBox
          width={35}
          height={35}
          alignItems={'center'}
          justifyContent={'center'}>
          {checked && <Icon name={'check'} color={colors.pur1} />}
        </NeumorphBox>
      </TouchableOpacity>
      <Text
        style={[
          styles.textStyle,
          {
            color: colors.b5,
          },
        ]}>
        {h1}{' '}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: size.xsmall,
    fontFamily: family.Montserrat_Medium,
    color: colors.g6,
    lineHeight: 18,
    paddingLeft: 15,
  },

  checkBoxStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
  },
});
