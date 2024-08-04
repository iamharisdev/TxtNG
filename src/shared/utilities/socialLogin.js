import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Alert, Platform} from 'react-native';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {checkConnected} from '../exporter';
import {socialLoginRequest} from '../../redux/actions';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {networkText} from './constant';

//Facebook login
export const onFacebookLogin = async (navigation, dispatch, setloading) => {
  const checkInternet = await checkConnected();
  if (checkInternet) {
    try {
      setloading(true);
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (result.grantedPermissions) {
        const token = await AccessToken.getCurrentAccessToken();
        const requestBody = {
          token: token?.accessToken,
          provider: 'facebook',
        };

        if (token) {
          dispatch(
            socialLoginRequest(
              requestBody,
              res => onSocialLoginSuccess(res, navigation, setloading),
              res => onSocialLoginFailed(res, setloading),
            ),
          );
        } else {
          setloading(false);
        }
      } else {
        setloading(false);
      }
    } catch (error) {
      console.log('ENTER: => ', error);
      setloading(false);
    }
  } else {
    Alert.alert('Error', networkText);
  }
};

//Google Login
export const onGoogleLogin = async (navigation, dispatch, setloading) => {
  const checkInternet = await checkConnected();
  if (checkInternet) {
    setloading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();

      console.log(idToken);
      if (idToken) {
        const requestBody = {
          token: idToken,
          provider: 'google',
        };

        dispatch(
          socialLoginRequest(
            requestBody,
            res => onSocialLoginSuccess(res, navigation, setloading),
            res => onSocialLoginFailed(res, setloading),
          ),
        );
      } else {
        setloading(false);
      }
      // ***********use for authentication*************
      // const googleCredential =
      //   firebase?.auth.GoogleAuthProvider.credential(idToken);
      // const res = await firebase.auth().signInWithCredential(googleCredential);
      // ***********use for authentication*************
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Error', 'Operation canceled by user');
        setloading(false);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Error', 'No User Available');
        setloading(false);
      } else {
        setloading(false);
        console.log(error);
      }
    }
  } else {
    Alert.alert('Error', networkText);
  }
};

//On Apple SignIn
export const onAppleLogin = async (navigation, dispatch, setloading) => {
  const checkInternet = await checkConnected();
  if (checkInternet) {
    try {
      setloading(true);
      // performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );
      // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        const token = appleAuthRequestResponse.identityToken;
        // console.log(token);
        const requestBody = {
          token: token,
          provider: 'apple',
        };
        dispatch(
          socialLoginRequest(
            requestBody,
            res => onSocialLoginSuccess(res, navigation, setloading),
            res => onSocialLoginFailed(res, setloading),
          ),
        );
        // user is authenticated
        console.log('USER is  Authenticated');
      } else {
        setloading(false);
        console.log('USER is  Not Authenticated');
      }
    } catch (error) {
      setloading(false);
      console.log('User Cancelled the Login Flow');
    }
  }
};

//On Social Login Success
const onSocialLoginSuccess = async (res, navigation, setloading) => {
  if (res) {
    setloading(false);
    if (res?.profile_completed) {
      navigation?.replace('App');
    } else {
      navigation?.navigate('Register', {item: res});
    }
  } else {
    Alert.alert('Error', res?.message);
  }
};
//On Social Login Failed
const onSocialLoginFailed = (res, setloading) => {
  setloading(false);
  console.log('Social Login Failed');
  Alert.alert('Error', res);
};
