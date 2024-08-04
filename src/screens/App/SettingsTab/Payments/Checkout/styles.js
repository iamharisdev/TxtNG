import {Platform, StatusBar, StyleSheet} from 'react-native';
import {family, size, WP} from '../../../../../shared/exporter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: WP('6'),
    flex: 1,
    justifyContent: 'space-between',
  },
  imgStyle: {
    height: WP('60'),
    width: WP('60'),
    resizeMode: 'contain',
  },
  h1: {
    fontSize: size.normal,
    fontFamily: family.Gilroy_SemiBold,
    marginVertical: 10,
  },
});
export default styles;
