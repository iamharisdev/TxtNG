import {
  FlatList,
  Image,
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
  profile_uri,
  size,
  WP,
} from '../../../shared/exporter';
import {useTheme} from 'react-native-paper';
import {Icon} from '@rneui/themed';
import moment from 'moment';
import {SmallLoader} from '../..';

export const SupportDetailCard = ({item, admin, onPress, loading}) => {
  const {colors} = useTheme();
  var check = moment(item.created_at);
  let day = check.format('D');
  let month = check.format('MMMM');
  let year = check.format('YYYY');
  let time = check.format('hh:mm a');
  let files = item?.support_images;
  return (
    <View
      style={[
        styles.container,
        {
          shadowColor: colors.shad1,
        },
      ]}>
      <View style={[commonStyles.aiRow]}>
        <View style={styles.leftCon}>
          <View style={[styles.imgCon, {backgroundColor: colors?.pur2}]}>
            {admin ? (
              <Image style={styles.adminImageStyle} source={appIcons.social} />
            ) : (
              <Image
                style={styles.imageStyle}
                source={{uri: item?.user_profile || profile_uri}}
              />
            )}
          </View>
        </View>
        <View style={styles.rightCon}>
          {!admin && (
            <Text style={[styles.h1, {color: colors.b5}]}>{item.id}</Text>
          )}
          <Text style={[styles.h2, {color: colors.b15}]}>
            {item?.user?.name}
          </Text>
          <Text style={[styles.h3, {color: colors.pur2}]}>
            {`${month} ${day}, ${year} | ${time}`}
          </Text>
        </View>
        {!admin && (
          <View style={[styles.statusCon, {backgroundColor: colors.y1}]}>
            <Text style={[styles.statusText, {color: colors.white}]}>
              {item?.status}
            </Text>
          </View>
        )}
      </View>
      <View style={[styles.descCon]}>
        <Text numberOfLines={4} style={[styles.desc, {color: colors.b1}]}>
          {item?.message}
        </Text>
      </View>
      {!admin && (
        <View style={commonStyles.aiRow}>
          {files.length != 0 && (
            <View style={[styles.fileCon, {backgroundColor: colors.g38}]}>
              <FlatList
                data={files}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                renderItem={({item, index}) => {
                  return (
                    <>
                      <View
                        style={[
                          styles.fileImgCon,
                          {backgroundColor: colors.g1},
                        ]}>
                        <Image style={[styles.fileImg]} source={{uri: item}} />
                      </View>
                      {files[files.length - 1] == item && (
                        <>
                          {!loading ? (
                            <TouchableOpacity
                              onPress={onPress}
                              style={commonStyles.aiCenter}>
                              <Icon
                                type={'antdesign'}
                                name={'download'}
                                size={15}
                                color={colors.pur2}
                              />
                            </TouchableOpacity>
                          ) : (
                            <SmallLoader loading={loading} />
                          )}
                        </>
                      )}
                    </>
                  );
                }}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: WP('4'),
    marginVertical: 10,
    borderRadius: 14,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    width: '100%',
  },
  imgCon: {
    height: 60,
    width: 60,
    resizeMode: 'contain',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageStyle: {
    height: '100%',
    width: '100%',
    borderRadius: 100,
  },
  adminImageStyle: {
    height: 45,
    width: 45,
    resizeMode: 'contain',
  },
  leftCon: {
    width: '20%',
    height: '100%',
  },
  rightCon: {
    width: '80%',
  },
  desc: {
    fontFamily: family.Gilroy_Regular,
    fontSize: size.tiny,
    lineHeight: 17,
  },
  h3: {
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_SemiBold,
    marginBottom: 5,
  },
  h2: {
    fontSize: size.large,
    fontFamily: family.Gilroy_SemiBold,
    marginBottom: 5,
  },
  h1: {
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
    marginBottom: 5,
  },
  statusCon: {
    position: 'absolute',
    right: 10,
    top: 10,
    height: 22,
    backgroundColor: 'red',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
  },
  statusText: {
    fontSize: size.tiny,
    fontFamily: family.Gilroy_Medium,
  },
  descCon: {
    paddingVertical: 10,
  },
  fileCon: {
    padding: 10,
    borderRadius: 10,
  },
  fileImgCon: {
    height: 42,
    width: 42,
    borderRadius: 8,
    margin: 5,
  },
  fileImg: {
    height: '100%',
    width: '100%',
    borderRadius: 8,
  },
});
