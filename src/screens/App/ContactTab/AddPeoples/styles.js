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
    paddingHorizontal: WP('5'),
  },
  headingStyle: {
    fontSize: size.xxlarge,
    fontFamily: family.Gilroy_Bold,
    paddingBottom: 5,
  },
  listStyle: {
    height: '65%',
  },
});

export default styles;
