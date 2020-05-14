import {IFluxStandardAction} from '@modules/interfaces';
import {ICampaignRequest} from '@domain/interfaces';
import {
  postNewCampaignRequest,
  IPostNewCampaign,
} from '@domain/distributorRepository';
import {INewCampaignRequest} from '@screens/appScreens/Distributor/DistributorScreen';

const distributeTypePrefix = 'DONATION/';

const distributeActionTypes = {
  postNewCampaignLoading: distributeTypePrefix + 'POST_NEW_CAMPAIGN_LOADING',
  postNewCampaignSuccess: distributeTypePrefix + 'POST_NEW_CAMPAIGN_SUCCESS',
  postNewCampaignError: distributeTypePrefix + 'POST_NEW_CAMPAIGN_ERROR',
};

const setNewCampaignLoading = (
  payload: boolean,
): IFluxStandardAction<boolean> => {
  return {
    type: distributeActionTypes.postNewCampaignLoading,
    payload,
  };
};

const setNewCampaignSuccess = (
  payload: ICampaignRequest,
): IFluxStandardAction<ICampaignRequest> => {
  return {
    type: distributeActionTypes.postNewCampaignSuccess,
    payload,
  };
};

const setNewCampaignError = (
  error: string,
): IFluxStandardAction<undefined, undefined, string> => {
  return {
    type: distributeActionTypes.postNewCampaignError,
    error,
  };
};

const postCampaignRequest = (campaignData: INewCampaignRequest) => async (
  dispatch: any,
) => {
  dispatch(setNewCampaignLoading(true));

  try {
    const postCampaignResponse: Response<IPostNewCampaign> = await postNewCampaignRequest(
      campaignData,
    );
    const {
      data: {
        data: {postCampaign},
      },
    } = postCampaignResponse;
  } catch (e) {}
};

const DistributeAction = {
  setNewCampaignLoading,
  setNewCampaignSuccess,
  setNewCampaignError,
};

export default DistributeAction;
