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
  listCon: {
    top: WP('38'),
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    maxHeight: 150,
    paddingBottom: 15,
    position: 'absolute',
    zIndex: 1,
  },
  btnCon: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textStyle: {
    marginLeft: 10,
    fontFamily: family.Poppins_Medium,
    fontSize: size.normal,
  },
  iconStyle: {
    height: 28,
    width: 25,
    resizeMode: 'contain',
  },
  subtitleStyle: {
    marginRight: 10,
    fontSize: size.tiny,
    fontFamily: family.Poppins_Regular,
  },
});
export default styles;
