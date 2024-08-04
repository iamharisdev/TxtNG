import {Platform, StatusBar, StyleSheet} from 'react-native';
import {family, HP, size, WP} from '../../../shared/exporter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: WP('5'),
    flex: 1,
  },
  inputContainer: {
    paddingVertical: WP('10'),
  },
  btnStyle: {
    alignSelf: 'center',
    width: '100%',
    paddingVertical: WP('5'),
  },
  inputCon: {
    flex: 1,
    justifyContent: 'space-between',
  },
  otpInput: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  txtStyle: {
    fontFamily: family.Montserrat_Bold,
    fontSize: size.h5,
    textAlign: 'center',
  },
  resendText: {
    fontSize: size.normal,
    fontFamily: family.Montserrat_Light,
    textAlign: 'center',
  },
  digitStyle: {
    backgroundColor: 'transparent',
  },
  timerText: {
    fontSize: size.normal,
    fontFamily: family.Gilroy_Bold,
  },
  errorStyle: {
    color: 'red',
    fontFamily: family.Gilroy_Medium,
    marginTop: 5,
    fontSize: size.tiny,
  },
});

export default styles;
