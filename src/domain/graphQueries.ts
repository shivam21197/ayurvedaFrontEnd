import {IEntity, IEntityAmount, ICampaignRequest} from './interfaces';
import {INewCampaignRequest} from '@screens/appScreens/Distributor/DistributorScreen';

// bootstrap screen
export const getTokenAuth = () => {
  const payload = {
    query: `query{
    getAuthConfirmation
  }`,
  };

  return JSON.stringify(payload);
};

export const postLogin = (email: string, password: string): string => {
  const payload = {
    query: `mutation{
            login(loginInput: {email: "${email}", password: "${password}"}) {
                  token
                }
          }`,
  };
  return JSON.stringify(payload);
};

// app screen

// *** home ***
const requiredCampaignData = `
_id
title
subTitle
status
description
thumbnails{
  url
  type
}
entities{
  title
  requestedAmount
  availedAmount
  currentPrice
  status
  unitType
  currency
}
creatorId{
  _id
  name
  userImage
}
donerIds {
  _id
  name
  userImage
}
groupMemberIds {
  _id
  name
  userImage
}`;

export const getHomeCampaignRequests = (page: number) => {
  const payload = {
    query: `mutation{
    getCampaignRequests(page: ${page}) {
      ${requiredCampaignData}
    }
  }`,
  };

  return JSON.stringify(payload);
};

// *** User ***
const requiredUserData = `
_id
      name
      username
      email
      location
      idProofType
      idProofImageUrl
      DOB
      contactNumber
      rewardPoints
      campaignRequestIds{
        ${requiredCampaignData}
      }
      joinedCampaignIds{
        ${requiredCampaignData}
      }
      donationHistory
      {
        campaignRequestId{
          ${requiredCampaignData}
        },
        donationAmount
      }
      maxDistance
`;

export const getUserData = (): string => {
  const payload = {
    query: `query{
    getUserData{
      ${requiredUserData}
    }
  }`,
  };

  return JSON.stringify(payload);
};

// *** Account ***

export interface IPatchUserData {
  name?: string;
  username?: string;
  email?: string;
  oldPassword?: string;
  newPassword?: string;
  location?: string;
  idProofType?: string;
  idProofImageUrl?: string;
  maxDistance?: number;
  DOB?: string;
  userImage?: string;
  contactNumber?: number;
}

const getDefinedUserInput = (userInput: IPatchUserData) => {
  let inputString = '';
  let keyValueString = '';
  for (const [key, value] of Object.entries(userInput)) {
    if (value) {
      if (key === 'maxDistance') {
        keyValueString = `${key}: ${value},\n`;
      } else {
        keyValueString = `${key}: "${value}",\n`;
      }
      inputString = inputString + keyValueString;
    }
  }

  return inputString;
};

export const patchUserData = (userInput: IPatchUserData): string => {
  const userIputParam = getDefinedUserInput(userInput);

  const payload = {
    query: `mutation{
      patchUserData(
        userInput: {
          ${userIputParam}
        }){
        ${requiredUserData}
      }
  }`,
  };

  return JSON.stringify(payload);
};

// ***** Distributor ******

const requiredEntityInfo = `
  title
  requestedAmount
  availedAmount
  currentPrice
  status
  unitType
  currency
`;

export const patchCampaignEntity = (
  campaignRequestId: string,
  entityInput: IEntity[],
): string => {
  const payload = {
    query: `mutation{
    postCampaignEntity(campaignRequestId: "${campaignRequestId}", entityInput: ${entityInput}) {
      entities{
        ${requiredEntityInfo}
      }
    }
  }`,
  };

  return JSON.stringify(payload);
};

export const postNewCampaign = (campaignData: INewCampaignRequest): string => {
  const payload = {
    query: `{
      postCampaign(requestInput: ${campaignData}) {
      ${requiredCampaignData}
    }
  }`,
  };

  return JSON.stringify(payload);
};

// **** Donation ****

export const nearestDonationCampaign = (location: string, distance: number) => {
  const payload = {
    query: `mutation{
      getNearestDonationCampaign(location: "${location}", distance: ${distance}) {
        ${requiredCampaignData}
      }
  }`,
  };

  return JSON.stringify(payload);
};

// posting the entity amount donation
export const patchCampaignDonation = (
  campaignRequestId: string,
  entityAmount: IEntityAmount,
): string => {
  const payload = {
    query: `mutation{
    postCampaignDonation(campaignRequestId: "${campaignRequestId}", entity: {title: "${entityAmount.title}", amount: ${entityAmount.amount}}) {
      entities{
        ${requiredEntityInfo}
      }
    }
  }`,
  };

  return JSON.stringify(payload);
};
