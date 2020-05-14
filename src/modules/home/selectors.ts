import {ICampaignRequest} from '@domain/interfaces';
import {IState} from '@modules/interfaces';

const getHomeFeeds = (state: IState): ICampaignRequest[] | null => {
  const {
    home: {feeds},
  } = state;
  return feeds;
};

const getFeedsLoading = (state: IState): boolean => {
  const {
    home: {
      loading: {feeds},
    },
  } = state;

  return feeds;
};

const getFeedsError = (state: IState): string => {
  const {
    home: {
      error: {feeds},
    },
  } = state;

  return feeds;
};

const HomeSelector = {getHomeFeeds, getFeedsLoading, getFeedsError};

export default HomeSelector;
