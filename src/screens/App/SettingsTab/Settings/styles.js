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
  iconStyle: {
    height: 23,
    width: 23,
    resizeMode: 'contain',
    top: 2,
  },

  imgCon: {
    alignItems: 'center',
    bottom: 15,
  },
  textStyle: {
    fontSize: size.h5,
    fontFamily: family.Montserrat_SemiBold,
    textAlign: 'center',
    paddingVertical: 10,
  },
  statusBtnCon: {
    height: 42,
    width: WP('62'),
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  statusText: {
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_SemiBold,
    fontWeight: '600',
  },
  profileStyle: {
    height: 23,
    width: 23,
    resizeMode: 'contain',
  },
  messageStyle: {
    height: 26,
    width: 26,
    resizeMode: 'contain',
  },
  icon21: {
    height: 21,
    width: 21,
    resizeMode: 'contain',
  },
  icon19: {
    height: 19,
    width: 19,
    resizeMode: 'contain',
  },
  icon20: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});

export default styles;
