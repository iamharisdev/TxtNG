import {Icon} from '@rneui/themed';
import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {WP, size, family, platformOrientedCode} from '../../shared/exporter';
import LinearGradient from 'react-native-linear-gradient';
const AppButton = ({title, onPress, textColor, gradient_color, disabled}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity disabled={disabled} activeOpacity={0.7} onPress={onPress}>
      <LinearGradient
        start={{x: 1, y: -15}}
        end={{x: 1.3, y: 1.3}}
        style={[
          styles.buttonStyle,
          {
            shadowColor: colors.app_btn_shadow,
          },
        ]}
        colors={gradient_color || colors.input_linear_gradient}>
        <Text style={styles.buttonTextStyle(textColor)}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 60,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    // backgroundColor: 'red',
  },
  buttonTextStyle: textColor => {
    return {
      color: textColor,
      fontSize: size.normal,
      fontFamily: family.Montserrat_Bold,
    };
  },
});

export {AppButton};
