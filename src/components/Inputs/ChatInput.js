import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, family, scrWidth, size, WP} from '../../shared/exporter';
import {NeumorphBox} from '..';
import {Icon} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import {Input} from '@rneui/base';
import {useTheme} from 'react-native-paper';
import {SkypeIndicator} from 'react-native-indicators';

export const ChatInput = ({
  placeholder,
  placeholderTextColor,
  rightIcon,
  onPressIn,
  onChangeText,
  value,
  height,
  width,
  inputColor,
  onPressLeftIcon,
  onRecord,
  onStopRecord,
  onSubmitEditing,
  recording,
  time,
  loading,
}) => {
  const {colors} = useTheme();
  return (
    <>
      <View style={styles.container}>
        <LinearGradient style={[styles.startBtn]} colors={colors.dial_gradient}>
          <Icon
            onPress={onPressLeftIcon}
            size={20}
            color={colors.white}
            type={'antdesign'}
            name={'plus'}
          />
        </LinearGradient>
        <NeumorphBox
          marginTop={10}
          darkShadowColor={colors.input_dark_shadow}
          lightShadowColor={colors.input_light_shadow}
          bgColor={colors.inputColor}
          height={height || 40}
          borderRadius={12}
          alignItems={recording ? 'center' : 'flex-start'}
          justifyContent={recording ? 'center' : 'flex-start'}
          width={width || scrWidth / 1.6}>
          {recording ? (
            <Text style={[styles.timerStyle, {color: colors.b1}]}>{time}</Text>
          ) : (
            <Input
              onSubmitEditing={onSubmitEditing}
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
                  color: inputColor || colors.g3,
                  paddingHorizontal: 5,
                },
              ]}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              onChangeText={onChangeText}
              value={value}
              onPressIn={onPressIn}
              rightIcon={rightIcon}
              blurOnSubmit={false}
            />
          )}
        </NeumorphBox>

        <LinearGradient
          style={[
            styles.startBtn,
            {
              opacity: recording ? 0.5 : 1,
            },
          ]}
          colors={colors.dial_gradient}>
          {loading ? (
            <SkypeIndicator size={20} color={colors.white} />
          ) : (
            <TouchableOpacity
              onPressIn={onRecord}
              onPressOut={onStopRecord}
              activeOpacity={0.7}
              style={[styles.startBtn]}>
              <Icon
                color={colors.white}
                type={'foundation'}
                name={'microphone'}
                size={22}
              />
            </TouchableOpacity>
          )}
        </LinearGradient>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  startBtn: {
    height: 40,
    width: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    fontFamily: family.Montserrat_Medium,
    fontSize: size.normal,
    height: 40,
  },
  titleStyle: {
    fontFamily: family.Montserrat_Medium,
    fontSize: size.normal,
    marginVertical: 10,
  },
  inputContainerStyle: {
    borderRadius: 12,
    paddingHorizontal: WP('2'),
    height: 40,
  },
  timerStyle: {
    fontSize: size.large,
    fontFamily: family.Gilroy_SemiBold,
  },
});
