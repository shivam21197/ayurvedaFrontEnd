import {patchCampaignEntity, postNewCampaign} from '@domain/graphQueries';
import ApiClient from '@network/ApiClient';
import {baseUrl} from '@network/Constants';
import {IEntity, Response, ICampaignRequest} from './interfaces';
import {INewCampaignRequest} from '@screens/appScreens/Distributor/DistributorScreen';

export interface IPatchCampaignEntity {
  postCampaignEntity: IEntity[];
}

export interface IPostNewCampaign {
  postCampaign: ICampaignRequest;
}

const apiClient = new ApiClient({baseUrl});

export const postCampaignEntity = async (
  campaignRequestId: string,
  entityInput: IEntity[],
): Promise<Response<IPatchCampaignEntity>> => {
  return await apiClient.post(
    patchCampaignEntity(campaignRequestId, entityInput),
    {
      'Content-Type': 'application/json',
    },
  );
};

export const postNewCampaignRequest = async (
  campaignData: INewCampaignRequest,
): Promise<Response<IPostNewCampaign>> => {
  return await apiClient.post(postNewCampaign(campaignData), {
    'Content-Type': 'application/json',
  });
};
