const stacks = {
  AppRootStack: 'AppRootStack',
  BootstrapStack: 'BootstrapStack',
  AppStack: 'AppStack',
  HomeStack: 'HomeStack',
  DonationStack: 'DonationStack',
  DistributorStack: 'DistributorStack',
  AccountStack: 'AccountStack',
  SettingStack: 'SettingStack',
};

const appScreens = {
  HomeScreen: 'HomeScreen',
  DonationScreen: 'DonationScreen',
  DistributorScreen: 'DistributorScreen',
  AccountScreen: 'AccountScreen',
  SettingScreen: 'SettingScreen',
  HomeCampaignDescriptionScreen: 'HomeCampaignDescriptionScreen',
  DonationCampaignDescriptionScreen: 'DonationCampaignDescriptionScreen',
  HomeCampaignContributorScreen: 'HomeCampaignContributorScreen',
  DonationCampaignContributorScreen: 'DonationCampaignContributorScreen',
};

const bootStrapScreens = {
  SplashScreen: 'SplashScreen',
  OnBoardingScreen: 'OnBoardingScreen',
  LoginScreen: 'LoginScreen',
  SingUpScreen: 'SingUpScreen',
};

export const RoutesNames = {
  // bootstrap Routes
  ...bootStrapScreens,
  // stack Routes
  ...stacks,
  // app routes
  ...appScreens,
};

export default RoutesNames;
