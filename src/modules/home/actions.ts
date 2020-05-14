import {fetchHomeFeeds} from '@domain/homeRepository';
import {ICampaignRequest} from '@domain/interfaces';
import {IFluxStandardAction} from '@modules/interfaces';

const homeTypePrefix = 'HOME/';

export const homeTypes = {
  homeFeedLoading: `${homeTypePrefix}HOME_FEEDS_LOADING`,
  homeFeedSuccess: `${homeTypePrefix}HOME_FEEDS_SUCCESS`,
  homeFeedError: `${homeTypePrefix}HOME_FEEDS_ERROR`,
};

const setHomeFeedsLoading = (
  loading: boolean,
): IFluxStandardAction<boolean> => {
  return {
    type: homeTypes.homeFeedLoading,
    payload: loading,
  };
};

const setHomeFeedsSuccess = (
  payload: any,
): IFluxStandardAction<ICampaignRequest[]> => {
  return {
    type: homeTypes.homeFeedSuccess,
    payload,
  };
};

const setHomeFeedsError = (
  error: string,
): IFluxStandardAction<undefined, undefined, string> => {
  return {
    type: homeTypes.homeFeedError,
    error,
  };
};

const getHomeFeeds = (pageNumber: number) => async (
  dispatch: any,
): Promise<void> => {
  dispatch(setHomeFeedsLoading(true));
  try {
    const feeds: any = await fetchHomeFeeds(pageNumber);
    const {
      data: {
        data: {getCampaignRequests},
      },
    } = feeds;

    dispatch(setHomeFeedsSuccess(getCampaignRequests));
  } catch (error) {
    dispatch(setHomeFeedsError(error.message));
  }
};

const HomeActions = {
  getHomeFeeds,
};

export default HomeActions;
