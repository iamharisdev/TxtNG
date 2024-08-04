import {Icon} from '@rneui/themed';
import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {WP, size, family, platformOrientedCode} from '../../shared/exporter';
import LinearGradient from 'react-native-linear-gradient';
import {SkypeIndicator} from 'react-native-indicators';
const SmAppButton = ({
  title,
  onPress,
  textColor,
  gradient_color,
  fontFamily = family.Montserrat_Bold,
  fontSize = size.normal,
  loading,
  loader_color,
  shadowColor,
  width,
  height,
}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity disabled={loading} activeOpacity={0.7} onPress={onPress}>
      <LinearGradient
        start={{x: 1, y: -18}}
        end={{x: 1.3, y: 1.3}}
        style={[
          styles.buttonStyle,
          {
            shadowColor: shadowColor || colors.app_btn_shadow,
            width: width || '100%',
            height: height || 44,
          },
        ]}
        colors={gradient_color || colors.input_linear_gradient}>
        {loading ? (
          <SkypeIndicator size={20} color={loader_color || colors.white} />
        ) : (
          <Text style={styles.buttonTextStyle(textColor, fontFamily, fontSize)}>
            {title}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: '100%',
    marginVertical: 5,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 44,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    // backgroundColor: 'red',
  },
  buttonTextStyle: (textColor, fontFamily, fontsize) => {
    return {
      color: textColor,
      fontSize: fontsize,
      fontFamily: fontFamily,
    };
  },
});

export {SmAppButton};
