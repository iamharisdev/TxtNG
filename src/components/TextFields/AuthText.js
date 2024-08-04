import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, family, size} from '../../shared/exporter';
import {useTheme} from 'react-native-paper';

export const AuthText = ({
  title,
  subtitle,
  fontSizeSub,
  fontSize = size.h5,
  textColor,
}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.h1Style,
          {color: textColor || colors.b2, fontSize: fontSize},
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.subtitleStyle,
          {color: colors.g6, fontSize: fontSizeSub},
        ]}>
        {subtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 10,
  },
  h1Style: {
    fontFamily: family.Montserrat_Bold,
    fontSize: size.h5,
    marginBottom: 10,
  },
  subtitleStyle: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xsmall,
    lineHeight: 25,
  },
});
