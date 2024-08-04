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
  itemCon: {
    width: '100%',
  },
  itemConCard: {
    width: '33.5%',
  },
  labelCon: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    borderRadius: 12,
    height: 51,
  },
  labelText: {
    fontSize: size.xsmall,
    fontFamily: family.Gilroy_Medium,
  },
});
export default styles;
