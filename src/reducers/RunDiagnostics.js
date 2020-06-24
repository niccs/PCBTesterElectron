const INITIAL_STATE = {
  ledDiagnostics: "LED not connected",
  pirDiagnostics: "PIR not connected"
};

export default (state = INITIAL_STATE, action) => {
  //console.log("ashika",action.payload)
  switch (action.type) {
    case "RUNLED":
      return {
        ...state,
        ledDiagnostics: action.payload
      }
    case "RUNPIR":
      return {
        ...state,
        pirDiagnostics: action.payload
      };
      case "RUNBV":
      return {
        ...state,
        batteryVoltage: action.payload
      };
      case "RUNPV":
      return {
        ...state,
        panelVoltage: action.payload
      };
      case "RUNLV":
      return {
        ...state,
        loadVoltage: action.payload
      };
    case "DISCONNECT":
      return INITIAL_STATE;
    default:
      return state;
  }
}