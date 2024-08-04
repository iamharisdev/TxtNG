import React from 'react';
import {StyleSheet, Text, Image, View, TouchableOpacity} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useTheme} from 'react-native-paper';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {appIcons, family, size} from '../../shared/exporter';

const ThreeDotsMenu = ({menu_list, onSelect, width, padding, block}) => {
  const colors = useTheme();

  return (
    <View>
      <Menu>
        <MenuTrigger>
          <TouchableWithoutFeedback hitSlop={styles.hitSlop}>
            <Image style={styles.dotStyle} source={appIcons.threeDots} />
          </TouchableWithoutFeedback>
        </MenuTrigger>
        <MenuOptions
          optionsContainerStyle={[
            styles.conStyle,
            {width: width || '50%', padding: padding || 5},
          ]}>
          {menu_list.map(item => {
            return (
              <MenuOption
                key={item?.id}
                style={[styles.men, {borderColor: colors?.app_color}]}
                onSelect={() => onSelect(item)}>
                {item?.title == 'Block Number' ? (
                  <Text style={[styles.textStyle, {color: colors.b1}]}>
                    {block ? 'Unblock' : 'Block'} Number
                  </Text>
                ) : (
                  <Text style={[styles.textStyle, {color: colors.b1}]}>
                    {item?.title || 'Remove'}
                  </Text>
                )}
              </MenuOption>
            );
          })}
        </MenuOptions>
      </Menu>
    </View>
  );
};
export default ThreeDotsMenu;

const styles = StyleSheet.create({
  men: {
    paddingBottom: '5%',
    paddingTop: '5%',
    paddingLeft: '5%',
    borderRadius: 15,
  },
  dotStyle: {
    height: 17,
    width: 4,
    resizeMode: 'contain',
  },
  hitSlop: {top: 30, bottom: 30, left: 30, right: 30},
  conStyle: {
    backgroundColor: '#F1F3F6',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 16,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 8,
    shadowRadius: 3.84,
    elevation: 10,
  },
  textStyle: {
    fontSize: size.xsmall,
    fontFamily: family.Montserrat_Regular,
  },
});
