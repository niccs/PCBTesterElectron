const INITIAL_STATE = {isConnected:false};

export default (state = INITIAL_STATE, action) => {
//console.log("ashika",action.payload)
  switch (action.type) {
    case "CHECK_CONNECTION":
    return  {
      ...state, isConnected: action.payload
  }
  case "DISCONNECT":
  return INITIAL_STATE;
    default:
      return state;
  }
  }