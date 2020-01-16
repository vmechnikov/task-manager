import { authConstants } from '../constants/authConstants';

export const initialState = {
  userToken: localStorage.getItem('userToken'),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.AUTH_REQUEST:
      return {
        ...state,
      };
    case authConstants.AUTH_SUCCESS:
      return {
        ...state,
        userToken: action.userToken,
      };
    case authConstants.AUTH_SIGN_OUT:
      return {
        ...state,
        userToken: null,
      };
    case authConstants.AUTH_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default authReducer;
