import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {NeumorphBox} from '..';
import {Icon, Input} from '@rneui/themed';
import {family, scrWidth, size, spacing, WP} from '../../shared/exporter';
import {useTheme} from 'react-native-paper';

export const GroupInput = ({
  placeholder,
  leftIcon,
  rightIcon,
  secureTextEntry,
  renderErrorMessage,
  errorMessage,
  onChangeText,
  disableFullscreenUI,
  autoCapitalize,
  touched,
  blurOnSubmit,
  onBlur,
  value,
  onSubmitEditing,
  editable,
  placeholderTextColor,
  keyboardType,
  title,
  onPressIn,
  inputColor,
  borderColor,
  subtitle,
  onPressEdit,
  titleColor,
  bgColor,
  borderRadius,
  paddingHorizontal,
}) => {
  const [showPass, setShowPass] = React.useState(secureTextEntry);
  const {colors} = useTheme();
  return (
    <View>
      {title && (
        <View style={styles.aiRow}>
          <Text style={[styles.titleStyle, {color: titleColor || colors.b1}]}>
            {title}
          </Text>
          {subtitle && (
            <Text
              onPress={onPressEdit}
              style={[styles.titleStyle, {color: colors.pur2}]}>
              {subtitle}
            </Text>
          )}
        </View>
      )}
      <TouchableOpacity style={styles.w100} onPress={onPressIn}>
        <Input
          onPressIn={onPressIn}
          placeholder={placeholder}
          secureTextEntry={showPass}
          inputContainerStyle={[
            styles.inputContainerStyle,
            {
              borderColor: colors.inputColor,
              backgroundColor: bgColor || colors?.app_color,
              paddingHorizontal: paddingHorizontal || 0,
              borderRadius: borderRadius || 12,
            },
          ]}
          containerStyle={{
            paddingHorizontal: 0,
          }}
          inputStyle={[
            styles.inputStyle,
            {
              color: inputColor || placeholderTextColor || colors.g3,
              borderColor: borderColor || colors.g34,
            },
          ]}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          leftIcon={leftIcon}
          onBlur={onBlur}
          value={value}
          disableFullscreenUI={disableFullscreenUI}
          autoCapitalize={autoCapitalize}
          blurOnSubmit={blurOnSubmit}
          editable={editable}
          errorMessage={touched && errorMessage}
          renderErrorMessage={renderErrorMessage}
          autoCompleteType={undefined}
          onSubmitEditing={onSubmitEditing}
          placeholderTextColor={placeholderTextColor}
          rightIcon={rightIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    fontFamily: family.Montserrat_Medium,
    fontSize: size.xxlarge,
    height: 55,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  titleStyle: {
    fontFamily: family.Gilroy_Medium,
    fontSize: size.normal,
  },
  inputContainerStyle: {
    borderRadius: 12,
    height: 55,
    width: '100%',
  },
  aiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  w100: {
    width: '100%',
  },
});
