import {Platform, StyleSheet} from 'react-native';
import {family, scrHeight, size, WP} from '../../../shared/exporter';
import DeviceInfo from 'react-native-device-info';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  imgStyle: {
    height: 14,
    width: 14,
    resizeMode: 'contain',
    marginLeft: 5,
  },

  imageStyle: {
    height: 35,
    width: 35,
    resizeMode: 'contain',
  },
  imgStyle1: {
    position: 'absolute',
    height: 20,
    width: 20,
    resizeMode: 'contain',
    top: 15,
    left: 14,
  },
  rightCon: {
    position: 'absolute',
    zIndex: 1,
    top: DeviceInfo.hasNotch() ? '7%' : '5%',
    right: 20,
  },
  pad5: {
    paddingHorizontal: WP('5'),
  },
  profileCon: {
    height: WP('65'),
    width: WP('65'),
    marginBottom: 20,
    borderRadius: 100,
  },
  profileImg: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 100,
  },
  titleStyle: {
    fontSize: size.large,
    fontFamily: family.Gilroy_SemiBold,
    textAlign: 'center',
  },
  iconStyle: {
    width: 9,
    height: 15,
    resizeMode: 'contain',
  },
  callCon: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 10,
  },
  simBtn: {
    height: 54,
    width: 54,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  callContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 100,
    top: 0,
    left: 0,
    right: 0,
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 40,
    color: 'black',
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginRight: 70,
    marginLeft: 70,
    marginTop: 50,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  button: {
    marginTop: 100,
  },
  localVideo: {
    flex: 1,
    width: '100%',
    height: '100%',
    bottom: -10,
  },
  remoteGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  remoteVideo: {
    marginTop: Platform.select({android: '24%', ios: '20%'}),
    width: '100%',
  },
  optionsContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionButton: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100 / 2,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
