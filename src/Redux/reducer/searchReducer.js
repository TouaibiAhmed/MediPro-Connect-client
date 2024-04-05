// reducers.js
const initialState = {
    searchName: '',
    searchAddress: ''
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SEARCH_NAME':
        return { ...state, searchName: action.payload };
      case 'SET_SEARCH_ADDRESS':
        return { ...state, searchAddress: action.payload };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  