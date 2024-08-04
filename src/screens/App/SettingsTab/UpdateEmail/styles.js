import {Platform, StatusBar, StyleSheet} from 'react-native';
import {family, size, WP} from '../../../../shared/exporter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: WP('7'),
    flex: 1,
  },

  inputContainer: {
    paddingVertical: WP('5'),
  },
  imgCon: {
    alignItems: 'center',
  },
});

export default styles;
