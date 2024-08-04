import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {
  StatusBar,
  LogBox,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import MainNavigation from './src/navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import store, {persistor} from './src/redux/store';
import {MenuProvider} from 'react-native-popup-menu';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  facebookID,
  initialConfig,
  stripe_publishableKey,
  web_client_id,
} from './src/shared/exporter';
import {StripeProvider} from '@stripe/stripe-react-native';
import {LoginManager, Settings} from 'react-native-fbsdk-next';

// ignore warnings
LogBox.ignoreAllLogs();
LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: web_client_id,
    });
    initialConfig();
    setupFacebookSDK();
  }, []);

  //Init Facebook
  const setupFacebookSDK = () => {
    Settings.setAppID(facebookID);
    Settings.initializeSDK();
    if (Platform.OS === 'android') {
      LoginManager.setLoginBehavior('web_only');
    } else {
      LoginManager.setLoginBehavior('browser');
    }
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StripeProvider
          merchantIdentifier={'merchant.com.vs.TextNG'}
          publishableKey={stripe_publishableKey}>
          <MenuProvider>
            <MainNavigation />
          </MenuProvider>
        </StripeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
