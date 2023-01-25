const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS": {
      return {
        currentUser: action.payload,
        isFetching: false,
        error: false,
      };
    }
    case "LOGOUT": {
      return {
        currentUser: null,
      };
    }
    case "LOGIN_FAILURE":
      return {
        currentUser: null,
        isFetching: false,
        error: true,
      };
    case "UPDATE_START":
      return {
        ...state,
        isFetching: true,
      };
    case "UPDATE_SUCCESS":
      return {
        currentUser: action.payload,
        isFetching: false,
        error: false,
      };
    case "UPDATE_FAILURE":
      return {
        currentUser: state.currentUser,
        isFetching: false,
        error: true,
      };
    default:
      return state;
  }
};

export default AuthReducer;
