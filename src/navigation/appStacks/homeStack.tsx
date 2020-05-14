import {defaultScreenStyle} from '@navigation/constant';
import RoutesNames from '@navigation/routes';
import {createStackNavigator} from '@react-navigation/stack';
import CampaignContributorScreen from '@screens/appScreens/Common/CampaignContributorScreen';
import CampaignDescriptionScreen from '@screens/appScreens/Common/CampaignDescriptionScreen';
import HomeScreen from '@screens/appScreens/Home/HomeScreen';
import React from 'react';

const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator
    initialRouteName={RoutesNames.HomeScreen}
    screenOptions={{cardStyle: defaultScreenStyle}}>
    <Stack.Screen
      name={RoutesNames.HomeScreen}
      component={HomeScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={RoutesNames.HomeCampaignDescriptionScreen}
      component={CampaignDescriptionScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={RoutesNames.HomeCampaignContributorScreen}
      component={CampaignContributorScreen}
      options={{headerShown: false}}
    />
    {/*<Stack.Screen name="Details" component={DetailsScreen}/>*/}
  </Stack.Navigator>
);

export default HomeStack;
