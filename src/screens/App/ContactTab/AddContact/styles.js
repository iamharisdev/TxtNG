import {Platform, StatusBar, StyleSheet} from 'react-native';
import {family, size, WP} from '../../../../shared/exporter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputCon: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  headingStyle: {
    fontSize: size.normal,
    fontFamily: family.Gilroy_Bold,
    paddingHorizontal: WP('5'),
  },
  paddH5: {
    paddingHorizontal: WP('5'),
  },
});

export default styles;
