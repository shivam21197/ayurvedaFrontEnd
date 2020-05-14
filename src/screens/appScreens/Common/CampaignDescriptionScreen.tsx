import GoBack from '@components/atoms/GoBack';
import Card from '@components/molecules/Card';
import {ICampaignRequest, IEntityAmount, IUser} from '@domain/interfaces';
import DonationActions from '@modules/donation/actions';
import {IState} from '@modules/interfaces';
import RoutesNames from '@navigation/routes';
import {theme} from '@styles/theme';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  NavigationRoute,
  NavigationScreenProp,
  NavigationState,
  SafeAreaView,
} from 'react-navigation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getCampaignById} from './selectors';

interface IDescriptionRoute {
  _id: string;
  screenName: string;
}

interface ICampaignDescriptionProps {
  navigation: NavigationScreenProp<NavigationState, IDescriptionRoute>;
  route: NavigationRoute<IDescriptionRoute>;
  patchCampaignDonation: (_id: string, donationAmount: IEntityAmount) => void;
  campaignData: ICampaignRequest | null;
}

class CampaignDescriptionScreen extends React.PureComponent<
  ICampaignDescriptionProps,
  any
> {
  render() {
    const {campaignData} = this.props;
    if (!campaignData) {
      return null;
    }

    const {groupMemberIds, creatorId} = campaignData;

    let members = [creatorId];
    if (groupMemberIds) {
      members = [...members, ...groupMemberIds];
    }

    const onMemberViewAll = () => this.onMemberViewAll(members);

    const onDonerViewAll = () => this.onDonerViewAll(campaignData.donerIds);

    return (
      <SafeAreaView style={[styles.container, styles.flexOne]}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}>
          <View style={[styles.flexOne, styles.screenConatiner]}>
            <GoBack navigation={this.props.navigation} />
            <Card
              {...campaignData}
              containerStyle={styles.flexOne}
              onDonationPress={this.onDonation}
              onMemberViewAll={onMemberViewAll}
              onDonerViewAll={onDonerViewAll}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  public onMemberViewAll = (members: IUser[] | undefined) => {
    const {
      navigation,
      route: {
        params: {screenName},
      },
    } = this.props;

    if (!members) {
      return;
    }

    const routeName =
      screenName === RoutesNames.HomeScreen
        ? RoutesNames.HomeCampaignContributorScreen
        : RoutesNames.DonationCampaignContributorScreen;

    navigation.navigate(routeName, {data: members});
  };

  public onDonerViewAll = (doners: IUser[] | undefined) => {
    const {
      navigation,
      route: {
        params: {screenName},
      },
    } = this.props;

    if (!doners) {
      return;
    }

    const routeName =
      screenName === RoutesNames.HomeScreen
        ? RoutesNames.HomeCampaignContributorScreen
        : RoutesNames.DonationCampaignContributorScreen;

    navigation.navigate(routeName, {data: doners});
  };

  public onDonation = (_id: string, donationAmount: IEntityAmount) => {
    const {patchCampaignDonation} = this.props;
    patchCampaignDonation(_id, donationAmount);
  };
}

const mapDispatchToProps = (dispatch: any) => {
  const {patchCampaignDonation} = DonationActions;

  return bindActionCreators({patchCampaignDonation}, dispatch);
};

const mapStateToProps = (
  state: IState,
  ownProps: ICampaignDescriptionProps,
) => {
  const {
    route: {
      params: {_id, screenName},
    },
  } = ownProps;

  return {
    campaignData: getCampaignById(state, _id, screenName),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CampaignDescriptionScreen);

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  container: {
    backgroundColor: theme.colors.nero,
    borderBottomColor: theme.colors.white,
    borderBottomWidth: theme.layout.screenBottomBorderWidth,
  },
  screenConatiner: {
    marginHorizontal: theme.layout.screenHorizontalMargin,
    marginVertical: theme.layout.screenVerticalMargin,
  },
});
