export interface ITimeStamps {
  createdAt?: string;
  updatedAt?: string;
}

export interface IEntity {
  title: string;
  requestedAmount: number;
  availedAmount: number;
  unitType: string;
  currentPrice: number;
  currency: string;
  status: campaignStatus;
}

export interface IDonationHistory {
  campaignRequestId: ICampaignRequest;
  donationAmount: string;
}

export interface IUser {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  location: string;
  idProofType: string;
  idProofImageUrl: string;
  DOB: string;
  contactNumber: string;
  rewardPoints: string;
  campaignRequestIds: ICampaignRequest[];
  joinedCampaignIds: ICampaignRequest[];
  donationHistory: IDonationHistory[];
  userImage: string;
  maxDistance: number;
}

export interface IThumbnail {
  url: string;
  type: string;
}

export type campaignStatus = 'Completed' | 'Availed' | 'Initiated';

export interface ICampaignRequest extends ITimeStamps {
  _id: string;
  title: string;
  subTitle?: string;
  entities?: IEntity[];
  status: campaignStatus;
  creatorId: IUser;
  donerIds?: IUser[];
  groupMemberIds?: IUser[];
  thumbnails?: IThumbnail[];
  description?: string;
}

export interface Response<D> {
  data: {data: D};
}

export interface IEntityAmount {
  title: string;
  amount: number;
}
