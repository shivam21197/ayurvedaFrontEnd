import {ICampaignRequest} from '@domain/interfaces';
import {IFluxStandardAction} from '@modules/interfaces';
import {donationTypes} from './actions';

export interface IDonationState {
  nearestCampaigns: ICampaignRequest[] | null;
  loading: {
    nearestCampaigns: boolean;
  };
  error: {
    nearestCampaigns: string;
  };
}

const initialDonationState = {
  nearestCampaigns: null,
  loading: {
    nearestCampaigns: true,
  },
  error: {
    nearestCampaigns: '',
  },
};

const donationReducer = (
  state: IDonationState = initialDonationState,
  action: IFluxStandardAction<any>,
) => {
  switch (action.type) {
    case donationTypes.nearestcampaignsLoading:
      return {
        ...state,
        ['loading']: {
          ...state.loading,
          ['nearestCampaigns']: action.payload,
        },
      };
    case donationTypes.nearestcampaignsSuccess:
      return {
        ...state,
        ['nearestCampaigns']: action.payload,
        ['loading']: {
          ...state.loading,
          ['nearestCampaigns']: false,
        },
      };
    case donationTypes.nearestcampaignsError:
      return {
        ...state,
        ['error']: {
          ['nearestCampaigns']: action.error,
        },
        ['loading']: {
          ...state.loading,
          ['nearestCampaigns']: false,
        },
      };
    case donationTypes.patchEntities:
      return {
        ...state,
        ['loading']: {
          ...state.loading,
          ['nearestCampaigns']: false,
        },
        ['nearestCampaigns']: action.payload,
      };
    default:
      return state;
  }
};

export default donationReducer;
