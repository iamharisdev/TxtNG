import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {NeumorphBox} from '..';
import {appIcons, family, scrWidth, size} from '../../shared/exporter';
import {useTheme} from 'react-native-paper';

export const ContactBox = ({icon, title, selected, onPress}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <NeumorphBox
        width={60}
        height={75}
        alignItems={'center'}
        shadowRadius={12}
        justifyContent={'center'}>
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
              styles.icon22,
              {tintColor: selected == title ? colors.pur2 : colors.g11},
            ]}
          />
        </NeumorphBox>
        <Text
          style={[
            styles.h1,
            {color: selected == title ? colors.pur2 : colors.g3},
          ]}>
          {title}
        </Text>
      </NeumorphBox>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontFamily: family.Montserrat_SemiBold,
    fontSize: size.xxxtiny,
  },
  icon22: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
  },
});
