import {Platform, StyleSheet} from 'react-native';
import {family, scrHeight, size, WP} from '../../../shared/exporter';
import DeviceInfo from 'react-native-device-info';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },

  imgStyle: {
    height: 14,
    width: 14,
    resizeMode: 'contain',
    marginLeft: 5,
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
    top: DeviceInfo.hasNotch() ? '7%' : '5%',
    right: 20,
  },
  pad5: {
    paddingHorizontal: WP('5'),
  },
  profileCon: {
    height: WP('45'),
    width: WP('45'),
    marginBottom: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  profileImg: {
    height: '70%',
    width: '70%',
    resizeMode: 'cover',
    borderRadius: 200,
    marginBottom: 5,
  },
  titleStyle: {
    fontSize: size.large,
    fontFamily: family.Gilroy_SemiBold,
    textAlign: 'center',
  },
  iconStyle: {
    width: 9,
    height: 15,
    resizeMode: 'contain',
  },
  callCon: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 10,
    paddingRight: WP('20'),
  },
  simBtn: {
    height: 54,
    width: 54,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '85%',
  },
});

export default styles;
