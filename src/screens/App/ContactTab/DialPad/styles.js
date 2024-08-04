import {Platform, StatusBar, StyleSheet} from 'react-native';
import {family, size, WP} from '../../../../shared/exporter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: WP('5'),
    flex: 1,
    paddingVertical: 10,
  },
  inputCon: {
    flex: 1,
    justifyContent: 'space-between',
  },

  iconStyle: {
    width: 26,
    height: 23,
    resizeMode: 'contain',
  },
  inputContainerStyle: {
    paddingVertical: WP('10'),
    alignItems: 'center',
    flex: 1,
  },
  inputStyle: {
    fontFamily: family.Gilroy_Medium,
    fontSize: size.xxtitle,
    width: '80%',
    textAlign: 'center',
    marginVertical: WP('3'),
  },
  btnCon: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 10,
  },
});

export default styles;
