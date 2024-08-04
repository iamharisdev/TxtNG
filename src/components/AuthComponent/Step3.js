import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {
  appIcons,
  appImages,
  commonStyles,
  family,
  size,
  spacing,
  WP,
} from '../../shared/exporter';
import {useTheme} from 'react-native-paper';
import {AppButton} from '..';

export const Step3 = ({onNext, onPress, selfiePic}) => {
  const {colors} = useTheme();
  return (
    <View>
      <Text
        style={[
          styles.h1Style,
          {
            color: colors.b1,
          },
        ]}>
        Prepare to scan your face
      </Text>
      <Text
        style={[
          styles.h2Style,
          {
            color: colors.b5,
          },
        ]}>
        Make sure you are in a well-lit room
      </Text>
      <Text
        style={[
          styles.h2Style,
          {
            color: colors.b5,
          },
        ]}>
        and hold the phone as shown in the picture
      </Text>
      <ImageBackground
        source={appIcons.loader}
        style={styles.bgImg}
        resizeMode={'contain'}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPress}
          style={[
            commonStyles.aiCenter,
            spacing.my4,
            styles.btnCon,
            {backgroundColor: colors.g12},
          ]}>
          <Image
            source={selfiePic ? {uri: selfiePic} : appImages.faceImg}
            style={[styles.imgStyle]}
          />
        </TouchableOpacity>
      </ImageBackground>
      <AppButton onPress={onNext} textColor={colors.white} title={'Next'} />
    </View>
  );
};

const styles = StyleSheet.create({
  h1Style: {
    fontSize: size.xxlarge,
    fontFamily: family.Montserrat_Bold,
    textAlign: 'center',
    marginVertical: 10,
  },
  h2Style: {
    fontSize: size.xsmall,
    fontFamily: family.Montserrat_Light,
    textAlign: 'center',
  },
  imgStyle: {
    height: WP('65'),
    width: WP('65'),
    resizeMode: 'cover',
    borderRadius: WP('65'),
  },
  btnCon: {
    borderRadius: WP('40'),
    height: WP('65'),
    justifyContent: 'flex-end',
  },
  bgImg: {
    height: WP('90'),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 20,
  },
});
