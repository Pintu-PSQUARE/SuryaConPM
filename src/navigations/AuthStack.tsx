import React from 'react';
import {routes} from '../config/Env';
import {
  ForgotPassword,
  LoginPage,
  LoginWithNumber,
  NewPassword,
  OptVerification,
  SplashPage,
} from '../pages';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name={routes.SPLASH} component={SplashPage} />
      <Stack.Screen name={routes.LOGIN} component={LoginPage} />
      <Stack.Screen name={routes.FORGOTPASSWORD} component={ForgotPassword} />
      <Stack.Screen name={routes.OTP} component={OptVerification} />
      <Stack.Screen name={routes.NEWPASSWORD} component={NewPassword} />
      <Stack.Screen name={routes.LOGINWITHNUMBER} component={LoginWithNumber} />
    </Stack.Navigator>
  );
};
