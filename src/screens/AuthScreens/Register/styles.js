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
    paddingVertical: WP('5'),
  },
});

export default styles;
