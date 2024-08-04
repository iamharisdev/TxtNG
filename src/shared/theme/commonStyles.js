import {StyleSheet, Dimensions} from 'react-native';
import {WP, size, family, colors} from '../../../shared/exporter';

export const commonStyles = StyleSheet.create({
  aiCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  fullImg: {
    height: '100%',
    width: '100%',
  },
  bgOverlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  h20: {
    height: '20%',
  },
  h15: {
    height: '15%',
  },
});
