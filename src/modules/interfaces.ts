import {ICampaignRequest, IUser} from '@domain/interfaces';
import {IDonationState} from './donation/reducer';

export interface IFluxStandardAction<
  Payload = undefined,
  Meta = undefined,
  Error = string
> {
  type: string;
  payload?: Payload;
  error?: Error;
  meta?: Meta;
}

export interface IHomeState {
  feeds: ICampaignRequest[] | null;
  loading: {
    feeds: boolean;
  };
  error: {
    feeds: string;
  };
}

export interface IUserState {
  user: IUser | null;
  loading: {
    user: boolean;
  };
  error: {
    user: string;
  };
}

export interface IState {
  home: IHomeState;
  user: IUserState;
  donation: IDonationState;
}
