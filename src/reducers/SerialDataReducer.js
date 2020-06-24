const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  //console.log("ashika",action.payload)
  switch (action.type) {
    case "SHOW_DATA":
      return [ ...state , action.payload];
    
    default:
      return state;
  }
  }