import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppNavigator from './AppNavigator';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPassword from '../screens/ForgotPassword';
import {NavigationContainer} from '@react-navigation/native';
const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="signin" component={SignInScreen} />
        <Stack.Screen name="signup" component={SignUpScreen} />
        <Stack.Screen name="forgotpassword" component={ForgotPassword} />
        <Stack.Screen name="Main" component={AppNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
