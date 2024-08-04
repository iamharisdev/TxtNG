import {Platform, StatusBar, StyleSheet} from 'react-native';
import {family, size, WP} from '../../../../../shared/exporter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: WP('6'),
    flex: 1,
  },
  headerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  h1: {
    fontSize: size.large,
    fontFamily: family.Gilroy_Bold,
    marginTop: 15,
  },
  headImgCon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 46,
    width: 46,
    borderRadius: 46,
    marginVertical: 10,
  },
  iconStyle: {
    height: 24,
    width: 24,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  headingStyle: {
    fontSize: size.large,
    fontFamily: family.Gilroy_SemiBold,
    fontWeight: '600',
    marginVertical: 10,
  },
  brandStyle: {
    height: 11,
    width: 33,
    resizeMode: 'contain',
    marginLeft: 5,
  },
});
export default styles;
