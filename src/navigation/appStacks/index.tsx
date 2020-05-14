import Icon from '@components/atoms/Icon';
import HomeStack from '@navigation/appStacks/homeStack';
import RoutesNames from '@navigation/routes';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import LocalService from '@services/Locale/LocaleService';
import {theme} from '@styles/theme';
import React from 'react';
import AccontStack from './accountStack';
import DonationStack from './donationStack';
import SettingStack from './settingStack';
import DistributorStack from './distributerStack';

const Tab = createMaterialBottomTabNavigator();

const getTabOptions = (stackName: string) => {
  const {t} = LocalService;
  let iconName: string;
  const backgroundColor = 'orange';
  let label = '';

  switch (stackName) {
    case RoutesNames.HomeStack:
      iconName = 'home';
      label = t('Home.homeTab');
      break;
    case RoutesNames.DonationStack:
      iconName = 'donate';
      label = t('Donate.donateTab');
      break;
    case RoutesNames.DistributorStack:
      iconName = 'hands-helping';
      label = t('Distribute.distributeTab');
      break;
    case RoutesNames.AccountStack:
      iconName = 'user-tie';
      label = t('Account.userTab');
      break;
    case RoutesNames.SettingStack:
      iconName = 'cog';
      label = t('Setting.settingTab');
      break;
    default:
      iconName = 'home';
  }

  return {
    tabBarLabel: label,
    tabBarColor: backgroundColor,
    tabBarIcon: ({color}: {color: string}) => {
      return <Icon name={iconName} color={color} size={24} />;
    },
  };
};

const AppTabs = () => (
  <Tab.Navigator
    initialRouteName={RoutesNames.HomeScreen}
    shifting={true}
    activeColor={theme.colors.black}
    inactiveColor={theme.colors.white}>
    <Tab.Screen
      name={RoutesNames.HomeStack}
      component={HomeStack}
      options={getTabOptions(RoutesNames.HomeStack)}
    />
    <Tab.Screen
      name={RoutesNames.DonationStack}
      component={DonationStack}
      options={getTabOptions(RoutesNames.DonationStack)}
    />
    <Tab.Screen
      name={RoutesNames.DistributorStack}
      component={DistributorStack}
      options={getTabOptions(RoutesNames.DistributorStack)}
    />
    <Tab.Screen
      name={RoutesNames.AccountStack}
      component={AccontStack}
      options={getTabOptions(RoutesNames.AccountStack)}
    />
    <Tab.Screen
      name={RoutesNames.SettingStack}
      component={SettingStack}
      options={getTabOptions(RoutesNames.SettingStack)}
    />
  </Tab.Navigator>
);

export default AppTabs;
