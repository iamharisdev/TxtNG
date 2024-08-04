import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../screens/App/HomeTab/Home';

const Stack = createStackNavigator();

function HomeStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

export default HomeStack;
