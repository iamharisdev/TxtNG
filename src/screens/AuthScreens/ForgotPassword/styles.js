import {Platform, StatusBar, StyleSheet} from 'react-native';
import {WP} from '../../../shared/exporter';

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
});

export default styles;
