const initialState = {
  isLoggedIn: false,
  user: {},
  currentUser: {}
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    
    case 'LOG_IN':
      return { ...state, isLoggedIn: true };

    case 'LOG_OUT':
      return { ...state, isLoggedIn: false, user: null };

    case 'UPDATE_USER_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user
      }

/* Регистрация */
  case 'REGISTRATION_SUCCESS':
    return {
      ...state,
      isLoggedIn: true,
      user: action.payload.user
    };
  
  /* Аутентификация */
  case 'AUTHENTICATION_SUCCESS':
    return {
      ...state,
      isLoggedIn: true,
      user: action.payload.user
    }

  case 'GET_CURRENT_USER_SUCCESS':
    return {
      ...state,
      currentUser: action.payload
    }

    default:
      return state

  };
};

export default userReducer;