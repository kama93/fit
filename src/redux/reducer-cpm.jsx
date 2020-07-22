const INITIAL_STATE = {
    cpm: null
  };
  
  const cpmReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'SET_USER_CPM':
        return {
          ...state,
          cpmUser: action.payload
        };
      default:
        return state;
    }
  };
  
  export default cpmReducer;