import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  appIcons,
  commonStyles,
  family,
  size,
  spacing,
} from '../../../shared/exporter';
import {useTheme} from 'react-native-paper';
import {Icon} from '@rneui/themed';
export const GalleryCard = ({
  title,
  subtitle,
  onPress,
  imageArray,
  onPressImg,
}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[commonStyles.aiCenter, spacing.my4]}>
        <Image style={[styles.iconStyle]} source={appIcons.camera1} />
        <Text style={[styles.titleStyle]}>Attach images or proof</Text>
      </TouchableOpacity>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={imageArray}
        renderItem={({item, index}) => {
          return (
            <ImageBackground
              imageStyle={{borderRadius: 13}}
              style={[styles.imgCon]}
              source={{uri: item?.path}}>
              <TouchableOpacity
                style={[styles.iconCon, {backgroundColor: colors.r1}]}
                onPress={() => onPressImg(index)}>
                <Icon
                  name={'cross'}
                  type={'entypo'}
                  size={15}
                  color={colors.white}
                />
              </TouchableOpacity>
            </ImageBackground>
          );
        }}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  titleCon: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  title: {
    fontFamily: family.Gilroy_Medium,
    fontSize: size.xsmall,
  },
  subtitle: {
    fontSize: size.xxtiny,
    fontFamily: family.Gilroy_Medium,
  },
  imgCon: {
    height: 105,
    width: 105,
    margin: 5,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgStyle: {
    height: 23,
    width: 23,
    resizeMode: 'contain',
  },
  iconStyle: {
    height: 8,
    width: 8,
    resizeMode: 'contain',
  },
  iconCon: {
    height: 15,
    width: 15,
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    position: 'absolute',
    top: -4,
    right: -3,
  },
  iconStyle: {
    width: 54,
    height: 40,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  titleStyle: {
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Medium,
  },
});
