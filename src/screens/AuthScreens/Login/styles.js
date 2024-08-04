import {StyleSheet} from 'react-native';
import {family, size, WP} from '../../../shared/exporter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: WP('5'),
    flex: 1,
  },
  inputContainer: {
    paddingVertical: WP('1'),
  },
  btnContainer: {
    paddingVertical: WP('2'),
  },
  iconStyle: {
    height: 23,
    width: 23,
    resizeMode: 'contain',
  },
  fbIconStyle: {
    height: 28,
    width: 28,
    resizeMode: 'contain',
  },
  forgotStyle: {
    fontSize: size.normal,
    fontFamily: family.Gilroy_SemiBold,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});

export default styles;
