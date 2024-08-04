import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {BottomTab} from '../../components';
import HomeStack from '../stacks/HomeStack';
import ContactStack from '../stacks/ContactStack';
import SettingStack from '../stacks/SettingStack';

const Tab = createBottomTabNavigator();

const MainFlow = () => {
  return (
    <Tab.Navigator
      initialRouteName={'Contacts'}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={props => {
        return <BottomTab {...props} />;
      }}>
      <Tab.Screen component={ContactStack} name={'Contacts'} />
      <Tab.Screen component={SettingStack} name={'Settings'} />
    </Tab.Navigator>
  );
};

export default MainFlow;
