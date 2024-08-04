import {FloatingAction} from 'react-native-floating-action';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {appIcons, scrHeight} from '../../shared/exporter';
import ActionButton from 'react-native-action-button';

export const FloatingMenu = ({list, onPressIcon}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={false}
        data={list}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => onPressIcon(item)}
              style={[styles.iconCon, {backgroundColor: colors?.white}]}>
              <Image
                style={[
                  styles.iconStyle,
                  {
                    tintColor: index != 4 && colors.pur2,
                  },
                ]}
                source={item?.icon}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    position: 'absolute',
    top: scrHeight / 7.5,
    right: 12,
  },
  iconCon: {
    zIndex: 1,
    margin: 10,
    height: 40,
    width: 40,
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});
