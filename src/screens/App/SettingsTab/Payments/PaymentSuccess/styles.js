import {Platform, StatusBar, StyleSheet} from 'react-native';
import {family, size, WP} from '../../../../../shared/exporter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: WP('6'),
    flex: 1,
    justifyContent: 'space-between',
  },

  imgStyle: {
    height: 160,
    width: 160,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    height: 58,
    width: 75,
    resizeMode: 'contain',
  },
  h1: {
    fontSize: size.h5,
    marginVertical: 10,
    fontFamily: family.Poppins_Medium,
    marginTop: 20,
  },
  h2: {
    fontFamily: family.Poppins_Regular,
    textAlign: 'center',
    fontSize: size.normal,
  },
});
export default styles;
