import ApiClient from '@network/ApiClient';
import {baseUrl} from '@network/Constants';
import {getHomeCampaignRequests} from './graphQueries';
import {ICampaignRequest, Response} from './interfaces';

const apiClient = new ApiClient({baseUrl});

interface IGetCampaignRequestsResponse {
  getCampaignRequests: ICampaignRequest[];
}

export const fetchHomeFeeds = async (
  pageNumber: number,
): Promise<Response<IGetCampaignRequestsResponse>> => {
  return await apiClient.post(getHomeCampaignRequests(pageNumber), {
    'Content-Type': 'application/json',
  });
};
