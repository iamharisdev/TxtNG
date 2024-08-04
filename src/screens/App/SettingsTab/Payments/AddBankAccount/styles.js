import {Platform, StatusBar, StyleSheet} from 'react-native';
import {WP} from '../../../../../shared/exporter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: WP('6'),
    flex: 1,
  },
  inputCon: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
export default styles;
