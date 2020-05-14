import {IFluxStandardAction, IUserState} from '@modules/interfaces';
import {userTypes} from './actions';

const initialUserState = {
  user: null,
  loading: {
    user: true,
  },
  error: {
    user: '',
  },
};

const userReducer = (
  state: IUserState = initialUserState,
  action: IFluxStandardAction<any>,
) => {
  switch (action.type) {
    case userTypes.getUserDataLoading:
      return {
        ...state,
        ['loading']: {
          ...state.loading,
          ['user']: action.payload,
        },
      };
    case userTypes.getUserDataSuccess:
      return {
        ...state,
        ['user']: action.payload,
        ['loading']: {
          ...state.loading,
          ['user']: false,
        },
      };
    case userTypes.getUserDataLoading:
      return {
        ...state,
        ['error']: {
          ['user']: action.error,
        },
        ['loading']: {
          ...state.loading,
          ['user']: false,
        },
      };

    default:
      return state;
  }
};

export default userReducer;
