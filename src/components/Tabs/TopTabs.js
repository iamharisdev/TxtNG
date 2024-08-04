import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {family, size, WP} from '../../shared/exporter';
import {FlatList} from 'react-native-gesture-handler';

export const TopTab = ({setSelectedTab, selectedTab, tabList}) => {
  const {colors} = useTheme();
  return (
    <View style={styles.containerTab}>
      <FlatList
        data={tabList}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSelectedTab(item);
              }}
              style={[styles.leftTab]}>
              <Text
                style={[
                  styles.tabTextStyle,
                  {
                    color: index == selectedTab?.id ? colors.pur2 : colors.g33,
                  },
                ]}>
                {item?.title}
              </Text>
              <View
                style={[
                  styles.leftTabbar,
                  {
                    borderBottomWidth: index == selectedTab?.id ? 3 : 0,
                    borderBottomColor: colors.pur2,
                  },
                ]}
              />
            </TouchableOpacity>
          );
        }}
        horizontal={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerTab: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  leftTab: {
    width: WP('33'),
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  leftTabbar: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  tabTextStyle: {
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Bold,
  },
});
