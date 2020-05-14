import {IState} from '@modules/interfaces';

const getUserLoading = (state: IState) => {
  return state.user.loading.user;
};

const getUserData = (state: IState) => {
  return state.user.user;
};

const getUserError = (state: IState) => {
  return state.user.error.user;
};

const UserSelector = {getUserLoading, getUserData, getUserError};

export default UserSelector;
