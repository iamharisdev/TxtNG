import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../../screens/AuthScreens/Login';
import ForgotPassword from '../../screens/AuthScreens/ForgotPassword';
import ResetPassword from '../../screens/AuthScreens/ResetPassword';
import VerifyOtp from '../../screens/AuthScreens/VerifyOtp';
import VerifyPhone from '../../screens/AuthScreens/VerifyPhone';
import ChooseLanguage from '../../screens/AuthScreens/ChooseLanguage';
import Register from '../../screens/AuthScreens/Register';
import Terms from '../../screens/AppScreen/Terms';

const Stack = createStackNavigator();

function AuthStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Register"
        component={Register}
        initialParams={{item: {}}}
      />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtp} />
      <Stack.Screen name="VerifyPhone" component={VerifyPhone} />
      <Stack.Screen name="ChooseLanguage" component={ChooseLanguage} />
    </Stack.Navigator>
  );
}

export default AuthStack;
