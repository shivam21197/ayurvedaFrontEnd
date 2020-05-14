import ProgressBar from '@components/atoms/ProgressBar';
import {Text} from '@components/atoms/Text';
import EntityList from '@components/molecules/EntityList';
import StatusHeader from '@components/molecules/StatusHeader';
import ThumbnailList from '@components/molecules/ThumbnailList';
import {ICampaignRequest, IEntity, IEntityAmount} from '@domain/interfaces';
import LocalService from '@services/Locale/LocaleService';
import {theme} from '@styles/theme';
import * as React from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CampaignContributorList from './CampaignContributorList';

export interface ICard extends ICampaignRequest {
  containerStyle?: StyleProp<ViewStyle>;
  cardIndex?: number;
  onCardPress?: () => void;
  onMemberViewAll?: () => void;
  onDonerViewAll?: () => void;
  isHorizontalRendering?: boolean;
  donationAmount?: number;
  onDonationPress?: (_id: string, donationAmount: IEntityAmount) => void;
}

const getTotalProgress = (
  entites: IEntity[],
): {totalavailedAmount: number; totalRequestedAmount: number} => {
  let totalavailedAmount = 0;
  let totalRequestedAmount = 0;

  entites.forEach((entity: IEntity) => {
    totalavailedAmount = totalavailedAmount + entity.availedAmount;
    totalRequestedAmount = totalRequestedAmount + entity.requestedAmount;
  });

  return {totalavailedAmount, totalRequestedAmount};
};

const Card = (props: ICard): React.ReactElement => {
  const {
    title,
    subTitle,
    status,
    entities,
    description,
    thumbnails,
    containerStyle = {},
    cardIndex,
    donerIds,
    groupMemberIds,
    creatorId,
    onCardPress,
    onMemberViewAll,
    onDonerViewAll,
    isHorizontalRendering = false,
    _id,
    donationAmount,
    onDonationPress = () => null,
  } = props;

  const displayDoners = !!(donerIds && donerIds.length > 0);
  let updatedGroupMemberIds = [creatorId];

  if (groupMemberIds) {
    updatedGroupMemberIds = [...updatedGroupMemberIds, ...groupMemberIds];
  }

  const displayTotalProgress = entities && entities.length > 0;
  let totalProgress = 0;

  if (displayTotalProgress && entities) {
    const {totalavailedAmount, totalRequestedAmount} = getTotalProgress(
      entities,
    );
    totalProgress = totalavailedAmount / totalRequestedAmount;
  }

  const onDonate = (entityAmount: IEntityAmount) =>
    onDonationPress(_id, entityAmount);

  const {t} = LocalService;

  return (
    <TouchableOpacity
      style={[
        styles.cardConatiner,
        containerStyle,
        isHorizontalRendering ? styles.HorizontalCard : {},
      ]}
      onPress={onCardPress}
      key={_id}
      activeOpacity={0.8}>
      <StatusHeader title={title} status={status} subTitle={subTitle} />
      {entities && (
        <EntityList data={entities} cardIndex={cardIndex} onDonate={onDonate} />
      )}
      {displayTotalProgress && (
        <>
          <Text
            fontSize={'small'}
            fontWeight={'regular'}
            containerStyle={styles.campaignTextConatainer}>
            {t('Common.campaignOverview')}
          </Text>
          <ProgressBar
            type={'circle'}
            barProps={{
              showsText: true,
              progress: totalProgress,
              size: 90,
              fill: 'yellow',
              style: styles.progressBar,
            }}
          />
        </>
      )}
      {thumbnails && <ThumbnailList data={thumbnails} cardIndex={cardIndex} />}
      {updatedGroupMemberIds && (
        <CampaignContributorList
          data={updatedGroupMemberIds}
          title={t('Common.members')}
          onViewAllPress={onMemberViewAll}
          campaignListkey={`${cardIndex}-${new Date().toString()}`}
        />
      )}
      {displayDoners && donerIds && (
        <CampaignContributorList
          data={donerIds}
          title={t('Common.doners')}
          onViewAllPress={onDonerViewAll}
          campaignListkey={`${cardIndex}-${new Date().toString()}`}
        />
      )}
      {description ? (
        <Text containerStyle={styles.description}>{description}</Text>
      ) : null}
      {donationAmount ? (
        <Text containerStyle={styles.description}>
          {`${t('Common.amount')} ${donationAmount}`}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardConatiner: {
    backgroundColor: theme.colors.nero,
    padding: 12,
    borderRadius: 3,
  },
  description: {
    flex: 1,
    marginTop: 12,
  },
  HorizontalCard: {
    width: theme.viewport.width - 2 * theme.layout.screenHorizontalMargin - 20,
  },
  progressBar: {
    alignSelf: 'center',
  },
  campaignTextConatainer: {
    marginTop: 20,
  },
});
