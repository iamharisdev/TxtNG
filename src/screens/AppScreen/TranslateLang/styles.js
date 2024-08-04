import {Platform, StyleSheet} from 'react-native';
import {family, scrHeight, size, WP} from '../../../shared/exporter';
import DeviceInfo from 'react-native-device-info';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: WP('5'),
    alignItems: 'center',
  },
  imgStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  imgCon: {
    height: WP('55'),
    width: WP('55'),
  },
  imgCon1: {
    height: WP('60'),
    width: WP('60'),
    left: -15,
  },
  btnCon: {
    paddingVertical: 10,
    width: '100%',
  },
});

export default styles;
