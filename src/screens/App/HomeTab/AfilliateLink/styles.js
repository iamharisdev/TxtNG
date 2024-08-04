import {Platform, StatusBar, StyleSheet} from 'react-native';
import {family, size, WP} from '../../../../shared/exporter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: WP('5'),
    flex: 1,
    paddingVertical: WP('10'),
    alignItems: 'center',
  },
  h1: {
    fontSize: size.h5,
    fontFamily: family.Gilroy_Bold,
  },
  h2: {
    fontSize: size.normal,
    fontFamily: family.Gilroy_Regular,
    textAlign: 'center',
    marginTop: 20,
    width: '90%',
    lineHeight: 21,
  },
  iconStyle: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    marginRight: 20,
  },
});

export default styles;
