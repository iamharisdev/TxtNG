import {Platform, StatusBar, StyleSheet} from 'react-native';
import {family, size, WP} from '../../../../shared/exporter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputCon: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headingStyle: {
    fontSize: size.xxlarge,
    fontFamily: family.Gilroy_Bold,
    marginTop: 10,
  },
  paddH5: {
    paddingHorizontal: WP('5'),
  },
  headerIcon: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
  },
});

export default styles;
