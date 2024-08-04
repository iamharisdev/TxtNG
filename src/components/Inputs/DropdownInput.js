import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {NeumorphBox} from '..';
import {useTheme} from 'react-native-paper';
import {family, size} from '../../shared/exporter';
import {Icon} from '@rneui/themed';

export const DropdownInput = ({title, placeholder, onPress}) => {
  const {colors} = useTheme();
  return (
    <View>
      <Text
        style={[
          styles.titleStyle,
          {
            color: colors.g3,
          },
        ]}>
        {title}
      </Text>
      <NeumorphBox justifyContent={'center'}>
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.7}
          style={styles.countryInputContainer}>
          <View>
            <Text
              style={[
                styles.textStyle,
                {
                  color: colors.g3,
                },
              ]}>
              {placeholder}
            </Text>
          </View>
          <Icon
            name={'chevron-down'}
            type={'feather'}
            size={25}
            color={colors.g10}
          />
        </TouchableOpacity>
      </NeumorphBox>
    </View>
  );
};

const styles = StyleSheet.create({
  countryInputContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontSize: size.normal,
    fontFamily: family.Montserrat_Medium,
  },
  titleStyle: {
    fontFamily: family.Montserrat_Medium,
    fontSize: size.normal,
    marginBottom: 10,
  },
});
