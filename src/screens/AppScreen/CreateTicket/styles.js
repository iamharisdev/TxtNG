import {Platform, StatusBar, StyleSheet} from 'react-native';
import {family, size, WP, HP} from '../../../shared/exporter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: WP('5'),
    flex: 1,
  },
  inputCon: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: WP('5'),
  },
  title: {
    fontFamily: family.Montserrat_Regular,
    fontSize: size.normal,
    marginBottom: 10,
  },
  inputStyle: {
    height: 180,
    textAlignVertical: 'top',
    width: '100%',
    paddingHorizontal: WP('4'),
    fontSize: size.normal,
    fontFamily: family.Gilroy_Medium,
    marginVertical: 10,
  },
  warningStyle: {
    marginHorizontal: WP(2),
    marginTop: HP(0.1),
    fontSize: size.tiny,
    color: '#FF4B55',
    marginBottom: HP(1),
  },
});

export default styles;
