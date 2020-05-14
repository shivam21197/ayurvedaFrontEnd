import {IUser} from '@domain/interfaces';
import {fetchUserData} from '@domain/userRepository';
import {IFluxStandardAction} from '@modules/interfaces';

const userPrefix = 'USER/';

export const userTypes = {
  getUserDataLoading: `${userPrefix}GET_USER_DATA`,
  getUserDataSuccess: `${userPrefix}GET_USER_DATA_LOADING`,
  getUserDataError: `${userPrefix}GET_USER_DATA_ERROR`,
};

const setUserDataLoading = (
  isLoading: boolean,
): IFluxStandardAction<boolean> => {
  return {
    type: userTypes.getUserDataLoading,
    payload: isLoading,
  };
};

const setUserDataSuccess = (payload: IUser): IFluxStandardAction<IUser> => {
  return {
    type: userTypes.getUserDataSuccess,
    payload,
  };
};

const setUserDataError = (
  error: string,
): IFluxStandardAction<undefined, undefined, string> => {
  return {
    type: userTypes.getUserDataError,
    error,
  };
};

const getUserAccountData = () => async (dispatch: any): Promise<void> => {
  dispatch(setUserDataLoading(true));
  try {
    const userData = await fetchUserData();
    const {
      data: {
        data: {getUserData},
      },
    } = userData;

    dispatch(setUserDataSuccess(getUserData));
  } catch (e) {
    dispatch(setUserDataError(e.message));
  }
};

const UserActions = {
  getUserAccountData,
  setUserDataSuccess,
  setUserDataError,
  setUserDataLoading,
};

export default UserActions;
