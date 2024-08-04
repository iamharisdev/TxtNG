import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {NeumorphBox} from '..';
import {appImages, family, size, spacing} from '../../shared/exporter';
import {useTheme} from 'react-native-paper';

export const AuthImageBox = ({title, icon, img, onPress, error}) => {
  const {colors} = useTheme();
  return (
    <View style={spacing.my2}>
      {title && (
        <Text style={[styles.inputStyle, {color: colors.g3}]}>{title}</Text>
      )}
      <TouchableOpacity onPress={onPress}>
        {!img ? (
          <NeumorphBox
            darkShadowColor={'rgba(0, 0, 0, 0.1)'}
            lightShadowColor={'#F2F4F7'}
            bgColor={'#F2F4F7'}
            shadowRadius={12}
            borderStyle={'dashed'}
            borderWidth={1}
            borderRadius={14}
            height={160}
            alignItems={'center'}
            justifyContent={'center'}
            shadowColor={'rgba(0, 0, 0, 0.1)'}
            borderColor={'#C5C5C5'}>
            <Image source={icon} style={styles.imgStyle} />
          </NeumorphBox>
        ) : (
          <View style={[styles.imgCon, {backgroundColor: colors.g4}]}>
            <Image style={styles.uploadImage} source={{uri: img?.path}} />
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.errorStyle}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    fontFamily: family.Montserrat_Medium,
    fontSize: size.normal,
  },
  imgStyle: {
    height: 50,
    width: 60,
    resizeMode: 'contain',
  },
  imgCon: {
    width: '100%',
    height: 160,
    borderRadius: 14,
    marginVertical: 10,
  },
  uploadImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 14,
  },
  errorStyle: {
    color: 'red',
    fontSize: size.tiny,
    paddingLeft: 8,
  },
});
