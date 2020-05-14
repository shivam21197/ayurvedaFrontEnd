import GoBack from '@components/atoms/GoBack';
import CampaignContributorList from '@components/molecules/CampaignContributorList';
import {IUser} from '@domain/interfaces';
import {theme} from '@styles/theme';
import * as React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {
  NavigationRoute,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

interface ICampaignContributorRoute {
  data: IUser[];
}

interface ICampaignContributorScreenProps {
  navigation: NavigationScreenProp<NavigationState>;
  route: NavigationRoute<ICampaignContributorRoute>;
}

const CampaignContributorScreen = (props: ICampaignContributorScreenProps) => {
  const {
    route: {
      params: {data},
    },
    navigation,
  } = props;

  return (
    <SafeAreaView style={[styles.container, styles.flexOne]}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
        <View style={[styles.flexOne, styles.screenConatiner]}>
          <GoBack navigation={navigation} />
          <CampaignContributorList
            data={data}
            isHorizontal={false}
            containerStyle={styles.contributorContainer}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CampaignContributorScreen;

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
  contributorContainer: {
    marginTop: 12,
  },
});
