// Switches the port into "flowing mode"
/*let g = new JustGage({
    id: "gauge",
    value: 0,
    min: 0,
    max: 100,
    relativeGaugeSize: true,
    title: "Serial Data",
    customSectors: [{
        color: "blue",
        lo: 0,
        hi: 50
    }, {
        color: "#ff0000",
        lo: 50,
        hi: 100
    }],
});

 <Gauge value={ this.state.value } min="350" max={ this.state.max } title="" label="connections" /> */
import React from 'react';
import Gauge from 'react-svg-gauge';

const Gaugee=(props)=>{
    let colo = props.value>50?"red":"green"
    let min=props.gaugeData===null ? 0 : props.gaugeData.min;
   // let max=props.gaugeData===null ? 0 : props.gaugeData.max;
    let name=props.gaugeData===null ? "" : props.gaugeData.name;
  return (
        <div className='gauge'>
            {/* <label >Current is : </label><label>{props.value}</label> */}
            <Gauge  min = {min}  value={props.value ? props.value:0} width={260} height={200} color = {colo}  label={props.label}/>
       
        </div>
      );
}

 export default Gaugee;
