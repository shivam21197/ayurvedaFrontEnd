import {
  nearestDonationCampaign,
  patchCampaignDonation,
} from '@domain/graphQueries';
import ApiClient from '@network/ApiClient';
import {baseUrl} from '@network/Constants';
import {ICampaignRequest, IEntity, IEntityAmount, Response} from './interfaces';

interface IGetNearestDonationCampaign {
  getNearestDonationCampaign: ICampaignRequest[];
}

interface IPostCampaignDonation {
  postCampaignDonation: {
    entities: IEntity[];
  };
}

const apiClient = new ApiClient({baseUrl});

export const fetchNearestDonationCampaign = async (
  location: string,
  distance: number,
): Promise<Response<IGetNearestDonationCampaign>> => {
  return await apiClient.post(nearestDonationCampaign(location, distance), {
    'Content-Type': 'application/json',
  });
};

export const postDonation = async (
  campaignRequestId: string,
  entityAmount: IEntityAmount,
): Promise<Response<IPostCampaignDonation>> => {
  return await apiClient.post(
    patchCampaignDonation(campaignRequestId, entityAmount),
    {
      'Content-Type': 'application/json',
    },
  );
};
