import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalculatorScreen from './CalculatorScreen';
import PhotoUpload from './PhotoUpload';
import TextUpload from './TextUpload';
import Notification from './Notification';
import TabIcon from '../component/TabIcon'; 
import icons from '../constants/icons';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 1,
          height: 50,
          position: 'absolute',
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16,
        },
      }}
    >
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.notificationnavbar} 
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="PhotoUpload"
        component={PhotoUpload}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.image} 
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="TextUpload"
        component={TextUpload}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.text} 
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calculator"
        component={CalculatorScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={icons.calculator}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
