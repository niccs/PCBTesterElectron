import React from 'react';
import Thermometer from 'react-thermometer-component'

const TempreatureSensor = (props) => {
  //let colo = props.value>50?"red":"green"
  return ( <div >
    <label>{props.label}</label>
    <Thermometer theme = "light"
    value = {
      props.value
    }
    max = "100"
    steps = "3"
    format = "°C"
    size = "small"
    height = "150" />

    </div>
  );
}

export default TempreatureSensor;