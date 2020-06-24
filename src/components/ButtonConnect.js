import React, {Component}from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import '../styles/style.css';

class ButtonConnect extends Component {
 
  onConnect = () => {
   
  this.props.checkConnection("Its me Neetika");

  }
   
 
  render() {

    // console.log("variants are",this.props.variants);
    //const { selectedOption } = this.state.selectedOption;

    return (
      
        <button className="button"
        
        onClick={this.onConnect}>CONNECT</button>
    );
  }

}

export default connect(null, actions)(ButtonConnect);


