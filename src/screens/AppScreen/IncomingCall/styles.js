// import {Dimensions} from 'react-native';
// import {StyleSheet} from 'react-native';
// import {colors, family, size, WP} from '../../utilities';

// export default StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.lightGreen,
//   },
//   contentContainer: {
//     paddingHorizontal: WP('5'),
//     height: Dimensions.get('screen').height / 1.2,
//     justifyContent: 'space-evenly',
//   },
//   view1: {
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   imageStyle: {
//     height: 150,
//     width: 150,
//     borderRadius: 150,
//   },
//   username: {fontSize: 20, paddingTop: 30, fontWeight: '500'},
//   ringingText: {fontSize: 12, paddingVertical: 5, fontWeight: 'bold'},
//   card_container: {
//     height: '15%',
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   innerContainer: {
//     width: '100%',
//     height: '80%',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//   },
//   icon25: {height: 25, width: 25, resizeMode: 'contain'},
//   icon45: {
//     height: 25,
//     width: 25,
//     resizeMode: 'contain',
//     tintColor: colors.white,
//   },
//   btnContainer: {
//     backgroundColor: 'red',
//     borderRadius: 50,
//     padding: 20,
//   },
// });

import {Platform, StatusBar, StyleSheet} from 'react-native';
import {family, size, WP, HP} from '../../../shared/exporter';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: WP('5'),
    flex: 1,
  },
  view1: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: WP('30'),
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    borderRadius: 150,
  },
  imgCon: {
    height: 200,
    width: 200,
  },
  username: {
    fontSize: size.xxlarge,
    paddingVertical: WP('10'),
    fontFamily: family.Montserrat_SemiBold,
  },
  card_container: {
    padding: WP('4'),
    marginTop: WP('10'),
  },
  aiRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: WP('6'),
  },
  btnCon: {
    height: 80,
    width: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle1: {
    height: 100,
    width: 100,
    // left: 10,
    zIndex: 9999,
    borderRadius: 100,
  },
  imageStyle2: {
    height: 100,
    width: 100,
    left: 40,
    top: -8,
    borderRadius: 100,
  },
});

export default styles;
