import {Platform, StatusBar, StyleSheet} from 'react-native';
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
    paddingVertical: WP('15'),
  },
  h1Style: {
    textAlign: 'center',
    fontSize: size.xxxlarge,
    fontFamily: family.Montserrat_SemiBold,
  },
  h2Style: {
    textAlign: 'center',
    fontSize: size.large,
    fontFamily: family.Montserrat_Regular,
    paddingHorizontal: WP('5'),
    lineHeight: 25,
  },
  h3Style: {
    textAlign: 'center',
    fontSize: size.medium,
    fontFamily: family.Montserrat_Medium,
    padding: WP('5'),
    textDecorationLine: 'underline',
  },
  inputStyle: {
    fontFamily: family.Montserrat_SemiBold,
    fontSize: size.title,
    width: '100%',
    textAlign: 'center',
  },
  inputContainerStyle: {
    paddingVertical: WP('15'),
    alignItems: 'center',
  },
  btnStyle: {
    alignSelf: 'center',
    width: '100%',
    paddingVertical: WP('10'),
  },
  inputCon: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default styles;
