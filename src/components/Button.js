import React from 'react';
import '../styles/style.css';

const Button=(props)=>{
    
  let run_btn_class = props.disabled ? "buttonW" : props.className;
  return (
        <div >
            <button className={run_btn_class} value={"ab"} disabled={props.disabled} onClick={props.onClick}>{props.label}</button>
       
        </div>
      );
}

 export default Button;

 //style={{backgroundColor:this.state.bgColor}}