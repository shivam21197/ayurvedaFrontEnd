import {defaultScreenStyle} from '@navigation/constant';
import RoutesNames from '@navigation/routes';
import {createStackNavigator} from '@react-navigation/stack';
import AccountScreen from '@screens/appScreens/Account/AccountScreen';
import React from 'react';

const Stack = createStackNavigator();

const AccontStack = () => (
  <Stack.Navigator
    initialRouteName={RoutesNames.AccountScreen}
    screenOptions={{cardStyle: defaultScreenStyle}}>
    <Stack.Screen
      name={RoutesNames.AccountScreen}
      component={AccountScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={RoutesNames.SettingScreen}
      component={AccountScreen}
      options={{headerShown: false}}
    />
    {/*<Stack.Screen name="Details" component={DetailsScreen}/>*/}
  </Stack.Navigator>
);

export default AccontStack;
