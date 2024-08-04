import {Platform, StatusBar, StyleSheet} from 'react-native';
import {family, size, WP} from '../../../../shared/exporter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputCon: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: WP('5'),
    paddingVertical: 10,
  },
});

export default styles;
