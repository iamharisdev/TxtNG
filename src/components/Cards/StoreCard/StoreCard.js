import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {appIcons, family, scrWidth, size} from '../../../shared/exporter';
import {useTheme} from 'react-native-paper';
import {NeumorphBox} from '../..';

export const StoreCard = ({icon, title, selected, onPress, key}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      style={[styles.btnCon]}
      onPress={onPress}
      key={key}
      activeOpacity={0.7}>
      <NeumorphBox
        width={100}
        height={100}
        alignItems={'center'}
        shadowRadius={5}
        justifyContent={'center'}
        darkShadowColor={
          selected == title ? colors.input_dark_shadow : colors.app_color
        }
        lightShadowColor={selected == title ? colors.white : colors.app_color}
        borderRadius={12}
        borderWidth={selected == title ? 0 : 1}
        borderColor={selected == title ? colors.app_color : colors.g13}>
        <NeumorphBox
          inner={selected == title ? false : true}
          width={36}
          height={36}
          shadowRadius={12}
          alignItems={'center'}
          justifyContent={'center'}
          elevation={selected == title ? 10 : 0}
          lightShadowColor={colors.app_color}
          darkShadowColor={
            selected == title ? colors.input_dark_shadow : colors.app_color
          }
          shadowOffset={
            selected == title
              ? {height: -20, width: 0}
              : {
                  height: 0,
                  width: 0,
                }
          }
          borderRadius={18}
          borderWidth={selected == title ? 0 : 1}
          borderColor={selected == title ? colors.app_color : colors.g13}>
          <Image
            source={icon}
            style={[
              styles.icon18,
              {tintColor: selected == title ? colors.pur2 : colors.g21},
            ]}
          />
        </NeumorphBox>
        <Text
          style={[
            styles.h1,
            {
              color: selected == title ? colors.pur2 : colors.g11,
              fontFamily:
                selected == title
                  ? family.Montserrat_SemiBold
                  : family.Montserrat_Medium,
            },
          ]}>
          {title}
        </Text>
      </NeumorphBox>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: size.tiny,
    width: '90%',
    textAlign: 'center',
  },
  icon18: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
  btnCon: {
    margin: 10,
  },
});
