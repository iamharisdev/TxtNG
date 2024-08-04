import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {family, size} from '../../shared/exporter';
import {useTheme} from 'react-native-paper';

export const DividerBox = () => {
  const {colors} = useTheme();
  return (
    <View style={styles.line1Container}>
      <View style={styles.line1Style(colors.g4)} />
      <View>
        <Text style={[styles.linetext, {color: colors.b1}]}>or</Text>
      </View>
      <View style={styles.line2Style(colors.g4)} />
    </View>
  );
};

const styles = StyleSheet.create({
  line2Style: bgColor => {
    return {
      flex: 1,
      height: 1,
      backgroundColor: bgColor,
    };
  },
  line1Container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  linetext: {
    width: 30,
    textAlign: 'center',
    fontSize: size.tiny,
    fontFamily: family.Montserrat_Bold,
  },
  line1Style: bgColor => {
    return {
      flex: 1,
      height: 1,
      backgroundColor: bgColor,
    };
  },
});
