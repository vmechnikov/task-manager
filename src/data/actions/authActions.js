import { login } from '../services';
import { authConstants } from '../constants/authConstants';

export function signIn(userData) {
  return dispatch => {
    dispatch(request());
    login(userData)
      .then(res => {
        console.log(res.token);
        localStorage.setItem('userToken', res.token);
        dispatch(success(res));
      })
      .catch(err => dispatch(failure(err)));
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
