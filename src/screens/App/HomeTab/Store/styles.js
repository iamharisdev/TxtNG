import {Platform, StatusBar, StyleSheet} from 'react-native';
import {size, WP} from '../../../../shared/exporter';

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
  aiRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: size.xsmall,
    letterSpacing: 0.5,
    lineHeight: 21,
    marginVertical: 10,
  },
});

export default styles;
