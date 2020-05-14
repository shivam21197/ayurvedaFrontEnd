import images from '@assets/images';
import BackgroundImage from '@components/atoms/BackgroundImage';
import ProgressBar from '@components/atoms/ProgressBar';
import {getTokenAuth} from '@domain/graphQueries';
import UserActions from '@modules/user/actions';
import RoutesNames from '@navigation/routes';
import {baseUrl, DEFAULT_API_TIMEOUT} from '@network/Constants';
import LocaleService from '@services/Locale/LocaleService';
import {theme} from '@styles/theme';
import {flashMessage} from '@utils/ErrorUtil';
import {LocalStorage, LocalStorageKeys} from '@utils/LoacalStorage';
import axios from 'axios';
import React from 'react';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

interface ISplashState {
  isLoading: boolean;
}

interface ISplashProps {
  navigation: NavigationScreenProp<NavigationState>;
  getUserAccountData: () => void;
}

class SplashScreen extends React.PureComponent<ISplashProps, ISplashState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
    const {navigation, getUserAccountData} = this.props;
    const {t} = LocaleService;

    // TODO: (shivam: 1/5/20): add on boarding screen

    // const isOnboarded: string | null = await LocalStorage.get(
    //   LocalStorageKeys.IS_ONBOARDED,
    // );

    // check if its a new user
    // if (!isOnboarded) {
    //   navigation.navigate(RoutesNames.BootstrapStack, {
    //     screen: RoutesNames.OnBoardingScreen,
    //   });
    //   return;
    // }
    // const token: string | null = await LocalStorage.get(LocalStorageKeys.TOKEN);

    // if (!token) {
    //   // If toekn is not there redirect to login.
    //   navigation.navigate(RoutesNames.BootstrapStack);
    //   return;
    // }

    // const res = await axios.request({
    //   method: 'post',
    //   baseURL: baseUrl,
    //   timeout: DEFAULT_API_TIMEOUT,
    //   headers: {
    //     'Content-type': 'application/json',
    //     Authorization: 'Bearer ' + token,
    //   },
    //   data: getTokenAuth(),
    // });
    // // check is user is authenticated with the token stored
    // const {
    //   data: {
    //     data: {getAuthConfirmation},
    //   },
    // } = res;

    // if (!getAuthConfirmation) {
    //   // if token is there but not authenticated the redirect to login screen to fetch new token
    //   flashMessage({message: t('Error.unauthenticatedUser')});
    //   navigation.navigate(RoutesNames.BootstrapStack);
    //   return;
    // }

    getUserAccountData();
    navigation.navigate(RoutesNames.AppRootStack);
    return;
  }

  render() {
    const {isLoading} = this.state;

    return (
      <BackgroundImage source={images.splashBackgroundImage}>
        <ProgressBar
          type="circle"
          barProps={{
            color: theme.colors.tomato,
            indeterminate: isLoading,
            style: {alignSelf: 'center', justifyContent: 'center'},
          }}
        />
      </BackgroundImage>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  const {getUserAccountData} = UserActions;
  return bindActionCreators(
    {
      getUserAccountData,
    },
    dispatch,
  );
};

export default connect(null, mapDispatchToProps)(SplashScreen);
