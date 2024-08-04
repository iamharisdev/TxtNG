import {Platform, StatusBar, StyleSheet} from 'react-native';
import {family, size, WP, HP, colors} from '../../../shared/exporter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: WP('5'),
    flex: 1,
  },

  desc: {
    fontFamily: family.Montserrat_Regular,
    letterSpacing: 1,
    fontSize: size.xsmall,
    lineHeight: 21,
  },
  btnStyle: {
    alignSelf: 'center',
    width: '100%',
    paddingVertical: WP('5'),
  },
  recordNotFoundView: {
    height: HP(35),
    justifyContent: 'flex-end',
  },
  recordNotFoundText: {alignSelf: 'center', color: colors.black},
});

export default styles;
