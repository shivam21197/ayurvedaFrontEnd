import {defaultScreenStyle} from '@navigation/constant';
import RoutesNames from '@navigation/routes';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import DistributorScreen from '@screens/appScreens/Distributor/DistributorScreen';

const Stack = createStackNavigator();

const DistributorStack = () => (
  <Stack.Navigator
    initialRouteName={RoutesNames.DistributorScreen}
    screenOptions={{cardStyle: defaultScreenStyle}}>
    <Stack.Screen
      name={RoutesNames.DistributorScreen}
      component={DistributorScreen}
      options={{headerShown: false}}
    />
    {/* <Stack.Screen
      name={RoutesNames.HomeCampaignDescriptionScreen}
      component={CampaignDescriptionScreen}
      options={{headerShown: false}}
    /> */}
    {/* <Stack.Screen
      name={RoutesNames.HomeCampaignContributorScreen}
      component={CampaignContributorScreen}
      options={{headerShown: false}}
    /> */}
    {/*<Stack.Screen name="Details" component={DetailsScreen}/>*/}
  </Stack.Navigator>
);

export default DistributorStack;
