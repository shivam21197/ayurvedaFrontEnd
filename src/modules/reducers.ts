import {combineReducers} from 'redux';
import donationReducer from './donation/reducer';
import homeReducer from './home/reducer';
import userReducer from './user/reducer';

export default combineReducers({
  user: userReducer,
  home: homeReducer,
  donation: donationReducer,
});
