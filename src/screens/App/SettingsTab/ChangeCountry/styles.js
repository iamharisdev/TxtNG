import {Platform, StatusBar, StyleSheet} from 'react-native';
import {family, size, WP} from '../../../../shared/exporter';

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
    paddingVertical: WP('2'),
  },
  h1Style: {
    fontSize: size.xxxlarge,
    fontFamily: family.Montserrat_SemiBold,
    marginBottom: 10,
  },
  btnStyle: {
    alignSelf: 'center',
    width: '100%',
    paddingVertical: WP('5'),
  },
});

export default styles;
