import {Platform, StyleSheet} from 'react-native';
import {scrHeight, WP} from '../../../shared/exporter';
import DeviceInfo from 'react-native-device-info';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },

  imgStyle: {
    height: 14,
    width: 14,
    resizeMode: 'contain',
    marginLeft: 5,
  },
  listStyle: {
    height: Platform.select({
      android: '87%',
      ios: DeviceInfo.hasNotch() ? '84.5%' : '82%',
    }),
  },
  imageStyle: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
  },
  imgStyle1: {
    position: 'absolute',
    height: 20,
    width: 20,
    resizeMode: 'contain',
    top: 15,
    left: 14,
  },
  rightCon: {
    position: 'absolute',
    zIndex: 1,
    top: DeviceInfo.hasNotch() ? '7.5%' : '6%',
    right: 20,
  },
  pad5: {
    paddingHorizontal: WP('5'),
    flexDirection: 'column-reverse',
  },
  sendBtnStyle: {
    height: '100%',
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
