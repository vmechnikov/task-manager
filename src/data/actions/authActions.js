import { login } from '../services';
import { authConstants } from '../constants/authConstants';
import openNotificationWithIcon from '../helpers/Notification';

export function signIn(userData) {
  return dispatch => {
    dispatch(request());
    login(userData)
      .then(res => {
        if (res.token) {
	        localStorage.setItem('userToken', res.token);
	        dispatch(success(res));
        } else {
	        openNotificationWithIcon('error', res.password);
	        dispatch(failure(res))
        }
      });
  };

  function request() {
    return {
      type: authConstants.AUTH_REQUEST
    }
  }

  function success(userToken) {
    return {
      type: authConstants.AUTH_SUCCESS,
      userToken,
    }
  }

  function failure(err) {
    return {
      type: authConstants.AUTH_FAILURE,
      err,
    }
  }
}

export function signOut() {
  localStorage.removeItem('userToken');

  return {
    type: authConstants.AUTH_SIGN_OUT
  }
}
