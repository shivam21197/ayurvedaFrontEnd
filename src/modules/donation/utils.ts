import {ICampaignRequest, IEntity} from '@domain/interfaces';

export const getUpdatedNearestCampaigns = (
  nearestCampaigns: ICampaignRequest[] | null,
  campaignRequestId: string,
  entities: IEntity[],
): ICampaignRequest[] | null => {
  if (nearestCampaigns) {
    const toUpdateCampaignIndex:
      | number
      | undefined = nearestCampaigns.findIndex(
      (campaign: ICampaignRequest) => campaign._id === campaignRequestId,
    );
    if (toUpdateCampaignIndex >= 0) {
      nearestCampaigns[toUpdateCampaignIndex] = {
        ...nearestCampaigns[toUpdateCampaignIndex],
        entities,
      };
    }
    return nearestCampaigns;
  }
  return nearestCampaigns;
};
