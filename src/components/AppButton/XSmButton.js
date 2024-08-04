import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {NeumorphBox} from '..';
import {appIcons} from '../../shared/exporter';
import {Icon} from '@rneui/themed';
import {useTheme} from 'react-native-paper';

export const XSmButton = ({onPress, icon}) => {
  const {colors} = useTheme();
  return (
    <NeumorphBox
      width={32}
      height={32}
      borderRadius={16}
      justifyContent={'center'}
      alignItems={'center'}>
      <TouchableOpacity onPress={onPress} style={styles.btnStyle}>
        <Icon size={14} name={icon} type={'antdesign'} color={colors.g11} />
      </TouchableOpacity>
    </NeumorphBox>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
});
