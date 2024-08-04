import {Platform, StatusBar, StyleSheet} from 'react-native';
import {colors, family, size, WP} from '../../../shared/exporter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: WP('5'),
    flex: 1,
  },

  recordNotFound: {alignSelf: 'center', color: colors.black},
});

export default styles;
