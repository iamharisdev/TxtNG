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
  inputContainer: {
    paddingHorizontal: WP('5'),
    flex: 0.99,
  },
});

export default styles;
