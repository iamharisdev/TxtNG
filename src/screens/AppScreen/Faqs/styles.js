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

  cardContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  titleStyle: {
    fontSize: size.normal,
    fontFamily: family.Montserrat_Regular,
  },
  containerStyle: {
    padding: 0,
    paddingVertical: 20,
  },
  subText: {
    fontSize: size.tiny,
    fontFamily: family.Montserrat_Regular,
    lineHeight: 21,
  },
  flex: {
    flex: 0.8,
    justifyContent: 'center',
  },
  recordNotFound: {alignSelf: 'center', color: colors.black},
});

export default styles;
