import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/themed';
import {commonStyles, family, size} from '../../shared/exporter';
import {useTheme} from 'react-native-paper';

export const ProfileButton = ({icon, title, iconStyle, onPress}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, {backgroundColor: colors.app_color}]}>
      <View style={commonStyles.aiRow}>
        {icon && <Image source={icon} style={[iconStyle]} />}
        <Text
          style={[
            styles.title,
            {
              color: colors.b10,
            },
          ]}>
          {title}
        </Text>
      </View>
      {<Icon name={'right'} type={'antdesign'} color={colors.b10} size={18} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: family.Gilroy_SemiBold,
    marginLeft: 10,
    fontSize: size.xsmall,
  },
});
