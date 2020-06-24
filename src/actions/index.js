export const showData = () => dispatch => {
    window.ipcRenderer.on('data', (event, serialData) => {
        //console.log("Neetika", serialData);
        dispatch({
            type: "SHOW_DATA",
            payload: serialData.data
        });
    });
};

export const selectVariant = variant => {
    return {
        type: "SELECTED_VARIANT",
        payload: variant
    };
};


// TODO: Communicate to MainWindow that the user wants
// to start converting videos.  Also listen for feedback
// from the MainWindow regarding the current state of
// conversion.
export const checkConnection = sendConnectionTestData => dispatch => {
    //console.log("Neetika", sendConnectionTestData);
    window.ipcRenderer.send('handshake:start', sendConnectionTestData);
    //activate the buttons by sending event to reducer
    window.ipcRenderer.on('handshake:complete', (event, sendConnectionTestData) => {
        console.log("handshake", sendConnectionTestData);
        const isConnected = sendConnectionTestData.includes("sucess") ? true : false;
        console.log("anika", sendConnectionTestData + isConnected);
        dispatch({
            type: "CHECK_CONNECTION",
            payload: isConnected
        });
    });


};

export const disconnect = sendConnectionTestData => dispatch => {
    //console.log("Neetika", sendConnectionTestData);
    window.ipcRenderer.send('serial:stop', sendConnectionTestData);
    //activate the buttons by sending event to reducer
    window.ipcRenderer.on('serial:stopped', (event, serialStopConfirmation) => {
        const isConnected = serialStopConfirmation ? false : true;
        dispatch({
            type: "DISCONNECT",
            payload: isConnected
        });
    });

};

export const runDiagnosticSchedule = sendHardwareTestData => dispatch => {
    //console.log("Neetika", sendHardwareTestData);
    window.ipcRenderer.send('diagnostics:start', sendHardwareTestData);
    //activate the buttons by sending event to reducer
    window.ipcRenderer.on('diagnostics:complete', (event, diagnosticsData) => {
        var res = diagnosticsData.split("_");
        let actionType = res[0];
        let payload = res[1];
        //console.log("Neetikaaaaa", res,actionType,payload);
        dispatch({
            type: actionType,
            payload: payload
        });
    });

};