import {Platform, StyleSheet} from 'react-native';
import {family, size, WP} from '../../shared/exporter';
import DeviceInfo from 'react-native-device-info';

const styles = StyleSheet.create({
  container: bgColor => {
    return {
      backgroundColor: bgColor,
      flex: 1,
    };
  },

  imgCon: {
    width: '100%',
    height: '60%',
  },

  imgStyle: {
    width: '100%',
    height: '100%',
    top: Platform.select({
      android: -20,
      ios: DeviceInfo.hasNotch() ? -20 : -10,
    }),
  },
  paginationContainer: {
    left: 16,
    right: 16,
    bottom: 20,
    position: 'absolute',
  },
  bottomRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paginationDots: {
    height: 16,
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotStyle: color => {
    return {
      width: 7,
      height: 7,
      marginRight: 11,
      borderRadius: 30,
      backgroundColor: color,
    };
  },
  activeDotStyle: color => {
    return {
      width: 30,
      height: 9,
      marginRight: 11,
      borderRadius: 30,
      backgroundColor: color,
    };
  },
  arrowButtonContaianer: color => {
    return {
      width: WP('16.7'),
      height: WP('16.7'),
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: WP('16.7'),
      backgroundColor: color,
    };
  },
  skipTextStyle: color => {
    return {
      alignSelf: 'flex-end',
      fontSize: size.xsmall,
      fontFamily: family.Montserrat_Regular,
      color: color,
    };
  },
  textCon: {
    position: 'absolute',
    right: 30,
    top: 10,
  },

  h1Style: bgColor => {
    return {
      fontSize: size.h1,
      color: bgColor,
      fontFamily: family.Montserrat_Bold,
    };
  },
  h2Style: bgColor => {
    return {
      fontSize: size.xxlarge,
      color: bgColor,
      fontFamily: family.Montserrat_Medium,
      marginTop: 10,
    };
  },
  btnStyle: {
    height: 16,
    width: 20,
    resizeMode: 'contain',
  },
  bgStyle: {
    height: '100%',
    width: '100%',
  },
  textCon2: {
    padding: WP('6'),
  },
});

export default styles;
