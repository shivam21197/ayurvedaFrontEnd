import {
  fetchNearestDonationCampaign,
  postDonation,
} from '@domain/donationRepository';
import {ICampaignRequest, IEntityAmount} from '@domain/interfaces';
import {IFluxStandardAction, IState} from '@modules/interfaces';
import {Dispatch} from 'react';
import {getUpdatedNearestCampaigns} from './utils';

const donationTypePrefix = 'campaign/';

export const donationTypes = {
  nearestcampaignsLoading: `${donationTypePrefix}NEAREST_CAMPAIGNS_LOADING`,
  nearestcampaignsSuccess: `${donationTypePrefix}NEAREST_CAMPAIGNS_SUCCESS`,
  nearestcampaignsError: `${donationTypePrefix}NEAREST_CAMPAIGNS_ERROR`,
  patchEntities: `${donationTypePrefix}PATCH_ENTITIES`,
};

const setNearestCampaignLoading = (
  loading: boolean,
): IFluxStandardAction<boolean> => {
  return {
    type: donationTypes.nearestcampaignsLoading,
    payload: loading,
  };
};

const setNearestCampaignSuccess = (
  payload: any,
): IFluxStandardAction<ICampaignRequest[]> => {
  return {
    type: donationTypes.nearestcampaignsSuccess,
    payload,
  };
};

const setNearestCampaignError = (
  error: string,
): IFluxStandardAction<undefined, undefined, string> => {
  return {
    type: donationTypes.nearestcampaignsError,
    error,
  };
};

const getNearestCampaigns = (location: string, distance: number) => async (
  dispatch: any,
) => {
  dispatch(setNearestCampaignLoading(true));
  try {
    const nearestCampaigns = await fetchNearestDonationCampaign(
      location,
      distance,
    );

    const {
      data: {
        data: {getNearestDonationCampaign},
      },
    } = nearestCampaigns;

    dispatch(setNearestCampaignSuccess(getNearestDonationCampaign));
  } catch (e) {
    // When there is no campaign
    // TODO: handle error using flash message
    dispatch(setNearestCampaignSuccess(null));
    dispatch(setNearestCampaignError(e.message));
  }
};

const updateDonatedCampaign = (
  updatedCampaignRequests: ICampaignRequest[] | null,
): IFluxStandardAction<ICampaignRequest[] | null> => {
  return {
    type: donationTypes.patchEntities,
    payload: updatedCampaignRequests,
  };
};

const patchCampaignDonation = (
  campaignRequestId: string,
  entityAmount: IEntityAmount,
) => async (dispatch: Dispatch<any>, getState: () => IState) => {
  dispatch(setNearestCampaignLoading(true));
  try {
    const campaignData = await postDonation(campaignRequestId, entityAmount);

    const {
      data: {
        data: {postCampaignDonation: entities},
      },
    } = campaignData;

    let nearestCampaigns = getState().donation.nearestCampaigns;
    nearestCampaigns = nearestCampaigns ? [...nearestCampaigns] : [];

    const updatedNearestCampaigns = getUpdatedNearestCampaigns(
      nearestCampaigns,
      campaignRequestId,
      entities.entities,
    );

    dispatch(updateDonatedCampaign(updatedNearestCampaigns));
  } catch (e) {
    // When there is no campaign
    // TODO: handle error using flash message
    dispatch(setNearestCampaignError(e.message));
  }
};

const DonationActions = {
  getNearestCampaigns,
  setNearestCampaignError,
  setNearestCampaignLoading,
  setNearestCampaignSuccess,
  updateDonatedCampaign,
  patchCampaignDonation,
};

export default DonationActions;
