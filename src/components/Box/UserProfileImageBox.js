import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {NeumorphBox} from '..';
import {useTheme} from 'react-native-paper';
import {appIcons, commonStyles} from '../../shared/exporter';
import FastImage from 'react-native-fast-image';
import CountryPicker from 'react-native-country-picker-modal';

export const UserProfileImageBox = ({img, onPressEdit, icon, country}) => {
  const {colors} = useTheme();
  return (
    <NeumorphBox
      height={130}
      width={130}
      borderRadius={74}
      marginVertical={0}
      shadowRadius={3}
      shadowColor={colors.bl2}>
      <Image
        style={[commonStyles.fullImg, {borderRadius: 100}]}
        source={{uri: img, priority: FastImage.priority.normal}}
      />

      <TouchableOpacity onPress={onPressEdit} style={[styles.iconCon]}>
        <View style={styles.imgStyle}>
          <CountryPicker
            modalProps={{visible: false}}
            translation="eng"
            withFlag={true}
            withEmoji={true}
            countryCode={country?.country_cc || 'US'}
            withFilter={true}
            withAlphaFilter={true}
            visible={false}
          />
        </View>
      </TouchableOpacity>
    </NeumorphBox>
  );
};

const styles = StyleSheet.create({
  iconCon: {
    height: 30,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 3,
    right: 3,
    shadowColor: 'rgba(0, 139, 139, 0.2)',
    elevation: 10,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  imgStyle: {
    top: -5,
    zIndex: 99999,
  },
  bgPic: {
    height: 110,
    width: 85,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 5,
    left: 30,
  },
});
