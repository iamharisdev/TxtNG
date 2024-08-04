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
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  ht1: {
    fontSize: size.normal,
    fontFamily: family.Gilroy_SemiBold,
    marginVertical: 5,
  },
  ht2: {
    fontSize: size.xtitle,
    fontFamily: family.Gilroy_Bold,
  },
  ht3: {
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Medium,
    marginVertical: 5,
  },
  iconStyle: {
    width: 24,
    height: 16,
    resizeMode: 'contain',
    marginRight: 10,
  },
});
export default styles;