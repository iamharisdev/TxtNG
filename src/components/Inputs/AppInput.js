import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {NeumorphBox} from '..';
import {Icon, Input} from '@rneui/themed';
import {family, scrWidth, size, spacing, WP} from '../../shared/exporter';
import {useTheme} from 'react-native-paper';

export const AppInput = ({
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
  height,
  width,
  neumorphShadowRadius,
  onPressIn,
  maxLength,
  inputColor,
}) => {
  const [showPass, setShowPass] = React.useState(secureTextEntry);
  const {colors} = useTheme();
  return (
    <View style={{zIndex: 999}}>
      {title && (
        <Text style={[styles.titleStyle, {color: colors.g3}]}>{title}</Text>
      )}
      <TouchableOpacity onPress={onPressIn} disabled={onPressIn ? false : true}>
        <NeumorphBox
          darkShadowColor={colors.input_dark_shadow}
          lightShadowColor={colors.input_light_shadow}
          bgColor={colors.inputColor}
          height={height || 45}
          shadowRadius={neumorphShadowRadius}
          width={width || scrWidth / 1.15}>
          <Input
            maxLength={maxLength}
            onPressIn={onPressIn}
            placeholder={placeholder}
            secureTextEntry={showPass}
            inputContainerStyle={[
              styles.inputContainerStyle,
              {
                borderColor: colors.inputColor,
              },
            ]}
            containerStyle={{
              paddingHorizontal: 0,
            }}
            inputStyle={[
              styles.inputStyle,
              {
                color: inputColor || placeholderTextColor || colors.g3,
                paddingLeft: 10,
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
          />
        </NeumorphBox>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    fontFamily: family.Montserrat_Medium,
    fontSize: size.normal,
    height: 45,
  },
  titleStyle: {
    fontFamily: family.Montserrat_Medium,
    fontSize: size.normal,
    marginVertical: 10,
  },
  inputContainerStyle: {
    borderRadius: 12,
    paddingHorizontal: WP('2'),
    height: 45,
  },
});
