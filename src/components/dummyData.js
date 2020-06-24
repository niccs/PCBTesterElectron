import React, {Component} from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import Gauge from './Gauge';
import LineChart from './LineChart';
import TempreatureSensor from './TempreatureSensor';
import SelectBox from './SelectBox';
import ButtonConnect from './ButtonConnect';
import ButtonRun from './ButtonRun';
import Button from './Button';
import ConfigData from '../asset/config.json'
import '../styles/style.css';

class dummyData extends Component{

    componentDidMount(){


        this.props.showData();
        // console.log('haha',ConfigData);
        // console.log('haha',ConfigData.gauge_data);
        //<Gauge value = {value} gaugeData={batteryVoltageData}/>
       // <Gauge value = {value} gaugeData={panelVoltageData}/>
    }
    onClick = (arg) => {
        console.log(arg);
        if("CONNECT"===arg){
            
            console.log("Cotton",this.btnConnectLabel);
            this.props.checkConnection("Its me Neetika");
            this.btnConnectLabel = "CONNECT";
        }
        else if("DISCONNECT"===arg){
            this.props.disconnect("Lets disconnect the serial now");
        }
        else if("RUN"===arg){
            this.props.runDiagnosticSchedule("runcheck\n");
        }
        else if("LED_TEST"===arg){
            this.props.runDiagnosticSchedule("ledcheck\n");
        }
        else if("PIR_TEST"===arg){
            this.props.runDiagnosticSchedule("pircheck\n");
        }
        else{
            console.log("ELSEEEEE");
        }
        //this.props.checkConnection("Its me Neetika");
      
        }
    render(){
        //console.log("Neetikaaaa" , this.props.connect);

        let btnConnectLabel=  this.props.connect?"DISCONNECT":"CONNECT";
        let isBtnRunEnabled=  this.props.connect?true:false;
        let ConectionString=  this.props.connect?`\nConnection Success`:`\nPCB not connected`;
        //let runActive = this.props.connect?true
        let ledDiagnostics=  isBtnRunEnabled && this.props.diagnosticsData.ledDiagnostics?this.props.diagnosticsData.ledDiagnostics:`LED not connected`;
        let pirDiagnostics=  isBtnRunEnabled && this.props.diagnosticsData.pirDiagnostics?this.props.diagnosticsData.pirDiagnostics:`PIR not connected`;
        //console.log("seeeeee",isBtnRunEnabled);
        console.log("diagnosticsData",this.props.diagnosticsData.ledDiagnostics,"   ",this.props.diagnosticsData.pcbDiagnostics);

        //console.log("Neetikaaaa" , this.props.selectedVariant);
        //let value =[...this.props.serialData].pop();
        //let value =this.props.diagnosticsData.batteryVoltage;
        let variantData = ConfigData.gauge_data.find((ele)=> (ele.select_name===this.props.selectedVariant)) || null;
        //console.log("variantData" , variantData);
        let batteryVoltageData = (variantData!==null )?variantData.data.find((ele)=> (ele.name==="Battery Voltage")):null;
        let panelVoltageData = (variantData!==null )?variantData.data.find((ele)=> (ele.name==="Panel Voltage")):null;
        let loadVoltageData = (variantData!==null )?variantData.data.find((ele)=> (ele.name==="Load Voltage")):null;
        //console.log("Neetikaaaa" , loadVoltageData);
        return(            
            <div>
                <div className="dropDownSelection">
                    <SelectBox variants = {ConfigData.variants} />
                </div>
                <div className="gaugeContainer">                      
                    <Gauge className="batteryVoltageContainer"value = {this.props.diagnosticsData.batteryVoltage} gaugeData={batteryVoltageData} label="Battery voltage"/>
                    <Gauge className="panelVoltageContainer" value = {this.props.diagnosticsData.panelVoltage} gaugeData={panelVoltageData} label="Panel voltage"/>
                    <Gauge className="loadVoltageContainer" value = {this.props.diagnosticsData.loadVoltage} gaugeData={loadVoltageData} label="Load voltage"/>
                </div>
                <div className="tempreatureSensorsContainer">
                    <Gauge className="loadVoltageContainer" value = {this.props.diagnosticsData.loadVoltage} gaugeData={loadVoltageData} label="Load current"/>
                    <Gauge className="loadVoltageContainer" value = {this.props.diagnosticsData.loadVoltage} gaugeData={loadVoltageData} label="Load power"/>
                    <TempreatureSensor value = {this.props.diagnosticsData.batteryVoltage} label="Battery temp sensor"/>
                    <TempreatureSensor value = {this.props.diagnosticsData.panelVoltage}label="System temp sensor"/>
                </div>
                
                <div className="buttonContainer"> 
                    <div className="buttonContainerExtra">             
                        <div className="buttonContainerExtra first">
                            <Button className="button" label="LED TEST" onClick={()=>this.onClick("LED_TEST")} disabled={!isBtnRunEnabled}/>
                            <Button  className="button" label="INDICATOR TEST" onClick={()=>this.onClick("INDICATOR_TEST")}disabled={!isBtnRunEnabled}/> 
                        </div>
                        <div className="buttonContainerExtra second">
                            <Button className="button" label="LED TEST" onClick={()=>this.onClick("LED_TEST")} disabled={!isBtnRunEnabled}/>
                            <Button  className="button" label="PIR TEST" onClick={()=>this.onClick("PIR_TEST")}disabled={!isBtnRunEnabled}/>
                        </div>
                    </div>
                    <div className="buttonContainerMain">
                        <Button className="buttonBig" label={btnConnectLabel} onClick={()=>this.onClick(btnConnectLabel )}/>                   
                        <Button className="button" label="RUN" onClick={()=>this.onClick("RUN")} disabled={!isBtnRunEnabled}/>
                    </div >
                </div>
                
                <div className="consoleBoxContainer">
                    <label className="consoleBox"> PCB Status :-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {ConectionString} </label>
                    <label className="consoleBox"> LED Status :-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {ledDiagnostics} </label>
                    <label className="consoleBox"> PIR status :-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  {pirDiagnostics}</label>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const serialData = (state.serialData);

   console.log("state is",state)
    return { serialData , selectedVariant: state.selectedVariant ,connect:state.connect.isConnected, diagnosticsData:state.diagnosticsData};
}

export default connect(mapStateToProps, actions)(dummyData);