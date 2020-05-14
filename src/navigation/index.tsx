import AppRootStack from '@navigation/appRootStack';
import BootstrapStack from '@navigation/bootstrapStack';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '@screens/bootstrapScreens/SplashScreen';
import React from 'react';
import RoutesNames from './routes';

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={RoutesNames.SplashScreen}>
        <Stack.Screen
          name={RoutesNames.SplashScreen}
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={RoutesNames.AppRootStack}
          component={AppRootStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={RoutesNames.BootstrapStack}
          component={BootstrapStack}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
