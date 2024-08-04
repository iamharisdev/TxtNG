import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {Icon} from '@rneui/themed';
import {Swipeable} from 'react-native-gesture-handler';
import {appIcons, family, size, WP} from '../../../shared/exporter';

export const PayMethodCards = ({
  title,
  icon,
  subtitle,
  checked,
  setChecked,
  swipeable,
  onPressCardEdit,
  onPressDel,
}) => {
  const {colors} = useTheme();
  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <View style={[styles.rightSwipeCon, {backgroundColor: colors?.bl4}]}>
        <TouchableOpacity activeOpacity={0.7} onPress={onPressCardEdit}>
          <Animated.Image
            source={appIcons.edit1}
            style={[
              styles.delImageStyle,
              {tintColor: colors.white, transform: [{scale}]},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={onPressDel}>
          <Animated.Image
            source={appIcons.del}
            style={[
              styles.delImageStyle,
              {tintColor: colors.r1, transform: [{scale}]},
            ]}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <Swipeable enabled={swipeable} renderRightActions={renderRightActions}>
      <TouchableOpacity
        onPress={setChecked}
        style={[
          styles.container,
          {borderColor: colors?.g27, backgroundColor: colors?.app_color},
        ]}>
        <View style={styles.leftCon}>
          <Image source={icon} style={styles.iconStyle} />
        </View>
        <View style={styles.centerCon}>
          <Text style={[styles.title, {color: colors.b1}]}>{title}</Text>
          <Text style={[styles.subtitle, {color: colors.g35}]}>{subtitle}</Text>
        </View>
        <View style={styles.rightCon}>
          <TouchableOpacity
            onPress={setChecked}
            style={[
              styles.btnCon,
              {
                backgroundColor: checked ? colors.pur2 : colors?.app_color,
                borderColor: checked ? colors.pur2 : colors?.g28,
              },
            ]}>
            {checked && <Icon size={15} name={'check'} color={colors.white} />}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 10,
    height: 66,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 9999,
  },
  leftCon: {
    width: '12%',
    justifyContent: 'center',
    height: '100%',
  },
  iconStyle: {
    height: 20,
    width: 24,
    resizeMode: 'contain',
  },
  centerCon: {
    width: '76%',
  },
  btnCon: {
    height: 24,
    width: 24,
    borderRadius: 7,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightCon: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '12%',
  },
  rightSwipeCon: {
    height: 66,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    width: '25%',
    alignSelf: 'center',
    left: 10,
    flexDirection: 'row',
    paddingHorizontal: WP('4'),
  },
  delImageStyle: {
    height: 22,
    width: 25,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: family.Poppins_Regular,
    fontSize: size.tiny,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: size.xxtiny,
    fontFamily: family.Poppins_Regular,
  },
});
