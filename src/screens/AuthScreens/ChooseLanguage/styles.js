import {Platform, StatusBar, StyleSheet} from 'react-native';
import {family, size, WP} from '../../../shared/exporter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: WP('5'),
    flex: 1,
    justifyContent: 'space-between',
  },
  inputContainer: {
    paddingVertical: WP('4'),
  },
  h1Style: {
    fontSize: size.xxxlarge,
    fontFamily: family.Montserrat_SemiBold,
  },
  divider: color => {
    return {
      marginVertical: 20,
      backgroundColor: color,
    };
  },
  btnStyle: {
    alignSelf: 'center',
    width: '100%',
    paddingVertical: WP('5'),
  },
});

export default styles;
