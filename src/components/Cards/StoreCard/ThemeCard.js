import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {appIcons, family, size, WP} from '../../../shared/exporter';
import {useTheme} from 'react-native-paper';
import FastImage from 'react-native-fast-image';

export const ThemeCard = ({
  h1,
  h2,
  img,
  btnColor,
  onPress,
  h3,
  btnText,
  disabled,
  btnTextColor,
}) => {
  const {colors} = useTheme();
  return (
    <>
      <View style={styles.container}>
        <View style={styles.imageCon}>
          <FastImage
            style={[styles.imageStyle]}
            source={{uri: img, priority: FastImage.priority.high}}
          />
        </View>
        <Text style={[styles.h1, {color: colors.pur2}]}>{`$${h1}`}</Text>
        <Text style={[styles.h2, {color: colors.g3}]}>{h2}</Text>
        <TouchableOpacity
          disabled={disabled}
          onPress={onPress}
          style={[
            styles.btnCon,
            {
              backgroundColor: btnColor,
            },
          ]}>
          <Text
            style={[
              styles.btnText,
              {
                color: btnTextColor || colors.white,
              },
            ]}>
            {btnText}
          </Text>
        </TouchableOpacity>
      </View>
      {h3 ? (
        <ImageBackground
          resizeMode={'contain'}
          source={appIcons.label}
          style={styles.labelIcon}>
          <Text style={[styles.textStyle, {color: colors.white}]}>{h3}</Text>
        </ImageBackground>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: WP('80'),
    marginHorizontal: 5,
    alignItems: 'center',
  },
  btnCon: {
    height: 24,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginVertical: 3,
  },
  imageCon: {
    width: 100,
    height: WP('55'),
    marginVertical: 5,
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  btnText: {
    fontFamily: family.Gilroy_Medium,
    fontSize: size.tiny,
  },
  h1: {
    textAlign: 'center',
    fontFamily: family.Gilroy_Bold,
    fontSize: size.xxtiny,
    marginVertical: 3,
  },
  h2: {
    textAlign: 'center',
    fontFamily: family.Gilroy_Medium,
    fontSize: size.xxtiny,
    marginVertical: 3,
  },
  labelIcon: {
    position: 'absolute',
    right: Platform.select({android: 4, ios: 1}),
    top: 30,
    height: 20,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 6,
    textAlign: 'center',
    bottom: 1,
    fontWeight: '500',
  },
});
