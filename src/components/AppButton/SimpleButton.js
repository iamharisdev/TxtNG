import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ActivityIndicator, useTheme} from 'react-native-paper';
import {family, size} from '../../shared/exporter';

export const SimpleButton = ({
  textColor,
  bgColor,
  title,
  onPress,
  selectedItem,
  alignItems,
  justifyContent,
  fontSize,
  disabled,
  loading,
}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
          alignItems: alignItems || 'flex-start',
          justifyContent: justifyContent || 'flex-start',
          borderColor: selectedItem == title ? colors.pur2 : colors.g32,
        },
      ]}>
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text
          style={[
            styles.h1,
            {
              fontSize: fontSize || size.xsmall,
              color:
                selectedItem == title ? colors.pur2 : textColor || colors.g3,
            },
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    width: '100%',
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 12,
    marginVertical: 8,
  },
  h1: {
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_SemiBold,
  },
});
