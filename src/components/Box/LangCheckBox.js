import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {CheckBox} from '@rneui/base';
import {appIcons, family, size, spacing} from '../../shared/exporter';
import {useTheme} from 'react-native-paper';

export const LangCheckBox = ({checked, onPress, title, subTitle}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <CheckBox
        containerStyle={{backgroundColor: colors.app_color, paddingLeft: 0}}
        checkedIcon={
          <Image source={appIcons.checkBox} style={styles.iconStyle} />
        }
        uncheckedIcon={
          <Image source={appIcons.UnCheckBox} style={styles.iconStyle} />
        }
        checked={checked}
        onPress={onPress}
      />
      <View style={spacing.mt2}>
        <Text style={[styles.titleStyle, {color: colors.b4}]}>{title}</Text>
        <Text
          style={[
            styles.subTitleStyle,
            {
              color: colors.g8,
            },
          ]}>
          {subTitle}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  iconStyle: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
  titleStyle: {
    fontSize: size.large,
    fontFamily: family.Montserrat_Medium,
  },
  subTitleStyle: {
    fontFamily: family.Montserrat_Medium,
    fontSize: size.tiny,
  },
});
