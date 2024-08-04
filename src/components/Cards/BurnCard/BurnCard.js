import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ThreeDotsMenu from '../../Menu/ThreeDotsMenu';
import {useTheme} from 'react-native-paper';
import {family, size} from '../../../shared/exporter';
import {DividerBox} from '../..';

export const BurnCard = ({title, subtitle, menu_list, onPress}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.leftCon}>
        <Text
          style={[
            styles.h1,
            {
              color: colors.b1,
            },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            styles.h2,
            {
              color: colors.g11,
            },
          ]}>
          {subtitle}
        </Text>
      </View>
      {menu_list && (
        <View>
          <ThreeDotsMenu onSelect={onPress} menu_list={menu_list} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  leftCon: {
    width: '80%',
    marginVertical: 10,
  },
  h1: {
    fontFamily: family.Gilroy_Medium,
    fontSize: size.normal,
    marginBottom: 5,
  },
  h2: {
    fontFamily: family.Gilroy_Regular,
    fontSize: size.tiny,
  },
});
