import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Settings from '../../screens/App/SettingsTab/Settings';

const Stack = createStackNavigator();

function SettingStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

export default SettingStack;
