import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Contacts from '../../screens/App/ContactTab/Contacts';

const Stack = createStackNavigator();

function ContactStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="Contacts"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Contacts" component={Contacts} />
    </Stack.Navigator>
  );
}

export default ContactStack;
