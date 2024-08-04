import {StyleSheet, Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/themed';
import {appIcons, commonStyles, scrWidth, spacing} from '../../shared/exporter';
import {useTheme} from 'react-native-paper';
import {AppInput, NeumorphBox} from '..';

export const SearchInput = ({
  onChangeText,
  onPressIcon,
  rightIcon,
  inputWidth,
  value,
}) => {
  const {colors} = useTheme();

  return (
    <View style={styles.aiRow}>
      <AppInput
        neumorphShadowRadius={12}
        placeholder={'Search'}
        placeholderTextColor={colors.g1}
        value={value}
        onChangeText={onChangeText}
        leftIcon={
          <Icon
            name={'search'}
            type={'feather'}
            style={spacing.pl2}
            color={colors.g11}
          />
        }
        width={inputWidth || scrWidth / 1.4}
        height={47}
      />
      {rightIcon ? (
        <NeumorphBox
          height={47}
          width={scrWidth / 8}
          alignItems={'center'}
          shadowRadius={12}
          justifyContent={'center'}>
          <TouchableOpacity
            onPress={onPressIcon}
            style={[commonStyles.fullImg, commonStyles.aiCenter]}>
            {rightIcon}
          </TouchableOpacity>
        </NeumorphBox>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  aiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconStyle: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
});
