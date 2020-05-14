import Button from '@components/atoms/Button';
import {Text} from '@components/atoms/Text';
import Card from '@components/molecules/Card';
import CardList from '@components/organisms/CardList';
import StateAwareComponent from '@components/organisms/StateAwareComponent';
import {ICampaignRequest} from '@domain/interfaces';
import DonationActions from '@modules/donation/actions';
import DonationSelectors from '@modules/donation/selectors';
import {IState} from '@modules/interfaces';
import RoutesNames from '@navigation/routes';
import LocalService from '@services/Locale/LocaleService';
import {theme} from '@styles/theme';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
// @ts-ignore
import Slider from 'react-native-slider';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

interface IDonationScreenProps {
  navigation: NavigationScreenProp<NavigationState>;
  nearestCampaigns: ICampaignRequest[] | null;
  isNearestCampaignsLoading: boolean;
  nearestCampaignsError: string;
  getNearestCampaigns: (location: string, distance: number) => void;
}

interface IDonationState {
  distance: number;
}

class DonationScreen extends React.PureComponent<
  IDonationScreenProps,
  IDonationState
> {
  constructor(props: IDonationScreenProps) {
    super(props);
    this.state = {
      distance: 30,
    };
  }
  componentDidMount() {
    this.fetchNearestCampaigns();
  }

  public fetchNearestCampaigns = (): void => {
    const {getNearestCampaigns} = this.props;
    const {distance} = this.state;
    // TODO: fetch location dynamic, and update the backend
    getNearestCampaigns('banglore', distance);
  };

  render() {
    const {isNearestCampaignsLoading, nearestCampaignsError} = this.props;
    return (
      <SafeAreaView style={[styles.container, styles.flexOne]}>
        <StateAwareComponent
          loading={isNearestCampaignsLoading}
          error={nearestCampaignsError}
          renderComponent={this.renderScreen()}
          onErrorPress={this.fetchNearestCampaigns}
        />
      </SafeAreaView>
    );
  }

  public renderScreen = (): React.ReactNode => {
    const {t} = LocalService;
    const {nearestCampaigns} = this.props;
    const {distance} = this.state;

    return (
      <View style={[styles.screenConatiner, styles.flexOne]}>
        {nearestCampaigns ? (
          <>
            <Text fontWeight="bold" containerStyle={styles.title}>
              {t('Donate.campaignNearYou')}
            </Text>
            <CardList
              data={nearestCampaigns}
              isHorizontal={false}
              renderItem={this.renderDonationCard}
              key={`${Math.random().toString()}`}
            />
          </>
        ) : (
          <>
            <Text>{t('Donate.noCampaigns')}</Text>
            <Text containerStyle={styles.addYourCampaignText}>
              {t('Donate.addYourCampaign')}
            </Text>
            <Button title={'add Campaign'} onPress={this.onAddCampaign} />
          </>
        )}
        <View style={styles.sliderHeading}>
          <Text>{t('Donate.areaRange')}</Text>
          <Text>{distance}</Text>
        </View>
        <Slider
          value={distance}
          onValueChange={this.onSliderValueChange}
          onSlidingComplete={this.fetchNearestCampaigns}
          step={1}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor={theme.colors.orange}
          maximumTrackTintColor={theme.colors.white}
        />
      </View>
    );
  };

  public onAddCampaign = () => {
    const {navigation} = this.props;
    navigation.navigate(RoutesNames.DistributorStack);
  };

  public onSliderValueChange = (value: number) => {
    this.setState({distance: value});
  };

  public renderDonationCard = ({
    item,
    index,
  }: {
    item: ICampaignRequest;
    index: number;
  }): React.ReactElement => {
    const {
      _id,
      title,
      subTitle,
      status,
      description,
      thumbnails,
      creatorId,
      donerIds,
      groupMemberIds,
    } = item;

    const onCampaignPress = () => {
      const {navigation} = this.props;
      navigation.navigate(RoutesNames.DonationCampaignDescriptionScreen, {
        _id,
        screenName: RoutesNames.DonationScreen,
      });
    };

    return (
      <Card
        _id={_id}
        title={title}
        status={status}
        subTitle={subTitle}
        description={description}
        thumbnails={thumbnails}
        creatorId={creatorId}
        donerIds={donerIds}
        groupMemberIds={groupMemberIds}
        cardIndex={index}
        onCardPress={onCampaignPress}
        onMemberViewAll={this.onMemberViewAll}
        onDonerViewAll={this.onDonerViewAll}
      />
    );
  };
  // TODO: add nav

  public onMemberViewAll = () => {};
  public onDonerViewAll = () => {};
}

const mapStateToProps = (state: IState) => {
  const {
    getNearestCampaignsError,
    getNearestCampaignsLoading,
    getNearestCampaigns,
  } = DonationSelectors;

  return {
    nearestCampaigns: getNearestCampaigns(state),
    isNearestCampaignsLoading: getNearestCampaignsLoading(state),
    nearestCampaignsError: getNearestCampaignsError(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  const {getNearestCampaigns} = DonationActions;

  return bindActionCreators(
    {
      getNearestCampaigns,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DonationScreen);

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  container: {
    backgroundColor: theme.colors.raisinBlack,
    borderBottomColor: theme.colors.white,
    borderBottomWidth: theme.layout.screenBottomBorderWidth,
  },
  screenConatiner: {
    marginHorizontal: theme.layout.screenHorizontalMargin,
    marginVertical: theme.layout.screenVerticalMargin,
  },
  title: {
    marginBottom: 12,
  },
  sliderHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  addYourCampaignText: {
    marginVertical: 20,
  },
});
