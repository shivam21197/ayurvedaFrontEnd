import ApiClient from '@network/ApiClient';
import {baseUrl} from '@network/Constants';
import {getUserData, IPatchUserData, patchUserData} from './graphQueries';
import {IUser, Response} from './interfaces';

const apiClient = new ApiClient({baseUrl});

interface IUserResponse {
  getUserData: IUser;
}

interface IPatchUserResponse {
  patchUserData: IUser;
}

export const fetchUserData = async (): Promise<Response<IUserResponse>> => {
  return await apiClient.post(getUserData(), {
    'Content-Type': 'application/json',
  });
};

export const patchedUserData = async (
  patchUserInput: IPatchUserData,
): Promise<Response<IPatchUserResponse>> => {
  return await apiClient.post(patchUserData(patchUserInput), {
    'Content-Type': 'application/json',
  });
};
