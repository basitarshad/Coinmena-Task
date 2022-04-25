import React from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import CalendarView from '../screens/Home';
import EventsListView from '../screens/Trade';
import {tabs} from './utils';

const Tab = createBottomTabNavigator();
const screenOptions: BottomTabNavigationOptions | any = ({route}) => ({
  tabBarStyle: {
    padding: '4%',
    height: '10%',
    borderTopWidth: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#171717',
  },
  headerShown: false,
  tabBarShowLabel: true,
  tabBarHideOnKeyboard: true,
  tabBarActiveTintColor: '#d4d4d4',
  tabBarIcon: () => null,
  tabBarLabel: ({color}) => (
    <Text style={{color:color, fontSize:20, fontWeight:'bold'}}>
      {route.name}
    </Text>
  ),
  tabBarLabelPosition: 'beside-icon',
});

const BottomTabs = () => {
  const {homeScreen, tradeScreen } = tabs;

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name={homeScreen}
        key={homeScreen}
        component={EventsListView}
      />
      <Tab.Screen
        name={tradeScreen}
        key={tradeScreen}
        component={CalendarView}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
