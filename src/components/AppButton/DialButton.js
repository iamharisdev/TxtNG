import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {appIcons, family, size} from '../../shared/exporter';
import LinearGradient from 'react-native-linear-gradient';

export const DialButton = ({title, subtitle, bgColor, onPress}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <LinearGradient style={[styles.container]} colors={bgColor}>
        {title ? (
          <Text
            style={[
              styles.titleStyle,
              {
                color: colors.g15,
                fontSize: title == '*' ? 50 : size.xxtitle,
                top: title == '*' ? 15 : 0,
              },
            ]}>
            {title}
          </Text>
        ) : (
          <Image
            style={[
              styles.iconStyle,
              {
                tintColor: colors.white,
              },
            ]}
            source={appIcons.call}
          />
        )}

        {subtitle ? (
          <Text style={[styles.subTitleStyle, {color: colors.g15}]}>
            {subtitle}
          </Text>
        ) : null}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 81,
    width: 81,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
  },
  titleStyle: {
    fontSize: size.xxtitle,
    fontFamily: family.Gilroy_Medium,
  },
  subTitleStyle: {
    fontFamily: family.Gilroy_Regular,
    fontSize: size.xxtiny,
  },
  iconStyle: {
    height: 32,
    width: 32,
    resizeMode: 'contain',
  },
});
