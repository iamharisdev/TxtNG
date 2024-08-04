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
import {appIcons, commonStyles, size} from '../../shared/exporter';

export const ProfileImageBox = ({img, onPressEdit, height, width, error}) => {
  const {colors} = useTheme();
  return (
    <>
      <NeumorphBox
        height={height || 144}
        width={width || 144}
        borderRadius={74}
        shadowRadius={3}
        shadowColor={colors.bl2}>
        {img ? (
          <Image
            style={[commonStyles.fullImg, {borderRadius: 100}]}
            source={{uri: img}}
          />
        ) : (
          <Image style={styles.bgPic} source={appIcons.bgProfile} />
        )}
        {onPressEdit && (
          <TouchableOpacity
            onPress={onPressEdit}
            style={[
              styles.iconCon,
              {
                backgroundColor: colors.pur2,
                borderColor: colors.white,
              },
            ]}>
            <Image source={appIcons.pencil} style={styles.imgStyle} />
          </TouchableOpacity>
        )}
      </NeumorphBox>
      {error && (
        <Text style={[styles.errorStyle, {color: colors.r2}]}>{error}</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  iconCon: {
    height: 38,
    width: 38,
    borderRadius: 38,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 3,
    right: 3,
    borderWidth: 2,
  },
  imgStyle: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  bgPic: {
    height: 110,
    width: 85,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 5,
    left: 30,
  },
  errorStyle: {
    fontSize: size.tiny,
  },
});
