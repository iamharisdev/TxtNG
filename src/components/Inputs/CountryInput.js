import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import CountryPicker from 'react-native-country-picker-modal';
import {NeumorphBox} from '..';
import {Icon} from '@rneui/themed';
import {commonStyles, family, size} from '../../shared/exporter';
import {useTheme} from 'react-native-paper';

export const CountryInput = ({
  onPressCountryPicker,
  onSelect,
  cca2,
  countryPicker,
  country,
  title,
}) => {
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
          activeOpacity={0.7}
          onPress={onPressCountryPicker}
          style={styles.countryInputContainer}>
          <View style={commonStyles.aiRow}>
            <CountryPicker
              onSelect={onSelect}
              translation="eng"
              withFlag={true}
              withEmoji={true}
              countryCode={cca2}
              withFilter={true}
              withAlphaFilter={true}
              visible={countryPicker}
            />
            <Text
              style={[
                styles.textStyle,
                {
                  color: colors.g3,
                },
              ]}>
              {country?.name}
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
