const initialState = {
  user: {},
  data: {},
  categories: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // data
    case "tasks/getData": {
      return {
        ...state,
        data: action.payload,
      };
    }

    // user
    case "users/setUser": {
      return {
        ...state,
        user: action.payload,
      };
    }

    // categories
    case "tasks/getCategories": {
      return {
        ...state,
        categories: action.payload,
      };
    }

    default:
      return state;
  }
};

export default rootReducer;
