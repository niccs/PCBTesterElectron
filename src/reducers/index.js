import {
    combineReducers
} from 'redux';
import serialDataReducer from './SerialDataReducer';
import selectVariantReducer from './SelectVariantReducer';
import checkConnection from './CheckConnection';
import runDiagnostics from './RunDiagnostics';

export default combineReducers({
    serialData: serialDataReducer,
    selectedVariant: selectVariantReducer,
    connect: checkConnection,
    diagnosticsData:runDiagnostics,
})