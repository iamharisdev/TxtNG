import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useTheme} from 'react-native-paper';
import {family, size} from '../../../shared/exporter';

export const BlankField = ({title, btnText, showBtn, onPress}) => {
  const {colors} = useTheme();
  return (
    <View style={style.textContainer}>
      <Text style={[style.h1, {color: colors.pur2}]}>{title} </Text>
      {showBtn && (
        <TouchableOpacity onPress={onPress} style={style.btnConatiner}>
          <Text style={style.btnText}>{btnText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  btnConatiner: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 30,
  },
  btnText: {
    fontSize: 18,
  },
  h1: {
    fontSize: size.h5,
    fontFamily: family.Gilroy_Bold,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 20,
  },
});
