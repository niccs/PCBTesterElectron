const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  
  switch (action.type) {
    case "SELECTED_VARIANT":{
      //console.log("ashika",action.payload)
      return  action.payload;
    }
    
    default:
      return state;
  }
  }