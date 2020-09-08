const initState = {
  authError: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      console.log('login success');
      return { ...state, authError: null };

    case 'LOGIN_ERROR':
      console.log('login failed');
      return { ...state, authError: action.err.message };

    case 'SIGNOUT_SUCCESS':
      console.log('signout success');
      return state;

    case 'SIGNUP_SUCCESS':
      console.log('signup success');
      return { ...state, authError: null };

    case 'SIGNUP_ERROR':
      console.log('signup error', action.err.message);
      return { ...state, authError: action.err.message };

    default:
      return state;
  }
};

export default authReducer;
