import {defaultScreenStyle} from '@navigation/constant';
import RoutesNames from '@navigation/routes';
import {createStackNavigator} from '@react-navigation/stack';
import CampaignContributorScreen from '@screens/appScreens/Common/CampaignContributorScreen';
import CampaignDescriptionScreen from '@screens/appScreens/Common/CampaignDescriptionScreen';
import DonationScreen from '@screens/appScreens/Donate/DonationScreen';
import React from 'react';

const Stack = createStackNavigator();

const DonationStack = () => (
  <Stack.Navigator
    initialRouteName={RoutesNames.DonationScreen}
    screenOptions={{cardStyle: defaultScreenStyle}}>
    <Stack.Screen
      name={RoutesNames.DonationScreen}
      component={DonationScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={RoutesNames.DonationCampaignDescriptionScreen}
      component={CampaignDescriptionScreen}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name={RoutesNames.DonationCampaignContributorScreen}
      component={CampaignContributorScreen}
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

export default DonationStack;
