import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, commonStyles, family, size} from '../../shared/exporter';
import {useTheme} from 'react-native-paper';

export const PaymentField = ({
  title,
  subtitle,
  fontSizeSub = size.xsmall,
  fontSize = size.xsmall,
  textColor,
  textColorSub,
  fontFamilySub,
  iconSub,
  iconStyle,
}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.h1Style,
          {color: textColor || colors.g2, fontSize: fontSize},
        ]}>
        {title}
      </Text>
      <View style={commonStyles.aiRow}>
        <Text
          style={[
            styles.subtitleStyle,
            {
              fontFamily: fontFamilySub || family.Gilroy_Bold,
              color: textColorSub || colors.g2,
              fontSize: fontSizeSub,
            },
          ]}>
          {subtitle}
        </Text>
        {iconSub && <Image style={iconStyle} source={iconSub} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  h1Style: {
    fontFamily: family.Gilroy_Regular,
    fontSize: size.xsmall,
  },
  subtitleStyle: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.xsmall,
    lineHeight: 25,
  },
});
